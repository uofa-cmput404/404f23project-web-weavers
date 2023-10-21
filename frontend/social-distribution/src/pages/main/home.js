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
