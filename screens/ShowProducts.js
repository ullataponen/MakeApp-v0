import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import { Button, ListItem } from "react-native-elements";
import firebase from "../config/Firebase";
import styles from "../stylesheets/style";

export default function ShowProducts({ navigation }) {
	const [products, setProducts] = useState([]);
	//const [images, setImages] = useState([]);
	const userId = firebase.auth().currentUser;

	//	Alkuperäinen:
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const db = firebase.firestore();
	// 		const data = await db.collection("products").get();
	// 		setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	// 	};
	// 	fetchData();
	// }, [products]);

	// Uusi

	const getDataFromDB = () => {
		useEffect(() => {
			console.log("fetching data");
			const fetchData = async () => {
				const db = firebase.firestore();
				const data = await db.collection("products").get();
				setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			};
			fetchData();
		}, []);
	};

	const deleteItem = (item) => {
		const db = firebase.firestore();
		console.log(item);
		Alert.alert("Delete product?", `Do you want to delete ${item.name}?`, [
			{
				text: "Yes",
				onPress: () => {
					console.log();
					db.collection("products").doc(item.id).delete();
				},
			},
			{
				text: "Cancel",
				onPress: () => console.log("Cancelled"),
				style: "cancel",
			},
		]);
		getDataFromDB();
	};

	getDataFromDB();
	return (
		<View style={styles.container}>
			<FlatList
				style={styles.list}
				data={products}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ListItem
						title={item.name}
						subtitle={item.brand}
						rightSubtitle={item.prodType}
						//leftAvatar={{ source: require(item.photo) }}
						containerStyle={styles.listItem}
						titleStyle={{ color: "#000", width: "100%" }}
						bottomDivider
						onPress={() => {
							console.log(item);
							navigation.navigate("ViewItem", { product: item });
						}}
						onLongPress={() => deleteItem(item)}
					/>
				)}
			/>
			<View style={styles.addBtnContainer}>
				<Button
					title="+"
					buttonStyle={styles.addBtn}
					onPress={() => navigation.navigate("AddItem", { userId: userId.uid })}
				/>
			</View>
		</View>
	);
}
