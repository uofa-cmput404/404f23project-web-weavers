import React from 'react';
import { colors, sizes, spacing } from '../../utils/theme';
import Welcome from './welcome';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import logo from "../../assets/logo.png"
import AdminLogin from './adminLogin';
import Signup from './signup';
import About from './about';

function LandingPage() {
  

  return (
    <>
    <div className='tab-container' style={styles.tabContainer}>
      
      <div className="tabs" style={styles.tabs}>
        <Tabs isFitted variant='solid-rounded' m={6} colorScheme="whiteAlpha" size='lg' align='center'>
            <TabList>
                <Tab><img src={logo} alt="logo" style={styles.logo}/></Tab>
                <Tab>About</Tab>
                <Tab>Sign Up</Tab>
                <Tab>Login</Tab>
            </TabList>

            <TabPanels>
                  <TabPanel>
                     <Welcome />
                  </TabPanel>
                  <TabPanel>
                      <About />
                  </TabPanel>
                  <TabPanel>
                      <Signup />
                  </TabPanel>
                  <TabPanel>
                      <AdminLogin />
                  </TabPanel>
            </TabPanels>
        </Tabs>
        </div>
    </div>
            
        
      </>
  );
}

const styles = { 
  tabs: {
    width: '100vw',
    border: '1px solid black',
  },
  logo: {
    width: '10vw',
    height: '8vh',
    marginTop: '10px',
    zIndex: '1',
    position: 'absolute',
},   
  tabContainer: {
    display: 'flex',
    width: '100vw',
    backgroundColor: colors.brand.c4,
  }
}
export default LandingPage;