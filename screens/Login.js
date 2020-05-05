import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import Firebase from "../config/Firebase";

export default function Login({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		Firebase.auth()
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
			/>
			<Input
				label="Password"
				style={styles.input}
				value={password}
				onChangeText={(p) => setPassword(p)}
				secureTextEntry={true}
			/>
			<Button title="LOGIN" raised onPress={handleLogin} />

			<Button
				title="Don't have an account yet? Sign up"
				type="clear"
				onPress={() => navigation.navigate("Signup")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		fontFamily: "Helvetica",
	},
});
