import React, {useState} from 'react';
import { colors, sizes, spacing } from '../../utils/theme';
import Button from '../../components/Button';

function Login() {
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  return (<div className = {"mainContainer"} style ={styles.container}>
      <h1 style = {styles.header}> LOGIN </h1>
      <br />
      <div className = {"loginStyle"} style = {styles.loginStyle}>
        <div className = {"loginContainer"} style = {styles.loginContainer}>
          <h1>Username</h1>
          <input
            value = {password}
            placeholder = "Enter Password"
            className = {"inputBox"}
            onChange = {ev => setPassword(ev.target.value)} />
          <br />
            <h1>Password</h1>
            <input
              value = {username}
              placeholder = "Enter Username"
              className = {"inputBox"}
              onChange = {ev => setUsername(ev.target.value)} />
          </div>
        </div>
      <br />
      <Button type="secondary" dest="home">Login</Button>

    </div>
  );
}
const styles = {
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
    gap: spacing.sm,
  },
  loginStyle: {
    fontSize: sizes.xxl,
    color: colors.text.c4,
    backgroundColor: colors.brand.c4,
    padding: spacing.lg,
    borderStyle: 'solid',
    borderRadius: '5px',
    borderWidth: '2px',
  },
  loginContainer: {
    padding: spacing.sm,
    fontSize: sizes.xs
  }

}
export default Login;
