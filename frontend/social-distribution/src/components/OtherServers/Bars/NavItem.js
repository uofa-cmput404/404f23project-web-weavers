import React from 'react'
import {Flex,Text,Icon,Link,Menu,MenuButton} from '@chakra-ui/react'
import {colors} from '../../utils/theme.js'


export default function NavItem({ icon, title, active, navSize, ...props}) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start"}
        >
            <Menu>
                <Link
                    backgroundColor={active && colors.brand.c2}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: colors.brand.c2 }}
                    w={navSize === "large" && "100%"}    
                >
                    <MenuButton w="100%" {...props}>
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "white" : "gray.400"} />
                            <Text ml={5} display={navSize === "small" ? "none" : "flex"} color={active ? "white" : "gray.400"} >{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>

            </Menu>
        </Flex>
    )
}