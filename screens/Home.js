import React, { useState } from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import firebase from "../config/Firebase";
import ShowProducts from "./ShowProducts";
import SearchInAPI from "./SearchInAPI";

const Drawer = createDrawerNavigator();

// function AddButton() {
// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.addBtnContainer}>
// 				<Button
// 					title="+"
// 					buttonStyle={styles.addBtn}
// 					onPress={() => navigation.navigate("AddItem", { userId: userId.uid })}
// 				/>
// 			</View>
// 		</View>
// 	);
// }

async function Logout({ navigation }) {
	try {
		await firebase.auth().signOut();
		navigation.navigate("Login");
		// return (
		// 	<View style={styles.container}>
		// 		<Text>Logging out...</Text>
		// 	</View>
		// );
	} catch (e) {
		console.log(e.message);
	}
	return (
		<View>
			<Text>Logging out</Text>
		</View>
	);
}

export default function Home({ navigation }) {
	const userId = firebase.auth().currentUser;

	// React.useLayoutEffect(() => {
	// 	navigation.setOptions({
	// 		headerLeft: () => (
	// 			<Button
	// 				onPress={navigation.openDrawer}
	// 				icon={{ name: "menu", color: "#fff" }}
	// 				color="#fff"
	// 				buttonStyle={{ backgroundColor: "#0B0014" }}
	// 			/>
	// 		),
	// 	});
	// });

	if (userId) {
		console.log("Valid user");
	} else {
		navigation.navigate("Login");
	}

	return (
		<Drawer.Navigator initialRouteName="Main">
			{/* <Drawer.Screen
				name="Home"
				component={Home}
				options={{
					headerTitle: "MakeApp Home",
					headerStyle: styles.header,
					headerTintColor: "#fff",
					headerLeft: () => (
						<Button
							onPress={() => {
								navigation.openDrawer();
							}}
							icon={{ name: "menu", color: "#fff" }}
							color="#fff"
							buttonStyle={{ backgroundColor: "#000" }}
						/>
					),
				}}
			/> */}
			<Drawer.Screen name="Main" component={ShowProducts} />
			<Drawer.Screen
				name="Search products in online DB"
				component={SearchInAPI}
			/>
			<Drawer.Screen name="Logout" component={Logout} />
		</Drawer.Navigator>
	);
}
{
	/* <Drawer.Screen name="Home" component={Home} /> */
}
