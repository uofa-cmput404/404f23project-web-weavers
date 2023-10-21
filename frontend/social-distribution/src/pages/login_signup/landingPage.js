import React from 'react';
import { colors } from '../../utils/theme';
import { Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import logo from "../../assets/logo.png"
import Welcome from './tab_screens/welcome';
import About from './tab_screens/about';
import Signup from './tab_screens/signup';
import AdminLogin from './tab_screens/adminLogin';

function LandingPage() {
    return (
    <>
    <div className='tab-container' style={styles.tabContainer}>
        <img src={logo} alt="logo" style={styles.logo} />
   
      <div className="tabs" style={styles.tabs}>
        <Tabs variant='solid-rounded' m={6} colorScheme="whiteAlpha" size='sm' align='end'>
            <TabList>
                <Tab>Home</Tab>
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
    width: '8vw',
    height: '8vh',
    zIndex: '1',
    position: 'absolute',
    marginLeft: '45vw',
},   
  tabContainer: {
    display: 'flex',
    width: '100vw',
    backgroundColor: colors.brand.c4,
  }
}
export default LandingPage;