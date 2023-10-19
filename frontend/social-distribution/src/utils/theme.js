import { extendTheme } from '@chakra-ui/react'

const colors = {
    brand: {
        c1: "#ECE0C8",
        c2: "#A16C30",
        c3: "#BB9B6C",
        c4: "#AA9C94",
        c5: "#B4947C",
  },
    text: {
        t1: "#000000",
        t2: "#FFFFFF",
    }, 
}

const fonts = {
    body: "Raleway', sans-serif",
    heading: "Open Sans', sans-serif",
    title: "Juilus Sans One', sans-serif",
}

const sizes = {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    xxl: "5rem",
}

const spacing = {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
    xl: "4rem",
    xxl: "5rem",
}

const buttonSizes = {
    sm:"100px",
    md:"200px",
    lg:"300px",
}

const theme = extendTheme({colors, fonts, sizes, spacing, buttonSizes})
export default theme;
export { colors, fonts, sizes, spacing, buttonSizes }
