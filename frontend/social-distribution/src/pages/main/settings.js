import React from "react";
import NavBar from "../../components/navbar.js";
import { colors } from "../../utils/theme.js";
import LogoBar from "../../components/logoBar.js";

export default function Settings({props}){
    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Settings'/>
            <h1>Explore</h1>
        </div>
    )
}
const styles = {
    container:{
        display: 'flex',
        height: '100vh',
        backgroundColor: colors.brand.c4,
    }
}