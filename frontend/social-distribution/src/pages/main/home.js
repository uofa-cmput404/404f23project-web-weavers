import React from "react";
import {colors, spacing, sizes} from "../../utils/theme";
import NavBar from "../../components/navbar";

export default function Home() {

    return (
        <div style={styles.container}>
            <NavBar />
            {/* <div>
                <h1>Home</h1>
            </div> */}
        </div>
    );
}
const styles = {
    container:{
        backgroundColor: colors.brand.c4,
        height: "100vh",

    }
}