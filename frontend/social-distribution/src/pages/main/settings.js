import React, { useEffect, useState } from 'react';
import NavBar from "../../components/Bars/navbar.js";
import { colors, sizes } from "../../utils/theme.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";
import { Card, CardBody, Divider } from "@chakra-ui/react";
import axiosService from '../../utils/axios.ts';
import Button from '../../components/Button.js';

export default function Settings({props}){
    const user = localStorage.getItem("user")
    const [username, setUsername] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [gitHub, setGitHub] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoadingUser, setIsLoadingUser] = useState(true)

    useEffect(() => {
        const fetchdata = async () => {
            // takes a second to load this
            const res = await axiosService.get("authors/" + user)
            setUsername(res.data.displayName)
            setGitHub(res.data.github)
            setProfilePicture(res.data.profileImage)
        };
        fetchdata()
        setIsLoadingUser(false)
    }
    , [])


    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handleGitHubChange = (event) => {
        setGitHub(event.target.value)
    }

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.value)

        const res = axiosService.post("authors/" + user + "/", {
            profileImage: event.target.value
        })
    }

    const handleSubmit = (event) => {
        setIsLoading(true)
        event.preventDefault();

        const res = axiosService.post("authors/" + user + "/", {
            displayName: username,
            profilePicture: profilePicture,
            github: gitHub
        })

        setIsLoading(false)
        setIsSubmitted(true)
    }

    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Settings' uuid={user}/>
            <FriendsBar user={user} selectedServer = {"WebWeavers"}/>
            <div style={{height: "5vh"}}></div> {/*Just to account for height of LogoBar */}
            <Card maxW='md' style={styles.settingsForm}>
                <CardBody >
                    <h1 style={{fontSize: sizes.lg}}>Settings</h1>
                    <Divider/>
                    {!isLoadingUser && (
                        <form onSubmit={handleSubmit} style={styles.editForm}>
                            <label style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px'}}>
                                Username: 
                                <input type="text" value={username} style={{marginLeft: '10px'}} onChange={handleUsernameChange} />
                            </label>
                            <label style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px'}}>
                                GitHub Account: 
                                <input type="text" value={gitHub} style={{marginLeft: '10px'}} onChange={handleGitHubChange}/>
                            </label>                        
                            <label style={{...styles.buttonIcon, cursor: 'pointer'}}>
                                <input type="file" value={profilePicture} style={{display: 'none', marginLeft: '10px'}} onChange={handleProfilePictureChange} />
                                Choose File
                            </label>
                            <Button 
                                type="submit" 
                                isLoading={isLoading} 
                                style={styles.buttonIcon}>
                                    {isLoading ? "Loading..." : "Submit"}
                            </Button>
                            {isSubmitted && (
                                <div style={{color: 'green', marginTop: '10px'}}>Submitted!</div>
                            )}
                        </form>
                    )}

                </CardBody>
            </Card>

        </div>
    )
}
const styles = {
    container:{
        display: 'flex',
        height: '100vh',
        backgroundColor: colors.brand.c6,
    },
    settingsForm:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        height: '80%',
        backgroundColor: colors.brand.c3,
    },
    editForm:{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        // backgroundColor: colors.brand.c4,
        padding: '20px',
        borderRadius: '10px',
        height: '80%',
    },
    buttonIcon:{
        marginTop: '1rem',
        backgroundColor: colors.brand.c2,
        color: 'white',
        padding: '10px 20px',
        borderRadius: '1rem',
        boxShadow: '0 0 1rem #0001',
    }
}