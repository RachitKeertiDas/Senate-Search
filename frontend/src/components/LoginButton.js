import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, Button } from "@mantine/core";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

function LoginButton() {
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null);

	const loginFunction = useGoogleLogin({
		onSuccess: (credentialResponse) => {
			localStorage.setItem("user", JSON.stringify(credentialResponse));
			setUser(credentialResponse);
		},
		onError: () => {
			console.log("Login Failed");
		},
	});

	const logoutFunction = () => {
		googleLogout();
		localStorage.setItem("user", JSON.stringify(null));
		setProfile(null);
	};

	useEffect(() => setUser(JSON.parse(localStorage.getItem("user"))), []);

	useEffect(() => {
		if (user) {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${user.access_token}`,
							Accept: "application/json",
						},
					}
				)
				.then((res) => {
					setProfile(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [user]);

	const login = (
		<Button mt="sm" onClick={() => loginFunction()}>
			Sign in with Google
		</Button>
	);
	const logout = (
		<Button
			onClick={() => {
				logoutFunction();
			}}
		>
			Sign Out
		</Button>
	);

	// Conditional rendering based on profile state
	return (
		<div>
			{profile ? (
				<div>
					<Text>Hi {profile.name}</Text>
					{logout}
				</div>
			) : (
				<div>{login}</div>
			)}
		</div>
	);

	// return <div>{profile ? <div> <Text>Hi {profile.name}, {user.keys}</Text> {logout} </div> : login}</div>;
}

export default LoginButton;
