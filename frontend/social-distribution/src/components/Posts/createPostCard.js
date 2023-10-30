import { useRef, useState } from "react";
import { colors  } from "../../utils/theme.js";
import { Flex, Divider, IconButton, Button } from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import TextPost from "./TextPost.js";
import { authorUUID, postUUID } from "../../utils/utils.js";

export default function CreatePostCard() {
  const { baseURL } = "http://127.0.0.1:8000/authors/";
  const fileInputRef = useRef(null);
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [showTextPost, setShowTextPost] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPhoto = () => {
    fileInputRef.current.click();
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
    setIsLoading(true);
    
    // Get data from post
    const description= document.getElementById("description").value;
    const imageData= imageSrc;

    const postUserUUID= authorUUID(localStorage.getItem("userID"));
    const postID= postUUID(localStorage.getItem("postID"));

    const url= baseURL + postUserUUID + "/posts/" + postID + "/";

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", imageData);

    // Send to server
    fetch( url, {
      method: "POST",
      body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Post created successfully!");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error creating post: ", error);
          setIsLoading(false);
        });
  };

  return (
    <div style={styles.container}>
      <Flex flexDir="column" w="100%" alignItems="center" align="center" >
        {/* Note: Make the description box not resizable */}
        <h1 style={styles.prompt}>Make a New Post</h1>
        <h1
          style={{ height: "40px", width: "flex",cursor: "pointer" }}
          onClick={() => setShowTextPost(!showTextPost)}
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        >
          Add a description...
        </h1>

        {showTextPost && <TextPost style={{ maxWidth: "xl"}}/>}

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