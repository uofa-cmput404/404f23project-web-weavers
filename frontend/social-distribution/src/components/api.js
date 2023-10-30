
import axios from 'axios';
export const API_URL = "http://127.0.0.1:8000/authors/"
export const GIT_URL = "http://api.github.com/users/:user/events"

export let recieveEvents = (username) =>{
    //Grabs the git events of a user based on their uuid
    //Checks for the git link of the user, then uses that in the git api

    var user_git;
    recieveUser(username).then(function(result){
        user_git = result.data.github.split("/").pop()
        axios.get(GIT_URL.replace(":user", user_git)).then(function(result){
            console.log(result.data)
        }).catch(function(error){
            console.log(JSON.stringify(error))
            return null;
        })

    }).catch(function(error){
        console.log(JSON.stringify(error))
        return null;
    })
}


function validateUser (username) {
    //Checks if a User exists in the database
    return axios.get(API_URL + username + "/")
}

export default validateUser;
