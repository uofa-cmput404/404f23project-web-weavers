import React from 'react';
import { colors, sizes, spacing } from '../../utils/theme';
import Button from '../../components/Button';
import {useTypewriter} from 'react-simple-typewriter';

function LandingPage() {
  const [typeEffect] = useTypewriter({
    words: ['Welcome to Social Distribution!'],
    loop: 1,
    cursorStyle: '_',
    deleteSpeed: 50,
  });
  return (
    <div className='container' style={styles.container}>
        <div className='text' style={styles.text}>
          {typeEffect}
        </div>

        <div style={styles.buttons}>
          <Button type="primary" dest="signup">Sign Up</Button>
          <Button type="secondary" dest="login">Login</Button>
          <Button type="tertiary" dest="admin"> Admin</Button>
        </div>



    </div>

  );
}

const styles = { 
  text: {
    fontSize: sizes.xxl, 
    color: colors.text.c1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand.c1,
    height: '100vh',
    width: '100vw',
  },
  buttons: {
    padding: spacing.xl,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxl,
  },
}
export default LandingPage;