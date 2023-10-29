import React, { useState, useEffect, useRef } from "react";
import {Flex, Divider, IconButton, Button} from '@chakra-ui/react'
import { sizes, colors } from "../../utils/theme";
import {API_URL} from "../../components/api";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { FiImage } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import {
    Box,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    VStack
  } from "@chakra-ui/react";
  import { useFormik} from 'formik';


export function EditPost(){
    const fileInputRef = useRef(null);
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

    const location = useLocation();
    const navigate = useNavigate();
    const[postData, setPostData] = useState(false);

    //If a user has accessed this page without information send them back
    useEffect(() => {
        if(!location.state.postData){
            navigate("/home")
        }
    })



    //render in all text in a changeable format
    //add a save and cancel button at the end
    //on save send a POST to change and re-hide the component

    const formik = useFormik({
        initialValues: {
            title: location.state.postData.title,
            description: location.state.postData.description,
            categories: location.state.postData.categories,
            visibility: location.state.postData.visibility},
        onSubmit: values => {
            console.log("API is " + location.state.postData.id + "/" + JSON.stringify(values))
                axios.post(location.state.postData.id + "/", values).then((response) => {
                console.log(response)
                navigate("/mystream")
            }).catch(function(error){
                console.log(JSON.stringify(error))
                alert("Editing Post failed. Please try again later")
                })
        }})

return (
    <div style={styles.container}>
        <form onSubmit={formik.handleSubmit}>
            <VStack spacing={3} align="flex-start" padding = "0.5rem">
                <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue = {formik.values.title}
                    onChange={formik.handleChange}
                    />
                </FormControl>
                <FormControl>
                <FormLabel htmlFor="description"> Description </FormLabel>
                <Input
                    id="description"
                    name="description"
                    type="text"
                    defaultValue = {formik.values.description}
                    onChange={formik.handleChange}
                    />
                </FormControl>
                <FormControl>
                <FormLabel htmlFor="categories"> Categories </FormLabel>
                <Input
                    id="categories"
                    name="categories"
                    type="text"
                    defaultValue = {formik.values.categories}
                    onChange={formik.handleChange}
                    />
                </FormControl>
                <FormControl>
                <FormLabel htmlFor="visibility"> Visibility </FormLabel>
                <Input
                    id="visibility"
                    name="visibility"
                    type="text"
                    defaultValue = {formik.values.visibility}
                    onChange={formik.handleChange}
                    />
                </FormControl>
            </VStack>
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
                type="submit"
                > Save
                </Button>
            </Flex>
        </form>
    </div>
    );
}

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: "600px",
      marginTop: "20px",
    },
    postImage: {
      width: "100%",
      height: "auto",
      marginBottom: "10px",
    },
    likeButton: {
        color: "red",
    },
    commentButton: {
        mt: "2",
        backgroundColor: colors.brand.c2,
        ":hover": {
            backgroundColor: colors.brand.c1,
        }
    },
    buttons: {
      marginTop: "10px",
    },
  };

