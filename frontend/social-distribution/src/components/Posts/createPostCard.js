import { useRef, useState } from "react";
import { colors  } from "../../utils/theme.js";
import { Flex, Divider, IconButton, Button } from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import TextPost from "./TextPost.js";
import axiosService, {PacketPiratesServices} from "../../utils/axios"

export default function CreatePostCard() {
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState("");
  const [showTextPost, setShowTextPost] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPhoto = () => {
    fileInputRef.current.click();
  };

  const handleDescriptionChage = (event) => {
    setDescription(event.target.value);
  };

  const handTitleClick = () => {
    setTitle(!title);
  };

  const handleHeaderClick = () => {
    setShowDescriptionInput(!showDescriptionInput);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handlePost = () => {
    // Post to server
    setIsLoading(true);

    // Get data from post- don't get rid of the const in front of description
    const description= document.getElementById("description").value;
    const title= document.getElementById("title").value;
    const imageData= imageSrc;
    const postUserUUID= localStorage.getItem("user");
    const url= "authors/" + postUserUUID + "/posts/";

    const fields= {
      "title": title,
      "description": description,
      "image": imageData,
    }
    console.log("fields: " + JSON.stringify(fields));

    // Send to server
    axiosService.post(url, fields)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        console.log("Post created successfully!");
        setIsLoading(false);

        //get all followers
        axiosService.get("authors/" + postUserUUID + "/followers/").then((followersResponse) => {
          if(followersResponse.status >= 200 <= 299){
            console.log("Followers found");
            const followers = followersResponse.data.items;
            console.log(followers)

            //Send to each Inbox
            if(followers){
              for(let i = 0; i < followers.length; i++){

                if(followers[i].host === "https://web-weavers-backend-fb4af7963149.herokuapp.com/"){
                  axiosService.post("authors/" + followers[i].uuid + "/inbox/", response.data).then((inboxResponse) => {
                    console.log("Successfully sent post to follower " + followers[i].displayName);
                  }).catch((error) =>{
                    console.log(error);
                  })
              } else if (followers[i].host === "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/"){
                  PacketPiratesServices.post("authors/" + followers[i].uuid + "/inbox", response.data).then((inboxResponse) => {
                    console.log("Successfully sent post to follower " + followers[i].displayName);
                  }).catch((error) =>{
                    console.log(error);
                  })
              }

              }}
          }

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
      <Flex flexDir="column" w="100%" alignItems="center" align="center" >
        <h1 style={styles.prompt}>Make a New Post</h1>
        <Button onClick={handTitleClick} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <h1 >Add a title</h1>
        </Button>
        {title && (
          <textarea
            type="text"
            id="title"
            placeholder="Add a title..."
            rows="1"
            onChange={(event) => setTitle(event.target.value)}
          />
        )}
        <Button onClick={handleHeaderClick} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <h1 >Add a description</h1>
        </Button>
        {showDescriptionInput && (
          <textarea
            type="text"
            id="description"
            placeholder="Add a description..."
            onChange={(event) => setDescription(event.target.value)}
          />
        )}

        {imageSrc && (
          <img
            src={imageSrc}
            alt="Selected Image"
            style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" ,marginTop: "10px" }}
          />
        )}

        <Divider />
        <Flex flexDir="row" align="center">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <IconButton
            style={{ ...styles.icons, width: "40px", marginRight: "100px" }}
            icon={<FiImage />}
            aria-label="Image Upload"
            onClick={getPhoto}
          />
          <Button
            style={{ ...styles.icons, width: "80px", marginLeft: "100px" }}
            isLoading={isLoading} // Add the isLoading prop to the Button component
            spinner={<BeatLoader size={5} color="white" />}
            onClick={handlePost}
          >
            {isLoading ? "Posting..." : "Post"} {/* Change the text of the button based on isLoading */}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

const styles = {
    container:{
        width: "40vw",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        padding: '1rem',
        border: '1px solid',
        borderColor: colors.brand.c4,
        borderRadius: '1rem',
    },
    prompt:{
      color: colors.brand.c4,
      fontSize: '1.5rem',
    },
    icons:{
        marginTop: '1rem',
        backgroundColor: colors.brand.c4,
        borderRadius: '1rem',
        boxShadow: '0 0 1rem #0001',
        marginRight: '16vw',
        marginLeft: '16vw',
    }
}