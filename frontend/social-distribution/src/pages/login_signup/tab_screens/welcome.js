import React from "react"
import { colors, spacing, sizes, fonts } from "../../../utils/theme"
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
      text: {
        fontSize: sizes.xxl, 
        color: colors.text.c1,
        fontFamily: fonts.title,
      },
}