import { useRef, useState } from "react";
import { colors, sizes  } from "../../utils/theme.js";
import { Flex, Divider, IconButton, Button, Textarea, TabList, Tab, Tabs } from "@chakra-ui/react";
import { FiImage, FiLink } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import TextPost from "./TextPost.js";
import { API_URL } from "../api.js";
import axios from "axios";
import { Text } from "react-font";

export default function CreatePostCard() {
  const baseURL = "http://127.0.0.1:8000/authors/";
  const fileInputRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [title, setTitle] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState("");3
  const [whoSees, setWhoSees] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPhoto = () => {
    fileInputRef.current.click();
  };

  const handleMakePost = () => {
    setTitle(!title);
    setShowDescriptionInput(!showDescriptionInput);
    setWhoSees(!whoSees);
    setShowButtons(!showButtons);
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
    const whoSees= "PUBLIC";
    const imageData= imageSrc;
    const postUserUUID= localStorage.getItem("user");
    const url= baseURL + postUserUUID + "/posts/";

    const fields= {
      "title": title,
      "description": description,
      "image": imageData,
    }
    console.log("fields: " + JSON.stringify(fields));

    // Send to server
    axios.post(url, fields)
    .then((response) => {
      if (response.ok) {
        console.log("Post created successfully!");
        setIsLoading(false);
      }
      return response;
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
        <Flex flexDir="row" justifyContent={whoSees ? 'flex-start' : 'center'}>
          <Button onClick={handleMakePost} style={styles.prompt}>
            <h1 style={styles.prompt}>Make a New Post</h1>
          </Button>
          {whoSees && (
            <>
              <Flex flexDir="column">
                <h1 styles={{size: "0.8rem"}}>Who can see this post?</h1>
                <Tabs variant='solid-rounded' m={6} colorScheme="whiteAlpha" size='sm' align='end'>
                  <TabList>
                    <Tab>Public</Tab>
                    <Tab>Friends</Tab>
                    <Tab>Private</Tab>
                    <Tab>Unlisted</Tab>
                  </TabList>
                </Tabs>
              </Flex>

            </>
          )}
        </Flex>

        <Flex style={styles.textBox}>
          {title && (
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
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Selected Image"
              style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" ,marginTop: "10px" }}
            />
          )}  
        </Flex>
        
        <Flex flexDirection="row" justifyContent="space-between">
        {showButtons && (
          <>
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
              <IconButton
                style={{ ...styles.icons, width: "40px" }}
                icon={<FiLink />}
                aria-label="Link"
              />            
            </div>

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
      background: "none",
      border: "none",
      color: colors.brand.c4,
      fontSize: '1.5rem',
    },
    textBox:{
      display: 'flex',
      flexDirection: 'column',
      resize: 'none',
    },
    icons:{
        marginTop: '1rem',
        backgroundColor: colors.brand.c4,
        borderRadius: '1rem',
        boxShadow: '0 0 1rem #0001',
        // marginRight: '16vw',
        // marginLeft: '16vw',
    }
}