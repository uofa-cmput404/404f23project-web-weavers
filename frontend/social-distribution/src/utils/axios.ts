import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '../store';
import authSlice from '../store/slices/auth';
import {API_URL, A_TEAM_URL, BEEG_YOSHI_URL} from "../components/api"

export const aTeamService = axios.create({
    baseURL: A_TEAM_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 06c591151b14e0462efd2ad9c91888a530967c7f'
    },
})

// TODO The Token on this is currently invalid
// and not sure how they formatted the authorization header
export const BeegYoshiService = axios.create({
    baseURL: BEEG_YOSHI_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer Token dd81e18e8f393cc57dd69781902625f0b4ee031c'
    },
})

const axiosService = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosService.interceptors.request.use(async (config) => {
    const { token } = store.getState().auth;
    if (token !== null) {
        config.headers["Authorization"] = 'Bearer ' + token;
        // @ts-ignore
        console.debug('[Request]', config.baseURL + config.url, JSON.stringify(token));
    }
    return config;
});

axiosService.interceptors.response.use(
    (res) => {
        // @ts-ignore
        console.debug('[Response]', res.config.baseURL + res.config.url, res.status, res.data);
        return Promise.resolve(res);
    },
    (err) => {
        console.debug(
            '[Response]',
            err.config.baseURL + err.config.url,
            err.response.status,
            err.response.data
        );
        return Promise.reject(err);
    }
);

// @ts-ignore
const refreshAuthLogic = async (failedRequest) => {
    const { refreshToken } = store.getState().auth;
    if (refreshToken !== null) {
        return axios
            .post(
                '/auth/refresh/',
                {
                    refresh: refreshToken,
                },
                {
                    baseURL: API_URL
                }
            )
            .then((resp) => {
                const { access, refresh } = resp.data;
                failedRequest.response.config.headers.Authorization = 'Bearer ' + access;
                store.dispatch(
                    authSlice.actions.setAuthTokens({ token: access, refreshToken: refresh })
                );
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    store.dispatch(authSlice.actions.logout());
                }
            });
    }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher<T = any>(url: string) {
    return axiosService.get<T>(url).then((res) => res.data);
}

export default axiosService;