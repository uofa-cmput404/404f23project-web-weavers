import React from "react";
import {colors, sizes, spacing} from "../../utils/theme";
import NavBar from "../../components/Bars/navbar";
import LogoBar from "../../components/Bars/logoBar";
import CreatePostCard from "../../components/Posts/createPostCard";
import FriendsBar from "../../components/FriendsBar/friendsBar";
import { Divider, Flex } from "@chakra-ui/react";
import PostFeed from "../../components/Posts/postFeed";

export default function Home() {

    return (
        <div style={styles.containers}>
            <LogoBar/>
            <NavBar current='Home'/>
            <FriendsBar/>
            
            <div style={styles.content}>
                <CreatePostCard/>
                <Flex direction="column" align="center" justify="center">
                    <Divider orientation="horizontal" width="50%" mt='5rem' colorScheme="blackAlpha" />
                </Flex>
                <Flex direction='column' align='center' justify='center' mt={spacing.xl}>
                    <PostFeed />
                </Flex>
            </div>
        </div>
    );
}
const styles = {
    containers:{
        backgroundColor: colors.brand.c6,
    },
    content:{
        paddingTop: '5rem',
        height:'100vh',
        overflow:'scroll',
    },

}