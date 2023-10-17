import React, { useContext, useState, Component, View } from "react";
import { useEffect } from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import "./Posting.css"

export default function Post(props){
    const userID= localStorage.getItem()
    const postID = 1;                       // figure out how to get ID later
    const [IsLiked, SetIsLiked]= useState(false);
    const [postcontent, SetpostContent]= useState(false)
    const [postImage, SetpostImage]= useState(props.post.image);

    // if no content in post- just an image
    const [showContent, setShowContent] = useState(() => {
        if (props.post.contentType.startsWith("image")) {
          return false;
        } else {
          return true;
        }
    });

    // user information- communicate with the back end
    // async and await
    useEffect(() => {
        const getUserData = async() => {
            await api
            .get()              // get url from backend
            .then((response) => {
                
            })


            await api

        }


        const getPostImage = async() => {
            await api
            .get()
            .then((res) => {
                const data= ''
                SetpostImage(data)
            })

            .catch((err) => {
                console.log(err)
            })
        }
    })

    getUserData()

    return(
        <Card>
            <Card.Header>
                <div className="card-content">

                </div>
            </Card.Header>
            <Card.Body>
                {postImage}
                <div className="like-comment-area">

                    
                </div>

                <div>
                    {postcontent}
                </div>
                
            </Card.Body>
        </Card>
    )
}

