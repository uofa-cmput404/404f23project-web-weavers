import React, {useState, useContext} from 'react';
import { colors, sizes, spacing } from '../../utils/theme';
import Button from '../../components/Button';
import AuthContext from '../../context/AuthProvider';

function Login() {
  
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  return (<div className = {"mainContainer"} style ={styles.container}>
      <h1> LOGIN </h1>
      <h2 style = {styles.header}> note: hardcoded user and password are 123 123</h2>
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
      <Button type="conditional" dest="home" username= {username} password= {password} >Login</Button>

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
  },
  header: {
    fontSize: "0.75rem",
    fontStyle: "oblique"
  }
}
export default Login;
