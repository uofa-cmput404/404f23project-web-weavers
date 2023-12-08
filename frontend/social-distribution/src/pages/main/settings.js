import React, { useState } from 'react';
import NavBar from "../../components/Bars/navbar.js";
import { colors, sizes } from "../../utils/theme.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";
import { Card, CardBody, Divider } from "@chakra-ui/react";
import axiosService from '../../utils/axios.ts';
import { FontSize } from '../../components/OtherServers/styles.js';

export default function Settings({props}){
    const user = localStorage.getItem("user")
    const [username, setUsername] = useState("")
    const [profilePicture, setProfilePicture] = useState(null)

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.value)

        const res = axiosService.post("authors/" + user + "/", {
            profileImage: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const res = axiosService.post("authors/" + user + "/", {
            displayName: username,
            profilePicture: profilePicture
        })



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
                    <form onSubmit={handleSubmit} style={styles.editForm}>
                        <label style={{marginBottom: '20px'}}>
                            Username: 
                            <input type="text" value={username} onChange={handleUsernameChange} />
                        </label>
                        <label style={{marginBottom: '20px'}}>
                            Password: 
                            <input type="password" />
                        </label>
                        <label style={{marginBottom: '20px'}}>
                            Profile Picture: 
                            <input type="file" onChange={handleProfilePictureChange} />
                        </label>
                        <label style={{marginBottom: '20px'}}>
                            GitHub Account: 
                            <input type="text" />
                        </label>

                        <input type="submit" value="Submit" />
                    </form>
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
        backgroundColor: colors.brand.c4,
        padding: '20px',
        borderRadius: '10px',
    }
}