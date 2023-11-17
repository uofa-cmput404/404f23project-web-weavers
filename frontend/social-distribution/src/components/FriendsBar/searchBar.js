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

export const SearchBar = ({props}) => {
  const formik = useFormik({
    initialValues: {search_input: ''},
        onSubmit: (values) => {
          handleSearchUsers(values.search_input)
        }
      })


  const handleSearchUsers = (search_input) =>{
    //'Grab the information from the bar
    //If nothing search all users
    // else find that specific user and respond if they do or dont exist

    console.log("searching all users with" + JSON.stringify({search_input}))
}
  return (
    <div style={{marginBottom:'5rem'}}>
      <form onSubmit={formik.handleSubmit}>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input
          id="search_input"
          type="text"
          placeholder="Search Users..."
          border="1px solid #949494"
          onChange={formik.handleChange}
          values = {formik.values.search_input}
          color="white" />
        <InputRightAddon
          p={0}
          border="none"
        >
          <Button
            size="sm"
            type="submit"
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border="1px solid #949494"
            style={styles.colored}>
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