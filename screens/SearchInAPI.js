import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Input, Button, ListItem } from "react-native-elements";
import styles from "../stylesheets/style";

export default function SearchInAPI({ navigation }) {
	const [brand, setBrand] = useState("");
	const [prodType, setProdType] = useState("");
	const [products, setProducts] = useState([]);

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
				setProducts(data);
			})
			.catch((e) => {
				Alert.alert("Error", e.message);
			});
	};

	return (
		<View>
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
						//containerStyle={styles.listItem}
						bottomDivider
					/>
				)}
			/>
		</View>
	);
}
