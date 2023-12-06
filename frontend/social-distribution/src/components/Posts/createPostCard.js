import { useRef, useState } from "react";
import { colors, sizes  } from "../../utils/theme.js";
import { Flex, Divider, IconButton, Button, Textarea, TabList, Tab, Tabs} from "@chakra-ui/react";
import { FiImage, FiLink } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import TextPost from "./TextPost.js";
import axiosService, {PacketPiratesServices, aTeamService, BeegYoshiService} from "../../utils/axios"
import { Text } from "react-font";
import Inbox from "../../pages/main/inbox.js";
import {checkIfFriend} from "../../utils/connectionFunctions"

export default function CreatePostCard() {
  const fileInputRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [title, setTitle] = useState(false);
  const [showtitle, setShowtitle] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [showContent, setShowContent] = useState(false)
  const [description, setDescription] = useState("");
  const [postVisibility, setPostVisibility] = useState("PUBLIC")
  const [whoSees, setWhoSees] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [showImageContent, setShowImageContent] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const[postContentType, setPostContentType] = useState("text/plain")
  const [showTextContent, setShowTextContent] = useState(false)
  const [textcontent, setPostTextContent] = useState("")
  const [base64Image, setBase64IMG] = useState("")


  const handlePostContentChange = (newContentType) => {
    setPostContentType(newContentType);
    if (newContentType === "image/png;base64"){
      setShowImageContent(true)
      setShowTextContent(false)
    }else {
      setShowTextContent(true)
      setShowImageContent(false)
      setImageSrc(false)
    }
  }

  const handleVisibilityChange = (newVisibility) => {
    setPostVisibility(newVisibility)
  }
  const getPhoto = () => {
    fileInputRef.current.click();
  };


  const handleMakePost = () => {
    setShowtitle(!showtitle);
    setShowDescriptionInput(!showDescriptionInput);
    setShowButtons(!showButtons)
    setWhoSees(!whoSees);
    setShowContent(!showContent);

    if(showTextContent){ setShowTextContent(false)}
    if(showImageContent){ setShowImageContent(false)}
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };

    reader.readAsDataURL(file);
  };


  //Send to each Inbox
  // TODO: implement inbox for Beeg Yoshi and A-Team
  const sendPostsToInboxes = (follower, response) => {
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
  const handlePost = async () => {
    // Post to server
    setIsLoading(true);
    // Get data from post- don't get rid of the const in front of description
    const description= document.getElementById("description").value;
    const title= document.getElementById("title").value;
    const postUserUUID= localStorage.getItem("user");
    const url= "authors/" + postUserUUID + "/posts/";

    const fields= {
      "title": title,
      "description": description,
      "visibility": postVisibility,
      "contentType" : postContentType
    }

    //Handle Encoding Images
    if(postContentType === "image/png;base64"){
      const imageData= imageSrc.split(",")[1]
      fields["content"] = imageData;
    } else {
      //handle Text components
      const textcontent= document.getElementById("textcontent").value;
      console.log("Found content " + textcontent)
      fields["content"] = textcontent;
    }
    console.log("fields: " + JSON.stringify(fields));
    // Send to server
    axiosService.post(url, fields)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        console.log("Post created successfully!");
        setIsLoading(false);
        //get all followers
        axiosService.get("authors/" + postUserUUID + "/followers/").then(async (followersResponse) => {
          if(followersResponse.status >= 200 <= 299){
            console.log("Followers found");
            const followers = followersResponse.data.items;
            console.log(followers)


            if(followers){
              if(response.data.visibility === "FRIENDS"){
                for(let i = 0; i < followers.length; i++){
                  let is_friend = await checkIfFriend(followers[i], postUserUUID);
                  console.log("follower " + followers[i].displayName + " is " + is_friend)
                  if (is_friend === true){
                    sendPostsToInboxes(followers[i], response)
                  }
                }} else if (response.data.visibility === "PUBLIC"){
                  // handle public posts
                  for(let i = 0; i < followers.length; i++){
                    sendPostsToInboxes(followers[i], response);
                  }}
              }
            }//followers handling end

        }).then((data) => {
          console.log(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error creating post: ", error);
          setIsLoading(false);
        }
        );

      }
      //return response;
    })
    .then((data) => {
      console.log(data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error creating post: ", error);
      setIsLoading(false);
    }
    );
  };

  return (
    <div style={styles.container}>
      <Flex flexDir="column" w="100%" >
        <Flex flexDir="column" justifyContent={whoSees ? 'flex-start' : 'center'}>
          <Button onClick={handleMakePost} style={styles.prompt}>
            <h1 style={styles.prompt}>Make New Post</h1>

          </Button>
          <Divider borderColor="black"/>
          {whoSees && (

            <>

              <Flex flexDir="column">
                <h1 style={{size: "0.8rem", color: colors.brand.c2}}>Who can see this post?</h1>
                <div>
                  <Tabs id = "visibilityTabs" variant='solid-rounded' m={6} colorScheme="whiteAlpha" size='sm' align='center'>
                    <TabList>
                      <Tab _selected={{ bg: colors.brand.c2, color: "white" }} color={colors.brand.c2} onClick={() => handleVisibilityChange("PUBLIC")}>Public</Tab>
                      <Tab _selected={{ bg: colors.brand.c2, color: "white" }} color={colors.brand.c2} onClick={() => handleVisibilityChange("FRIENDS")}>Friends</Tab>
                      <Tab _selected={{ bg: colors.brand.c2, color: "white" }} color={colors.brand.c2} onClick={() => handleVisibilityChange("PRIVATE")}>Private</Tab>
                      <Tab _selected={{ bg: colors.brand.c2, color: "white" }} color={colors.brand.c2} onClick={() => handleVisibilityChange("UNLISTED")}>Unlisted</Tab>
                    </TabList>
                  </Tabs>
                </div>

              </Flex>

            </>
          )}
        </Flex>

        <Flex style={styles.textBox}>
          {showtitle && (
            <Textarea
              type="text"
              id="title"
              placeholder="Title..."
              rows="1"
              columns="10"
              onChange={(event) => setTitle(event.target.value)}
            />
          )}
          {showDescriptionInput && (
            <Textarea
              type="text"
              id="description"
              placeholder="Add a description..."
              onChange={(event) => setDescription(event.target.value)}
            />

          )}
          { showContent && (
          <Flex flexDir="column">
          <h1 style={{size: "0.8rem", color: colors.brand.c2}}>Please Select Content Type</h1>
          <div>
            <Tabs id = "contentTabs" variant='solid-rounded' m={6} colorScheme="whiteAlpha" size='sm' align='center'>
              <TabList>
                <Tab _selected={{ bg: colors.brand.c2, color: "white" }} color={colors.brand.c2} onClick={() => handlePostContentChange("text/plain")}>Text</Tab>
                <Tab _selected={{ bg: colors.brand.c2, color: "white" }} color={colors.brand.c2} onClick={() => handlePostContentChange("text/markdown")}>Markdown</Tab>
                <Tab _selected={{ bg: colors.brand.c2, color: "white" }} color={colors.brand.c2} onClick={() => handlePostContentChange("image/png;base64")}>Picture</Tab>
              </TabList>
            </Tabs>
          </div>

        </Flex>)}

        {showTextContent && (
          <Textarea
            type="text"
            id="textcontent"
            placeholder="Add some text..."
            onChange={(event) => setPostTextContent(event.target.value)}
          />

          )}
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Selected Image"
              style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" ,marginTop: "10px" }}
            />
          )}
        </Flex>

        {showImageContent && (
          <div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <IconButton
            style={{ ...styles.icons, width: "40px", marginRight: "10px"}}
            icon={<FiImage />}
            aria-label="Image Upload"
            onClick={getPhoto}
          />
        </div>
        )}

        {showButtons && (
          <>
            <Button
              style={{ ...styles.icons, width: "80px" }}
              isLoading={isLoading} // Add the isLoading prop to the Button component
              spinner={<BeatLoader size={5} color="white" />}
              onClick={handlePost}
            >
              {isLoading ? "Posting..." : "Post"} {/* Change the text of the button based on isLoading */}
            </Button>
          </>
        )}

        </Flex>
    </div>
  );

}


const styles = {
    container:{
        width: "600px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        padding: '1rem',
        border: '1px solid',
        // backgroundColor: "",
        borderColor: colors.brand.c2,
        backgroundColor: "white",
        borderRadius: '1rem',
    },
    prompt:{
      background: "none",
      border: "none",
      color: colors.brand.c2,
      fontSize: '1.5rem',
    },
    textBox:{
      display: 'flex',
      flexDirection: 'column',
      resize: 'none',
      padding: sizes.sm,
    },
    icons:{
        marginTop: '1rem',
        backgroundColor: colors.brand.c2,
        borderRadius: '1rem',
        boxShadow: '0 0 1rem #0001',
        // marginRight: '16vw',
        // marginLeft: '16vw',
    }
}