import React from "react";
import NavBar from "../../components/Bars/navbar.js";
import { colors } from "../../utils/theme.js";
import LogoBar from "../../components/Bars/logoBar.js";
import GitActivity from "../../components/Github/GitActivity.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";
import GitActivity from "../../components/Github/GitActivity.js";

export default function MyStream({props}){
    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='My Stream'/>
            <FriendsBar/>
            <GitActivity/>
            <h1>My Stream</h1>
        </div>
    )
}

const styles = {
    container:{
        backgroundColor: colors.brand.c6,
        height: "100vh",

    }
}