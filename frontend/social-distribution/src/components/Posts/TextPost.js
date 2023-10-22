import React, { useEffect, useState } from "react";
import { 
    Card, 
} from '@chakra-ui/react'


export default function TextPost(props){
    // const userID= localStorage.getItem()
    // const postID = 1;                       
    const [IsLiked, SetIsLiked]= useState("");
    const [postTitle, setPostTitle]= useState("")
    const [postcontent, SetpostContent]= useState("")

    // TODO: figure out how to put data into backend

    // if no content in post- just an image
    // const [showContent, setShowContent] = useState(() => {
    //     if (props.post.contentType.startsWith("image")) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    // });

    // // user information- communicate with the backend
    // // to know which post to connect to which user
    // useEffect(() => {
    //     const getUserData = async() => {
    //         await api
    //         .get()              // get url from backend
    //         .then((response) => {
                
    //         })

    //     }
    // })

    // getUserData()

    return(
        <Card maxW='2xl'>
            <textarea
            style={styles.contentField}
            placeholder="Write something..."
            />
        </Card>
    )
}

const styles = {
    contentField: {
        width: "100%",
        maxWidth: "2000px",
        height: "60px", // Increase the height of the textarea
        padding: "10px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        resize: "none",
        marginBottom: "20px",
        overflowX: "hidden",
      },
}
