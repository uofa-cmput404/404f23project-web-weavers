import {colors} from "../../utils/theme.js";
import logo from "../../assets/logo.png";

export default function LogoBar() {
    return (
        <div style={styles.container}>
            <img src={logo} alt="logo" style={styles.logo} />
        </div>
    );
}

const styles = {    
    container: {
        boxShadow:"0 4px 12px 0 rgba(0,0,0,0.10)",
        backgroundColor: colors.brand.c4,
        height: "5vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
    },
    logo: {
        width: '8vw',
        height: '8vh',
        paddingTop: '0.5vh',
    }
}