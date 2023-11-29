import axios from 'axios';
import axiosService from '../utils/axios';
export const API_URL = "https://web-weavers-backend-fb4af7963149.herokuapp.com/";

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