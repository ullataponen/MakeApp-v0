import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import moment from "moment";
import styles from "../stylesheets/style";

export default function ViewItem({ route, navigation }) {
	const { product } = route.params;

	return (
		<ScrollView style={styles.cardContainer}>
			<Card
				title={product.name}
				wrapperStyle={styles.card}
				titleStyle={styles.cardTitle}
			>
				<View style={styles.cardLine}>
					<Text style={styles.cardText}>Brand:</Text>
					<Text style={styles.cardText}>{product.brand}</Text>
				</View>
				<View style={styles.cardLine}>
					<Text style={styles.cardText}>Product type:</Text>
					<Text style={styles.cardText}>{product.prodType}</Text>
				</View>
				<View style={styles.cardLine}>
					<Text style={styles.cardText}>Color:</Text>
					<Text style={styles.cardText}>{product.color}</Text>
				</View>
				<View style={styles.cardLine}>
					<Text style={styles.cardText}>Price:</Text>
					<Text style={styles.cardText}>{product.price} €</Text>
				</View>
				{/* <View style={styles.cardLine}>
					<Text style={styles.cardText}>Purchase date:</Text>
					<Text style={styles.cardText}>
						{product.purchaseDate
							? moment(product.purchaseDate.toDate()).format("DD/MM/YYYY")
							: ""}
					</Text>
				</View> */}
				<View style={styles.cardLine}>
					<Text style={styles.cardText}>Opening date:</Text>
					<Text style={styles.cardText}>
						{product.openDate
							? moment(product.openDate.toDate()).format("DD/MM/YYYY")
							: ""}
					</Text>
				</View>
				<View style={styles.cardLine}>
					<Text style={styles.cardText}>Expiration date:</Text>
					<Text style={styles.cardText}>
						{product.expDate
							? moment(product.expDate.toDate()).format("DD/MM/YYYY")
							: ""}
					</Text>
				</View>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					{product.photo ? (
						<Image style={styles.cardImg} source={{ uri: product.photo }} />
					) : (
						<View></View>
					)}
				</View>
				<Button
					title="Edit"
					buttonStyle={styles.actionBtn}
					onPress={() => {
						console.log(product);
						navigation.navigate("EditItem", { product: product });
					}}
				/>
			</Card>
		</ScrollView>
	);
}
