import React from "react"
import { colors, spacing, sizes } from "../../../utils/theme"
import landing from '../../../assets/landing.jpeg';
import {useTypewriter} from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

export default function Welcome() {
    let navigate = useNavigate();
  const [typeEffect] = useTypewriter({
    words: ['Welcome to Social Distribution!'],
    loop: 1,
    cursorStyle: '_',
    deleteSpeed: 50,
  });

  const handleClick = (dest) => {
    navigate("/"+dest)
  }

    return (
        <div className='home-container' style={styles.container}>
            <div className='text' style={styles.text}>
                {typeEffect}
            </div>

            <div style={styles.buttons}>
                <Button btn_type="primary" onClick={()=>handleClick("signup")}>Sign Up</Button>
                <Button btn_type="secondary"  onClick={()=>handleClick("login")}>Login</Button>
                {/* I will remove this admin page button later but I will leave it here for a bit so you can use this as reference for our login/signup */}
                <Button btn_type="tertiary" onClick={()=>handleClick("admin")}> Admin</Button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: `url(${landing})`,
        height:"100vh",
        backgroundSize: 'cover',
        paddingBottom: '200px',
      },
      buttons: {
        padding: spacing.xl,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xxl,
      },
      text: {
        fontSize: sizes.xxl, 
        color: colors.text.c1,
      },
}