import React from 'react';
import { colors } from '../../utils/theme';
import { Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import logo from "../../assets/logo.png"
import Welcome from './tab_screens/welcome';
import About from './tab_screens/about';
import UserStart from './tab_screens/user_start';
import Login from './tab_screens/login';

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
                      <UserStart />
                  </TabPanel>
                  <TabPanel>
                      <Login />
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
    boxShadow:"4px 4px 12px 0 rgba(0,0,0,0.50)",
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