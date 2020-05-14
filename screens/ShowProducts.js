import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Button, ListItem } from "react-native-elements";
import firebase from "../config/Firebase";
import styles from "../stylesheets/style";

export default function ShowProducts({ navigation }) {
	const [products, setProducts] = useState([]);
	//const [images, setImages] = useState([]);
	const userId = firebase.auth().currentUser;

	useEffect(() => {
		const fetchData = async () => {
			const db = firebase.firestore();
			const data = await db.collection("products").get();
			setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		fetchData();
	}, [products]);

	return (
		<View style={styles.container}>
			{/* <Button
				title="Press"
				onPress={() => {
					//setImages(products.map((product) => product.photo));
					console.log(products);
				}}
			/> */}
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
						onPress={() => navigation.navigate("ViewItem", { product: item })}
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
