import {colors, spacing, sizes} from "../../../utils/theme";
import logo from "../../../assets/logo.png";
// import longlogo from "../../../assets/longlogo.png";
import { Flex } from "@chakra-ui/react";

export default function About() {

    return (
        <Flex style={styles.container}>
            <div style={styles.content}> 
                <img src={logo} alt="logo" style={{width: '500px', height: '500px'}}/>
                {/* <img src={longlogo} alt="longlogo" style={{}}/> */}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <h1 style={styles.title}>Social Distribution</h1>
                    <p style={styles.text}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                </div>
            </div>
        </Flex>
    );
}
const styles = {
    container:{
        backgroundColor: colors.brand.c6,
        height: '100vh',
        padding: spacing.xl,
    },
    title:{
        color: colors.brand.c1,
        fontSize: sizes.xl,
        marginBottom: spacing.lg,
    },
    content:{
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: sizes.contentWidth,
    },
    text:{
        display: 'flex',
        alignItems: 'center',
        color: 'white',
    }
}