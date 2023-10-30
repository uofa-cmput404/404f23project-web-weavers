import React from "react";
import NavBar from "../../components/Bars/navbar.js";
import { colors } from "../../utils/theme.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";

export default function Settings({props}){
    const user = localStorage.getItem("user")
    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Settings' user/>
            <FriendsBar/>
            <h1>Explore</h1>
        </div>
    )
}
const styles = {
    container:{
        display: 'flex',
        height: '100vh',
        backgroundColor: colors.brand.c6,
    }
}