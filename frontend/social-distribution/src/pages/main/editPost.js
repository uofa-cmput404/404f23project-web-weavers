import React, { useState, useEffect, useRef } from "react";
import {Flex, Divider, IconButton, Button, Card, Textarea} from '@chakra-ui/react'
import {colors, sizes, spacing } from "../../utils/theme";
import axiosService from "../../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FiImage } from "react-icons/fi";
import {FormControl,FormLabel,Input,VStack} from "@chakra-ui/react";
import { useFormik} from 'formik';
import NavBar from "../../components/Bars/navbar.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";


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
            visibility: location.state.postData.visibility,
            content: location.state.postData.content,
        },
        onSubmit: values => {
            const url = "authors/" + location.state.postData.id.split("/authors/")[1] + "/"
                axiosService.post(url, values).then((response) => {
                navigate("/mystream")
            }).catch(function(error){
                console.log(JSON.stringify(error))
                alert("Editing Post failed. Please try again later")
                })
        }})

return (
    <div style={styles.container}>
            <LogoBar/>
            <NavBar current='My Stream'/>
        <div style={styles.content}>
        <div style={styles.postContainer}>
        <Card maxW='md'>

        <form onSubmit={formik.handleSubmit}>
            <VStack spacing={3} alignItems= "center" align="flex-start" padding = "2.0rem">
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
                <FormControl>
                <FormLabel htmlFor="content"> Content</FormLabel>
                <Textarea
                    id="content"
                    name="content"
                    defaultValue = {formik.values.content}
                    onChange={formik.handleChange}
                    size='sm'
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
            <Flex flexDir="row" align="center" padding = "2.0rem">
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
        </Card>

        </div>
        </div>
    </div>
    );
}
const navbarHeight = "50px"; // replace with actual height of NavBar

const styles = {
    container: {
        backgroundColor: colors.brand.c6,
        height: "100%",
    },
    content: {
        // padding: spacing.medium,
        width: sizes.contentWidth,
        paddingTop: '5rem',
        height: `calc(100vh - ${navbarHeight})`, // set height to remaining viewport height
        marginBottom: "20px",

    },
    postContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: colors.brand.c3,
        paddingBottom: spacing.md,
        overflow: "auto",
        paddingTop: spacing.md,
        margin: spacing.md

    },
    postImage: {
      width: "100%",
      height: "auto",
      marginBottom: "10px",
    },
    buttons: {
      marginTop: "10px",
    },
  };

