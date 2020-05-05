import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Firebase from "../config/Firebase";

export default function Signup({ navigation }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = () => {
		Firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => navigation.navigate("Home"))
			.catch((error) => console.log(error));
		console.log("Input", name, email, password);
	};

	return (
		<View style={styles.container}>
			<Input
				label="Name"
				value={name}
				onChangeText={(n) => setName(n)}
				leftIcon={{ type: "font-awesome", name: "address-card", color: "#bbb" }}
			/>
			<Input
				label="Email"
				value={email}
				onChangeText={(e) => setEmail(e)}
				leftIcon={{ type: "font-awesome", name: "envelope", color: "#bbb" }}
			/>
			<Input
				label="Password"
				value={password}
				onChangeText={(p) => setPassword(p)}
				leftIcon={{ type: "font-awesome", name: "lock", color: "#bbb" }}
				secureTextEntry={true}
			/>
			<Button title="SIGN UP" raised onPress={handleSignUp} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
