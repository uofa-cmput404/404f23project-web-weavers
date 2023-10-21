import { colors,spacing,sizes, buttonSizes } from "../utils/theme";
import logo from "../assets/logo_.png";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function NavBarH({...attributes }) {

    return (
        <div style={styles.navbar}>
            <div className="logo-container" style={styles.lcontainer}>
            <img src={logo} alt="logo" style={styles.logo}/>
            </div>
            
            <div className="tabs" style={styles.tabs}>
                <Tabs isFitted variant='solid-rounded' m={6} colorScheme="whiteAlpha" >
                    <TabList>
                        <Tab>Home</Tab>
                        <Tab>About</Tab>
                        <Tab>Sign Up</Tab>
                        <Tab>Login</Tab>
    
                    </TabList>

                    <TabPanels>
                    

                    </TabPanels>
                </Tabs>
            </div>
            
        </div>
    );

}

const styles = {
    navbar: {
        width:'100vw',
        backgroundColor: colors.brand.c4,
        height: '8vh',
        margin: '0',
    },
    logo: {
        width: '10vw',
        height: '8vh',
    },
    tabs: {
        float: 'right',
        height: '8vh',
        width: '80vw',
    },
    lcontainer: {
        float: 'left',
        width: '20vw',
        height: '8vh',
    }
   
}