import { useRef, useState } from "react";
import { colors  } from "../../utils/theme.js";
import { Flex, Divider, IconButton, Button } from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import TextPost from "./TextPost.js";

export default function CreatePostCard() {
  const fileInputRef = useRef(null);
  const [showTextPost, setShowTextPost] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

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

  const post = () => {
    console.log("post");
  };

  return (
    <div style={styles.container}>
      <Flex flexDir="column" w="100%" alignItems="center" align="center" >
        {/* Note: Make the description box not resizable */}
        <h1 style={styles.prompt}>Make a New Post</h1>
        <h1
          style={{ height: "40px", width: "flex",cursor: "pointer" }}
          onClick={() => setShowTextPost(!showTextPost)}
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
        <Flex flexDir="row" align="start">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <IconButton
            style={styles.icons}
            icon={<FiImage />}
            aria-label="Image Upload"
            onClick={getPhoto}
          />
          {/* TODO: add isLoading prop but find way for it to modify! */}
          <Button
            style={styles.icons}
            spinner={<BeatLoader size={8} color="white" />}
            onClick={post}
          >
            Post
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