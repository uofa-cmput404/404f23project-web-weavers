import axiosService, {PacketPiratesServices, aTeamService, BeegYoshiService} from "./axios"


//check if a follower follows you back from any server
export const checkIfFriend = async (follower, postUserUUID) => {
    let is_friend = false;
    if(follower.host === "https://web-weavers-backend-fb4af7963149.herokuapp.com/"){
        try {
            const res = await axiosService.get("authors/" + follower.uuid+ "/followers/" + postUserUUID + "/")
            console.log("in the connection " + res.data.is_follower)
            return res.data.is_follower
        } catch (e) {
            console.log(e)
            return false}

    } else if (follower.host === "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/"){

        try {
            const res = await PacketPiratesServices.get("authors/" + follower.uuid+ "/followers/" + postUserUUID)
            return res
        } catch { return false}
    } else if (follower.host === "https://c404-5f70eb0b3255.herokuapp.com/"){
        try {
            const res = await aTeamService.get("authors/" + follower.uuid+ "/followers/" + postUserUUID )
            return true
        } catch { return false}
    } else if (follower.host === "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com/"){
        try {
            const res = await BeegYoshiService.get("service/remote/authors/" + follower.uuid+ "/followers/" + postUserUUID)
            return true
        } catch { return false}

     return false
    }
  }