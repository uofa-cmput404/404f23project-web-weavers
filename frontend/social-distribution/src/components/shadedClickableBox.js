import { Avatar, Link, Flex, IconButton, Text, Modal } from "@chakra-ui/react";
import { colors, spacing } from "../utils/theme";
import {FiBell} from 'react-icons/fi'


export default function ShadedClickableBox({variant_,text,username,avatar,...props}) {
    const variant = {
        notif: variant_ === 'notif',
        msg: variant_ === 'msg',
      }

    const handleClick = () => {
        console.log('clicked')
    }

     
    return(
        <Link
                    onClick={handleClick}
                    _hover={{ textDecoration: "none", backgroundColor:colors.brand.c4}
                    }
                >
        <Flex p={spacing.lg} style={styles.square} flexDir='row'mb={1}>
            
            {variant.notif ? 
                <Flex >
                    <IconButton mr={5} justifyItems={'left'} icon={<FiBell/>}>
                    </IconButton>
                    <Text align={"left"}> 
                        {text}
                    </Text>
                </Flex>
            : 
            
            <Flex align ="center" style={styles.square} >
                
                    <Flex style={styles.container} flexDir="row" align="right">
                        <Avatar name={username} src={avatar} size="md" ml={2}/>
                        <Flex flexDir="column" align={"left"}>
                            <Text ml={5} fontWeight={3} color={"black"}> {username} </Text>
                            <Text ml={5} align={"left"}> Hi! </Text>
                        </Flex>
                    </Flex>
                    
                </Flex>
            
            
            } 
            </Flex>
            </Link>
        

    )
}

const styles = {
    square:{
        backgroundColor: "white",
        // overflow: "auto",
        borderRadius: "5px",
        // padding: spacing.lg,
    }
}