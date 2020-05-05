import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, ListItem } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";

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
			</RootStack.Navigator>
		</NavigationContainer>
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
