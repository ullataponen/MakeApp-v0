import React, { useState, useEffect } from "react";
import { Keyboard, View, ScrollView, Image } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "../config/Firebase";
import styles from "../stylesheets/style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default function AddItem({ route, navigation }) {
	const { userId } = route.params;
	const { address } = route.params;
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const [product, setProduct] = useState({
		userId: userId,
		name: "",
		brand: "",
		prodType: "",
		color: "",
		photo: "",
		price: null,
		purchaseDate: "",
		openDate: "",
		expDate: "",
		isFinished: false,
	});

	useEffect(() => {
		setProduct({ ...product, photo: address ? address : "" });
	}, [address]);

	const showDatePicker = () => {
		Keyboard.dismiss();
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const calculateExpiration = (pao) => {
		const validity = Number(pao);
		setProduct({
			...product,
			expDate: new Date(moment(product.openDate).add(validity, "M")),
		});
	};

	const saveNewItem = () => {
		console.log(product);
		if (product.purchaseDate) {
			setProduct({
				...product,
				purchaseDate: firebase.firestore.Timestamp.fromDate(
					product.purchaseDate
				),
			});
		}
		if (product.openDate) {
			setProduct({
				...product,
				openDate: firebase.firestore.Timestamp.fromDate(product.openDate),
			});
		}
		if (product.expDate) {
			setProduct({
				...product,
				expDate: firebase.firestore.Timestamp.fromDate(product.expDate),
			});
		}

		const db = firebase.firestore();
		db.collection("products").add({
			userId: product.userId,
			name: product.name,
			brand: product.brand,
			prodType: product.prodType,
			color: product.color,
			photo: product.photo,
			price: product.price,
			purchaseDate: product.purchaseDate,
			openDate: product.openDate,
			expDate: product.expDate,
			isFinished: product.isFinished,
		});
		setTimeout(() => {
			navigation.navigate("Home", { productName: product.name, action: "Add" });
			console.log(product.name);
		}, 2000);
	};

	return (
		<ScrollView style={styles.inputContainer}>
			<Input
				label="Product name"
				value={product.name}
				onChangeText={(n) => setProduct({ ...product, name: n })}
			/>
			<Input
				label="Brand"
				value={product.brand}
				onChangeText={(b) => setProduct({ ...product, brand: b })}
			/>
			<Input
				label="Product type"
				value={product.prodType}
				onChangeText={(p) => setProduct({ ...product, prodType: p })}
			/>
			<Input
				label="Color"
				value={product.color}
				onChangeText={(c) => setProduct({ ...product, color: c })}
			/>
			<Button
				buttonStyle={styles.actionBtn}
				title="Take a photo"
				onPress={() => navigation.navigate("Photo")}
			/>
			<View>
				{address ? (
					<Image
						style={{
							height: 100,
							width: 100,
							borderRadius: 100 / 2,
							margin: 10,
						}}
						source={{ uri: address }}
					/>
				) : (
					<View></View>
				)}
			</View>
			<Input
				label="Price"
				value={product.price}
				onChangeText={(pr) => setProduct({ ...product, price: pr })}
				keyboardType="numeric"
			/>
			{/* <Input
				label="Purchase Date"
				value={
					product.purchaseDate
						? moment(product.purchaseDate).format("DD/MM/YYYY")
						: ""
				}
				onFocus={showDatePicker}
				leftIcon={{ type: "font-awesome", name: "calendar", color: "#000" }}
			/> */}
			<Input
				label="Opening Date"
				value={
					product.openDate ? moment(product.openDate).format("DD/MM/YYYY") : ""
				}
				onFocus={showDatePicker}
				leftIcon={{ type: "font-awesome", name: "calendar", color: "#000" }}
			/>
			{/* <DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={(date) => {
					//hideDatePicker();
					setProduct({ ...product, purchaseDate: date });
					hideDatePicker();
				}}
				onCancel={hideDatePicker}
			/> */}
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={(date) => {
					hideDatePicker();
					setProduct({ ...product, openDate: date });
					hideDatePicker();
				}}
				onCancel={hideDatePicker}
			/>
			<Input
				label="Period after opening (months)"
				value={product.pao}
				onChangeText={(p) => calculateExpiration(p)}
				keyboardType="numeric"
			/>
			<Input
				label="Expiration date"
				value={
					product.expDate ? moment(product.expDate).format("DD/MM/YYYY") : ""
				}
				leftIcon={{ type: "font-awesome", name: "calendar", color: "#000" }}
				onChangeText={(date) => setProduct({ ...product, expDate: date })}
			/>
			<Button
				title="Add product"
				onPress={saveNewItem}
				buttonStyle={styles.actionBtn}
			/>
		</ScrollView>
	);
}
