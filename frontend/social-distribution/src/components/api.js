import axios from 'axios';
export const API_URL = "http://127.0.0.1:8000/"

function validateUser (username) {
    //Checks if a User exists in the database
    return axios.get(API_URL + "authors/" + username + "/")
}

export function getDisplayName(userUUID){
    axios.get(API_URL + "authors/" + userUUID+ "/").then( function(response){
        console.log(" displayname is " + response.data.displayName)
        return response.data.displayName
    }).catch(function(error){
        console.log(error)
        return null
    })
}
export default validateUser;