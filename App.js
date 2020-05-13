import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, ListItem } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import AddItem from "./screens/AddItem";
import Photo from "./screens/Camera";
import { decode, encode } from "base-64";

// to avoid atob error with firebase: https://stackoverflow.com/questions/60361519/cant-find-a-variable-atob
// if (!global.btoa) {
// 	global.btoa = encode;
// }

// if (!global.atob) {
// 	global.atob = decode;
// }

const RootStack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<RootStack.Navigator initialRouteName="Login">
				<RootStack.Screen name="Login" component={Login} />
				<RootStack.Screen name="Signup" component={Signup} />
				<RootStack.Screen
					name="Home"
					component={Home}
					options={{
						headerTitle: "MakeApp Home",
						headerStyle: {
							backgroundColor: "#000",
						},
						headerTintColor: "#fff",
						headerLeft: () => (
							<Button
								onPress={() => alert("This is a button!")}
								icon={{ name: "menu", color: "#fff" }}
								color="#fff"
								buttonStyle={{ backgroundColor: "#000" }}
							/>
						),
					}}
				/>
				<RootStack.Screen name="AddItem" component={AddItem} />
				<RootStack.Screen name="Photo" component={Photo} />
			</RootStack.Navigator>
		</NavigationContainer>
	);
}
