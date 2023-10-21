import React from "react";
import NavBar from "../../components/navbar.js";
import { colors } from "../../utils/theme.js";
import LogoBar from "../../components/logoBar.js";

export default function Inbox({props}){
    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Inbox'/>
            <h1>Explore</h1>
        </div>
    )
}
const styles = {
    container:{
        backgroundColor: colors.brand.c4,
        height: "100vh",

    }
}