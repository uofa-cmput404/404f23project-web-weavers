import { useRef, useState } from "react";
import { colors  } from "../../utils/theme.js";
import { Flex, Divider, IconButton, Button } from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import TextPost from "./TextPost.js";
import { API_URL } from "../api.js";
import axios from "axios";

export default function CreatePostCard() {
  const baseURL = "http://127.0.0.1:8000/authors/";
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState("");

  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPhoto = () => {
    fileInputRef.current.click();
  };

  const handleMakePost = () => {
    setTitle(!title);
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
      <Flex flexDir="column" w="100%" alignItems="center" align="center" >
        <Button onClick={handleMakePost} style={styles.prompt}>
          <h1 style={styles.prompt}>Make a New Post</h1>
        </Button>
        {title && (
          <textarea
            type="text"
            id="title"
            placeholder="Title..."
            rows="1"
            columns="10"
            onChange={(event) => setTitle(event.target.value)}
          />
        )}
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
      background: "none",
      border: "none",
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