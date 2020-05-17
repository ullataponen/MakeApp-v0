//Fixing a Firebase warning with timer: https://github.com/firebase/firebase-js-sdk/issues/97
// To sort this out you need to hard code the value, increase the value of the variable MAX_TIMER_DURATION_MS. Here are the steps:
// Go to node_modules/react-native/Libraries/Core/Timer/JSTimers.js
// Look for the variable MAX_TIMER_DURATION_MS
// Change 60 * 1000 to 10000 * 1000
// Save the changes and re-build your app.
// This worked for me.
// https://stackoverflow.com/a/46678121

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import SearchInAPI from "./screens/SearchInAPI";
import AddItem from "./screens/AddItem";
import AddApiItem from "./screens/AddApiItem";
import Photo from "./screens/Camera";
import ViewItem from "./screens/ViewItem";
import EditItem from "./screens/EditItem";
import Logout from "./screens/Logout";
import { View, Text, FlatList, Alert } from "react-native";
import { Button, ListItem } from "react-native-elements";
import firebase from "./config/Firebase";
import styles from "./stylesheets/style";
import { decode, encode } from "base-64";

// to avoid atob error with firebase: https://stackoverflow.com/questions/60361519/cant-find-a-variable-atob
if (!global.btoa) {
	global.btoa = encode;
}
if (!global.atob) {
	global.atob = decode;
}

const RootStack = createStackNavigator();

// function Logout({ navigation }) {
// 	return (
// 		<View container={styles.container}>
// 			<Text>Do you want to log out?</Text>
// 			<Button
// 				title="Log out"
// 				onPress={() => {
// 					firebase.auth().signOut();
// 					navigation.navigate("Login");
// 				}}
// 			/>
// 			<Button title="cancel" onPress={() => navigation.navigate("Home")} />
// 		</View>
// 	);
// }

export default function App() {
	const setHeader = (title) => {
		const headerSt = {
			headerTitle: title,
			headerStyle: styles.header,
			headerTintColor: "#fff",
			// headerRight: () => (
			// 	<Button
			// 		title="Logout"
			// 		buttonStyle={styles.logout}
			// 		onPress={() => Logout()}
			// 	/>
			// ),
		};
		return headerSt;
	};

	return (
		<NavigationContainer>
			<RootStack.Navigator initialRouteName="Login">
				<RootStack.Screen
					name="Login"
					component={Login}
					options={() => setHeader("Login")}
				/>
				<RootStack.Screen
					name="Signup"
					component={Signup}
					options={() => setHeader("Signup")}
				/>
				<RootStack.Screen
					name="Home"
					component={Home}
					options={{ headerShown: false }}
					options={() => setHeader("Home")}
				/>
				<RootStack.Screen
					name="SearchInApi"
					component={SearchInAPI}
					options={() => setHeader("Search product in online DB")}
				/>
				<RootStack.Screen
					name="AddItem"
					component={AddItem}
					options={() => setHeader("Add New Item")}
				/>
				<RootStack.Screen
					name="AddApiItem"
					component={AddApiItem}
					options={() => setHeader("Add New Item from Online DB")}
				/>
				<RootStack.Screen
					name="Photo"
					component={Photo}
					options={() => setHeader("Take Photo")}
				/>
				<RootStack.Screen
					name="ViewItem"
					component={ViewItem}
					options={() => setHeader("View Item Details")}
				/>
				<RootStack.Screen
					name="EditItem"
					component={EditItem}
					options={() => setHeader("Edit Item Details")}
				/>
				<RootStack.Screen
					name="Logout"
					component={Logout}
					options={() => setHeader("Log Out")}
				/>
			</RootStack.Navigator>
		</NavigationContainer>
	);
}
{
	/* headerLeft: () => (
							<Button
								onPress={() => {
									navigation.openDrawer();
								}}
								icon={{ name: "menu", color: "#fff" }}
								color="#fff"
								buttonStyle={{ backgroundColor: "#000" }}
							/>
						), */
}
