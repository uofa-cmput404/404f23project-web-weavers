import React from "react";
import {Button,Input,InputGroup,InputLeftElement,InputRightAddon} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import {colors} from '../../utils/theme.js';
import { useFormik} from 'formik';;

{/*
    TODO: May be change the color of the search bar when clicked -> not blue!
          Search functionality is not implemented yet!
          Integration with backend is not implemented yet!
*/}

export const SearchBar = ({onSearch}) => {
  const [input, setInput] = React.useState("");

  return (
    <div style={{marginBottom:'5rem'}}>
      <form onSubmit={formik.handleSubmit}>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input type="text" placeholder="Search Users..." border="1px solid #949494" color="white" onChange={e =>setInput(e.target.value)}/>
        <InputRightAddon
          p={0}
          border="none"
        >
          <Button 
            size="sm" 
            borderLeftRadius={0} 
            borderRightRadius={3.3} 
            border="1px solid #949494" 
            style={styles.colored} 
            onClick={()=> onSearch(input)}>
              Search
          </Button>
        </InputRightAddon>
      </InputGroup>
      </form>
    </div>
  );
};

const styles = {
    colored:{
        backgroundColor: colors.brand.c4,
    }

}