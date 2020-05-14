import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import firebase from "../config/Firebase";
import styles from "../stylesheets/style";

export default function Signup({ navigation }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = () => {
		!email || !password
			? Alert.alert("Please input email and password to proceed")
			: firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(() => {
						Alert.alert("You have successfully created an account.");
						const db = firebase.firestore();
						db.collection("users").add({
							user: { name: name, email: email, password: password },
						});
						navigation.navigate("Home");
					})
					.catch((error) => console.log(error));
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
			<Button
				title="SIGN UP"
				raised
				onPress={handleSignUp}
				buttonStyle={styles.actionBtn}
			/>
		</View>
	);
}
