import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import firebase from "../config/Firebase";
import styles from "../stylesheets/style";

export default function Login({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = () => {
		setLoading(true);
		!email || !password
			? Alert.alert("Please input email and password")
			: firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
					.then(() => navigation.navigate("Home"))
					.catch((error) => Alert.alert("Error", error.message));
	};

	return (
		<View style={styles.container}>
			<Input
				label="Email"
				style={styles.input}
				value={email}
				onChangeText={(e) => setEmail(e)}
				leftIcon={{ type: "font-awesome", name: "envelope", color: "#bbb" }}
			/>
			<Input
				label="Password"
				style={styles.input}
				value={password}
				onChangeText={(p) => setPassword(p)}
				secureTextEntry={true}
				leftIcon={{ type: "font-awesome", name: "lock", color: "#bbb" }}
			/>
			<Button
				buttonStyle={styles.actionBtn}
				title="LOGIN"
				raised
				onPress={handleLogin}
				loading={loading}
			/>

			<Button
				titleStyle={styles.textBtn}
				title="Don't have an account yet? Sign up"
				type="clear"
				onPress={() => navigation.navigate("Signup")}
			/>
		</View>
	);
}
