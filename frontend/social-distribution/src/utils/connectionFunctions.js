import axiosService, {PacketPiratesServices, aTeamService, BeegYoshiService} from "./axios"


//check if a follower follows you back from any server
export const checkIfFriend = (follower, postUserUUID) => {
    if(follower.host === "https://web-weavers-backend-fb4af7963149.herokuapp.com/"){
      axiosService.get("authors/" + postUserUUID + "/followers/" + follower.uuid + "/").then((response) => {
        return response
      }).catch((error) =>{
        console.log(error);
      })
    } else if (follower.host === "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/"){
      PacketPiratesServices.get("authors/" + postUserUUID + "/followers/" + follower.uuid).then((response) => {
        return response
      }).catch((error) =>{
        console.log(error);
      })
    } else if (follower.host === "https://c404-5f70eb0b3255.herokuapp.com/"){
      aTeamService.get("authors/" + postUserUUID + "/followers/" + follower.uuid + "/").then((response) => {
        return response
      }).catch((error) =>{
        console.log(error);
      })
    } else if (follower.host === "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com/"){
      BeegYoshiService.get("service/remote/authors/" + postUserUUID + "/followers/" + follower.uuid + "/").then((response) => {
        return response
      }).catch((error) =>{
        console.log(error);
      })
    }
  }