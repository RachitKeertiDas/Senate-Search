import React, { useState ,useEffect} from "react";
import axios from 'axios';
import {Text, Button} from "@mantine/core";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

function LoginButton() {
  const [user, setUser] = useState([]);
  const [ profile, setProfile ] = useState([]);

  const loginFunction = useGoogleLogin({
    onSuccess:(credentialResponse) => {
      console.log(credentialResponse);
      setUser(credentialResponse)
    },
    onError:() => {
      console.log("Login Failed");
    }});
  
    useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );



  const login = (<Button onClick={()=>loginFunction()}>Sign in with Google</Button> )
  const logout = (<Button onClick={()=>{ googleLogout(); setProfile(null);}}>Sign Out</Button>)
  return <div>{profile? <div> <Text>Hi {profile.name}, {user.keys}</Text> {logout} </div> : login}</div>;
}

export default LoginButton;
