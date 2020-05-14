import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Button } from "react-native-elements";
import firebase from "../config/Firebase";
import moment from "moment";
import styles from "../stylesheets/style";

export default function ViewItem({ route, navigation }) {
	const { product } = route.params;
	// const pDate = firebase.firestore.Timestamp.fromDate(product.purchaseDate);
	// const oDate = firebase.firestore.Timestamp.fromDate(product.openDate);
	// const eDate = firebase.firestore.Timestamp.fromDate(product.expDate);

	return (
		<View style={styles.cardContainer}>
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
				<View style={styles.cardLine}>
					<Text style={styles.cardText}>Purchase date:</Text>
					<Text style={styles.cardText}>
						{product.purchaseDate
							? moment(product.purchaseDate.toDate()).format("DD/MM/YYYY")
							: ""}
					</Text>
				</View>
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
					{/* <Image resizeMode="cover" source={require(product.photo)} /> */}
				</View>
			</Card>
		</View>
	);
}
