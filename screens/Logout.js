import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { Button, ListItem } from "react-native-elements";
import firebase from "../config/Firebase";
import styles from "../stylesheets/style";

export default function Logout({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Do you want to log out?</Text>
			<View style={{ flexDirection: "row" }}>
				<Button
					title="Log out"
					onPress={() => {
						firebase.auth().signOut();
						navigation.navigate("Login");
					}}
					buttonStyle={styles.actionBtn}
				/>
				<Button
					title="Cancel"
					onPress={() => navigation.navigate("Home")}
					buttonStyle={styles.actionBtnInvert}
					titleStyle={styles.actionBtnInvertText}
				/>
			</View>
		</View>
	);
}
