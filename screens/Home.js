import React, { useState } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import { Input, Button, ListItem } from "react-native-elements";
import Firebase from "../config/Firebase";

export default function Home({ navigation }) {
	const [brand, setBrand] = useState("");
	const [prodType, setProdType] = useState("");
	const [products, setProducts] = useState([]);
	// const { user } = route.params;
	// console.log(user);

	const fetchProduct = () => {
		let url = "http://makeup-api.herokuapp.com/api/v1/products.json";
		setBrand(brand.replace(" ", "_"));
		setProdType(prodType.replace(" ", "_"));
		if (brand && prodType) {
			url += "?brand=" + brand + "&product_type=" + prodType;
		} else if (!brand) {
			url += "?product_type=" + prodType;
		} else if (!prodType) {
			url += "?brand=" + brand;
		}
		console.log(url);
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setProducts(data);
				console.log("set results", typeof results);
			})
			.catch((e) => {
				Alert.alert("Error", e.message);
			});
	};

	const handleLogout = () => {
		Firebase.auth().signOut();
		navigation.navigate("Login");
	};

	return (
		<View style={styles.container}>
			<View style={styles.input}>
				<Input
					placeholder="Search by brand"
					value={brand}
					onChangeText={(v) => setBrand(v)}
				/>
				<Input
					placeholder="Search by product type"
					value={prodType}
					onChangeText={(v) => setProdType(v)}
				/>
				<Button title="Search" onPress={fetchProduct} />
			</View>

			<FlatList
				style={styles.list}
				data={products}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ListItem
						title={item.name}
						subtitle={item.brand}
						rightSubtitle={item.product_type}
						leftAvatar={{ source: { uri: item.image_link } }}
						containerStyle={{ backgroundColor: "#f1ded3" }}
						bottomDivider
					/>
				)}
			/>
			<Button title="Logout" onPress={handleLogout} type="clear" />
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
	input: {
		margin: 10,
		width: "100%",
		padding: 10,
	},
	list: {
		width: "100%",
		margin: 10,
	},
});
