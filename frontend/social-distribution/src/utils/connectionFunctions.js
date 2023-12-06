import axiosService, {PacketPiratesServices, aTeamService, BeegYoshiService} from "./axios"


//check if a follower follows you back from any server
export const checkIfFriend = async (follower, postUserUUID) => {
    let is_friend = false;
    if(follower.host === "https://web-weavers-backend-fb4af7963149.herokuapp.com/"){
        try {
            const res = await axiosService.get("authors/" + follower.uuid+ "/followers/" + postUserUUID + "/")
            return res.data.is_follower
        } catch (e) {
            console.log(e)
            return false}

    } else if (follower.host === "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/"){

        try {
            const res = await PacketPiratesServices.get("authors/" + follower.uuid+ "/followers/" + postUserUUID)
            return res.data
        } catch { return false}
    } else if (follower.host === "https://c404-5f70eb0b3255.herokuapp.com/"){
        try {
            const res = await aTeamService.get("authors/" + follower.uuid+ "/followers/" + postUserUUID )
            return true
        } catch { return false}
    } else if (follower.host === "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com/"){
        try {
            let temp_id = follower.id.split("/authors/")[1]
            const res = await BeegYoshiService.get("service/remote/authors/" + temp_id + "/followers/" + postUserUUID  + "/")
            return true
        } catch { return false}

     return false
    }
  }

  export const sendPostsToInboxes = (follower, response) => {
    if(follower.host === "https://web-weavers-backend-fb4af7963149.herokuapp.com/"){
      axiosService.post("authors/" + follower.uuid + "/inbox/", response.data).then((inboxResponse) => {
        console.log("Successfully sent post to follower " + follower.displayName);
      }).catch((error) =>{
        console.log(error);
      })
    } else if (follower.host === "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/"){
      PacketPiratesServices.post("authors/" + follower.uuid + "/inbox", response.data).then((inboxResponse) => {
        console.log("Successfully sent post to follower " + follower.displayName);
      }).catch((error) =>{
        console.log(error);
      })
    }else if (follower.host === "https://c404-5f70eb0b3255.herokuapp.com/"){
      console.log("[Not set up for A Team] Successfully sent post to follower " + follower.displayName);
      //THIS ENDPOINT FULLY DOES NOT EXIST AND MIGHT NOT BE IMPLEMENTED AS A HEADSUP
      /*
      aTeamService.post("authors/" + follower.uuid + "/inbox", response.data).then((inboxResponse) => {
        console.log("Successfully sent post to follower " + follower.displayName);
      }).catch((error) =>{
        console.log(error);
      })
      */
    } else if (follower.host === "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com/"){
      console.log("[Beeg Yoshi]] Successfully sent post to follower " + follower.displayName);
      let temp_id = follower.id.split("/authors/")[1]

      let url = "service/authors/" + temp_id + "/inbox/"
      BeegYoshiService.get(url).then((BYInboxResponse) =>{
        const friendRequest = BYInboxResponse.data.items["friendrequests"]
        const notifications = BYInboxResponse.data.items["notifications"]
        const inbox = BYInboxResponse.data.items["inbox"]
        inbox.push(response.data)
        const InboxData = {"inbox": inbox, "notifications": notifications, "friendrequests": friendRequest}

        BeegYoshiService.put(url, InboxData).then( (updatedInboxResponse) => {
          console.log(updatedInboxResponse)
        }).catch( (err) => {
        console.log(err)
      })
      }).catch( (err) => {
        console.log(err)
      })
    }
}