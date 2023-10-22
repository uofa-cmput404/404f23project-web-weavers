import {colors} from "../../utils/theme.js";
import { Flex, Icon } from "@chakra-ui/react";
import { SearchBar } from "./searchBar.js";
import FriendIcon from "./friendIcon.js";

/* { 
    TODO: Integrate with backend API to get list of friends and necessary data
} */

export default function FriendsBar({props}) {
    // Note: only placeholder data for now
    // Only show 10 at a time each page or make it scrollable; Deal with the overflow
    // Add pages to the bottom of the friends bar
    const users = [
        {fullName: "Jane Doe", username: "janedoe", avatar: "https://bit.ly/tioluwani-kolawole"},
        {fullName: "Kent Dodds", username: "kentcdodds", avatar: "https://bit.ly/kent-c-dodds"},
        {fullName: "Ryan Florence", username: "ryanflorence", avatar: "https://bit.ly/ryan-florence"},
        {fullName: "Prosper Otemuyiwa", username: "unicodeveloper", avatar: "https://bit.ly/prosper-baba"}, 
        {fullName: "Christian Nwamba", username: "codebeast", avatar: "https://bit.ly/code-beast"}, 
        {fullName: "Segun Adebayo", username: "thesegunadebayo", avatar: "https://bit.ly/sage-adebayo"},   
        {fullName: "Ryan Florence", username: "ryanflorence", avatar: "https://bit.ly/ryan-florence"},
        {fullName: "Prosper Otemuyiwa", username: "unicodeveloper", avatar: "https://bit.ly/prosper-baba"}, 
        {fullName: "Christian Nwamba", username: "codebeast", avatar: "https://bit.ly/code-beast"}, 
        {fullName: "Segun Adebayo", username: "thesegunadebayo", avatar: "https://bit.ly/sage-adebayo"},  
    ]



    return (
        <div >
            <Flex style={styles.container} flexDir="column" pos="sticky" h="95vh" w="300px" left={'84vw'} top={'5vh'}>
                <SearchBar />
         
                <Flex flexDir="column" w="100%" alignItems="center" align="center">
                   {users.map((user) => (

                        <FriendIcon fullName={user.fullName} username={user.username} avatar={user.avatar} />
                    ))}
              
                </Flex> 
        
            </Flex>
        </div>
    )
}

const styles = {
    container:{
        boxShadow:"0 4px 12px 0 rgba(0,0,0,0.5)",
        backgroundColor:colors.text.t1,
        zIndex:1,
        position:"absolute",
        padding:'1rem',
        overflow:'scroll',
    },
   
}