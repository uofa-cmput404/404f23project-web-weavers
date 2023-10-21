import React from "react";
import {colors, spacing, sizes} from "../../utils/theme";

export default function Home() {

    return (
        <div style={styles.container}>
            <h1>Home</h1>
        </div>
    );
}
const styles = {
    container:{
        backgroundColor: colors.brand.c4,
        height: '100vh',
        width: '100vw',
    }
}