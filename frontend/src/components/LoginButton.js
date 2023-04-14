import React, { useState } from "react";
// import { Button, Divider} from "@mantine/core";
import { GoogleLogin } from "@react-oauth/google";

function LoginButton() {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
        setLoggedIn(true);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );

  //   const logout = (<googleLogout
  //   onLogoutSuccess={()=>{
  //     console.log('Logout Success');
  //     setLoggedIn(false)
  // }}
  // onError={()=>{
  //   console.log('Logout Failed')
  // }}
  // />)
  return <div>{loggedIn ? login : login}</div>;
}

export default LoginButton;
