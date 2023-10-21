import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { colors, sizes, spacing, fonts } from './utils/theme';

import Posting from './components/Posts/Posting'
import NavBarH from './components/NavbarH';
import { Box } from '@chakra-ui/react';

function Home() {

    return (<div className = {"mainContainer"}>
        <div> 
            <NavBarH />
            <div className='container' style={styles.container}>
                <div className='Header' style = {styles.headers}>
                    <h1>My Stream</h1>
                </div>
                <Box bg="white" p={100} rounded="md" w={800}>
                    
                    <Posting /> 
                    <Posting /> 
                    <Posting /> 
                    <Posting /> 
                </Box>

            
            </div>
        </div>



        

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
    headers:{
        marginBottom: spacing.xl,
        fontSize: sizes.xl,
    },

}

  export default Home;
