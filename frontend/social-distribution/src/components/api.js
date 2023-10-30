import axios from 'axios';
export const API_URL = "http://127.0.0.1:8000/"
export const GIT_URL = "http://api.github.com/users/:user/events"

function validateUser (username) {
    //Checks if a User exists in the database
    return axios.get(API_URL + username + "/")
}

export default validateUser;