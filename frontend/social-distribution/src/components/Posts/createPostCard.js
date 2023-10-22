import React from "react";
import {colors} from "../../utils/theme.js";
import { Divider,Flex, IconButton, Button } from "@chakra-ui/react";
import {FiImage} from "react-icons/fi";
import { BeatLoader } from "react-spinners";

{/*
    TODO: Add functionality to the post button and image upload button
          Integrate with backend
          Add Description box w/ functionality
          Okay mb but yeah the buttons do not align properly if window is resized
*/}

export default function CreatePostCard({props}){
    const [content, setContent] = React.useState(''); 
    const [image, setImage] = React.useState('');
    const getPhoto = () => {
        console.log("get photo");
    }

    const post = () => {
        console.log("post");
    }

    return(
        <div style={styles.container}>
        <Flex flexDir="column" w="100%" alignItems="center" align="center">
            {/* Note: Make the description box not resizable 
                      Text tab would be here
            */}
            <h1 style={{height:'80px'}}>Create Text Post Component</h1>
            <Divider/>
            <Flex flexDir="row" align="start" >
                <IconButton style={styles.icons} icon={<FiImage/>} aria-label="Image Upload" onClick={getPhoto}/>
                {/* TODO: add isLoading prop but find way for it to modify! */}
                <Button style={styles.icons} spinner={<BeatLoader size={8} color='white' />} onClick={post}>
                    Post
                </Button>
            </Flex>
            
        </Flex>
        </div>
    )
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
        borderColor: colors.brand.c4,
        borderRadius: '1rem',
    },
    icons:{
        marginTop: '1rem',
        backgroundColor: colors.brand.c4,
        borderRadius: '1rem',
        boxShadow: '0 0 1rem #0001',
        marginRight: '220px',
        marginLeft: '220px',
    }
}