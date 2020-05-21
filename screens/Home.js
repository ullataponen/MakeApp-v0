import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import { Button, ListItem } from "react-native-elements";
import firebase from "../config/Firebase";
import styles from "../stylesheets/style";

export default function Home({ route, navigation }) {
	let productName = route.params ? route.params.productName : "";
	let action = route.params ? route.params.action : "";
	const userId = firebase.auth().currentUser;
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({
		name: productName,
		action: action,
	});

	if (userId) {
		console.log("Valid user");
	} else {
		navigation.navigate("Login");
	}

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					onPress={() => navigation.navigate("Logout")}
					title="Logout"
					buttonStyle={styles.logout}
				/>
			),
			headerLeft: false,
		});
	}, [navigation]);

	useEffect(() => {
		const db = firebase.firestore();
		return db
			.collection("products")
			.where("userId", "==", userId.uid)
			.where("isFinished", "==", false)
			.onSnapshot((snapshot) => {
				const productData = [];
				snapshot.forEach((doc) =>
					productData.push({ ...doc.data(), id: doc.id })
				);
				setProducts(productData);
			});
	}, []);

	const deleteItem = (item) => {
		const db = firebase.firestore();
		console.log(item);
		Alert.alert("Delete product?", `Do you want to delete ${item.name}?`, [
			{
				text: "Yes",
				onPress: () => {
					console.log();
					db.collection("products").doc(item.id).delete();
					setProduct({ ...product, name: item.name, action: "Delete" });
				},
			},
			{
				text: "Cancel",
				onPress: () => console.log("Cancelled"),
				style: "cancel",
			},
		]);
	};

	return (
		<View style={styles.container}>
			<View style={styles.addBtnContainer}></View>
			<FlatList
				style={styles.list}
				data={products}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) =>
					item.photo ? (
						<ListItem
							title={item.name}
							subtitle={item.brand}
							rightSubtitle={item.prodType}
							leftAvatar={{ source: { uri: item.photo } }}
							containerStyle={styles.listItem}
							titleStyle={{ color: "#000", width: "100%" }}
							bottomDivider
							onPress={() => {
								console.log(item);
								navigation.navigate("ViewItem", { product: item });
							}}
							onLongPress={() => {
								deleteItem(item);
							}}
						/>
					) : (
						<ListItem
							title={item.name}
							subtitle={item.brand}
							rightSubtitle={item.prodType}
							leftIcon={{ name: "image" }}
							containerStyle={styles.listItem}
							titleStyle={{ color: "#000", width: "100%" }}
							bottomDivider
							onPress={() => {
								console.log(item);
								navigation.navigate("ViewItem", { product: item });
							}}
							onLongPress={() => {
								deleteItem(item);
							}}
						/>
					)
				}
			/>
			<View style={styles.addBtnContainer}>
				<Button
					title="+"
					buttonStyle={styles.addBtn}
					raised
					onPress={() =>
						navigation.navigate("SearchInApi", { userId: userId.uid })
					}
				/>
			</View>
		</View>
	);
}
