import React from "react";
import {Button,Input,InputGroup,InputLeftElement,InputRightAddon} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import {colors} from '../../utils/theme.js'

{/* 
    TODO: May be change the color of the search bar when clicked -> not blue! 
          Search functionality is not implemented yet!
          Integration with backend is not implemented yet!
*/}

export const SearchBar = ({props}) => {
  return (
    <div style={{marginBottom:'5rem'}}>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input type="text" placeholder="Search Users..." border="1px solid #949494" color="white" />
        <InputRightAddon
          p={0}
          border="none"
        >
          <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494" style={styles.colored}>
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </div>
  );
};

const styles = {
    colored:{
        backgroundColor: colors.brand.c4,
    }

}