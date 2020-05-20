import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import firebase from "../config/Firebase";
import styles from "../stylesheets/style";

export default function Signup({ navigation }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSignUp = () => {
		setLoading(true);
		if (password != password2) {
			Alert.alert("The passwords do not match, please try again");
			setLoading(false);
		} else if (!email || !password) {
			Alert.alert("Please input email and password to proceed");
		} else {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(() => {
					Alert.alert("You have successfully created an account.");
					const db = firebase.firestore();
					db.collection("users").add({
						name: name,
						email: email,
						password: password,
					});
					navigation.navigate("Login");
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<ScrollView style={{ flex: 1 }}>
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
			<Input
				label="Password again"
				value={password2}
				onChangeText={(p) => setPassword2(p)}
				leftIcon={{ type: "font-awesome", name: "lock", color: "#bbb" }}
				secureTextEntry={true}
			/>
			<Button
				title="SIGN UP"
				//raised
				onPress={handleSignUp}
				buttonStyle={styles.actionBtn}
			/>
		</ScrollView>
	);
}
