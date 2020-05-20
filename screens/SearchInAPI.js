import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Input, Button, ListItem } from "react-native-elements";
import styles from "../stylesheets/style";

export default function SearchInAPI({ route, navigation }) {
	const { userId } = route.params;
	const [brand, setBrand] = useState("");
	const [prodType, setProdType] = useState("");
	const [products, setProducts] = useState([]);
	const [text, setText] = useState("Search brand or product type");

	const fetchProduct = () => {
		setText("Searching...");
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
				setProducts(data);
				if (data.length === 0) {
					setText("Nothing found");
				}
			})
			.catch((e) => {
				Alert.alert("Error", e.message);
			});
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
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<Button
						title="Search"
						buttonStyle={styles.actionBtn}
						onPress={fetchProduct}
					/>
					<Button
						title="Add manually"
						buttonStyle={styles.actionBtnInvert}
						titleStyle={styles.actionBtnInvertText}
						onPress={() => navigation.navigate("AddItem", { userId: userId })}
					/>
				</View>
			</View>
			{products.length === 0 ? (
				<Text style={styles.searchText}>{text}</Text>
			) : (
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
							onPress={() =>
								navigation.navigate("AddApiItem", {
									userId: userId,
									item: item,
								})
							}
							bottomDivider
						/>
					)}
				/>
			)}
		</View>
	);
}
