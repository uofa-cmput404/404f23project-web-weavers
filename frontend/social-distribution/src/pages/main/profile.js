import React from "react";
import NavBar from "../../components/Bars/navbar.js";
import { colors } from "../../utils/theme.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";

export default function Profile({props}){
    const user = localStorage.getItem("user")
    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Profile' uuid={user}/>
            <FriendsBar user= {user}/>
            <h1>Explore</h1>
        </div>
    )
}
const styles = {
    container:{
        // backgroundColor: colors.brand.c6,
        height: "100vh",

    }
}