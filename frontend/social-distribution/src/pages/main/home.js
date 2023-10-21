import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { colors, sizes, spacing } from '../../utils/theme';
import Posting from './components/Posts/Posting'
import NavBarH from './components/NavbarH';

function Home() {

    return (<div className = {"mainContainer"}>
        <div> 
            <NavBarH />
            <div className='container' style={styles.container}>

            </div>
        </div>



        <Posting />

        </div>
    );
  }

  const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.brand.c1,
        height: '100vh',
        width: '100vw',
        fontSize: sizes.md,
        fontFace: fonts.body,
    },
}

  export default Home;
import React from "react";
import {colors, spacing, sizes} from "../../utils/theme";
import NavBar from "../../components/navbar";
import LogoBar from "../../components/logoBar";
import CreatePostCard from "../../components/createPostCard";

export default function Home() {

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