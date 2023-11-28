import axios from 'axios';
import axiosService from '../utils/axios';
export const API_URL = "https://web-weavers-backend-fb4af7963149.herokuapp.com/";
export const A_TEAM_URL = "https://c404-5f70eb0b3255.herokuapp.com/";
export const BEEG_YOSHI_URL = "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com/";

function validateUser (username) {
    //Checks if a User exists in the database
    return axiosService.get("authors/" + username + "/")
}

export function getDisplayName(userUUID){
    axiosService.get("authors/" + userUUID+ "/").then( function(response){
        console.log(" displayname is " + response.data.displayName)
        return response.data.displayName
    }).catch(function(error){
        console.log(error)
        return null
    })
}
export default validateUser;