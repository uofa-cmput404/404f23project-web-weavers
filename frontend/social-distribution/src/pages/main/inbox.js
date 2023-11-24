import React from "react";
import NavBar from "../../components/Bars/navbar.js";
import { colors, spacing} from "../../utils/theme.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";
import { Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import Messages from "./inbox_screens/messages.js";
import Notifications from "./inbox_screens/notifications.js";
import Requests from "./inbox_screens/requests.js";

export default function Inbox({props}){
    const user = localStorage.getItem("user")
    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Inbox' uuid={user}/>
            <FriendsBar/>

            <div className='tab-container' style={styles.tabContainer}>
                <Tabs variant='soft-rounded' isFitted m={6} colorScheme="blackAlpha" size='sm' align='center'>
                    <TabList>
                        <Tab>Messages</Tab>
                        <Tab>Notifications</Tab>
                        <Tab>Requests</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Messages />
                        </TabPanel>
                        <TabPanel>
                            <Notifications />
                        </TabPanel>
                        <TabPanel>
                            <Requests />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    )
}
const styles = {
    container:{
        backgroundColor: colors.brand.c6,
        height: "100vh",
        color: colors.text.t2
    },

    tabContainer:{
        width: '700px',
        padding: spacing.xxl,
        height: '80%',
        boxShadow:"4px 4px 12px 0 rgba(0,0,0,0.50)",
        border: '1px solid',
        borderColor: colors.brand.c4,
        margin: 'auto',
        backgroundColor: colors.brand.c8,
        overflow: "auto",
    }
}