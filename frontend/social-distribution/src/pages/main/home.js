import React from "react";
import {colors, spacing, sizes} from "../../utils/theme";
import NavBar from "../../components/navbar";
import LogoBar from "../../components/logoBar";
import CreatePostCard from "../../components/createPostCard";

export default function Home() {
    //This is where the uuid of the user is being stored for now
    console.log(localStorage.getItem("user"))
    return (
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Home'/>

            <div style={styles.content}>
                <CreatePostCard/>
            </div>
        </div>
    );
}
const styles = {
    container:{
        backgroundColor: colors.brand.c6,
        height: "100vh",
    },
    content:{
        // padding: spacing.medium,
        width: sizes.contentWidth,
        paddingTop: '5rem'
    }
}