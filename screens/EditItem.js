import React, { useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "../config/Firebase";
import styles from "../stylesheets/style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default function EditItem({ route, navigation }) {
	const { product } = route.params;
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const [newProduct, setNewProduct] = useState({
		userId: product.userId,
		name: product.name,
		brand: product.brand,
		prodType: product.prodType,
		color: product.color,
		photo: product.photo,
		price: product.price,
		purchaseDate: product.purchaseDate ? product.purchaseDate.toDate() : "",
		openDate: product.openDate ? product.openDate.toDate() : "",
		expDate: product.expDate ? product.expDate.toDate() : "",
		isFinished: product.isFinished,
		id: product.id,
	});
	const oDate = product.openDate ? moment(product.openDate.toDate()) : "";
	const eDate = product.expDate ? moment(product.expDate.toDate()) : "";

	let pao;
	if (oDate && eDate) {
		pao = eDate.diff(oDate, "months");
	} else {
		pao = "";
	}

	const showDatePicker = () => {
		Keyboard.dismiss();
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const calculateExpiration = (pao) => {
		const validity = Number(pao);
		console.log(validity);
		setNewProduct({
			...newProduct,
			expDate: new Date(moment(newProduct.openDate).add(validity, "M")),
		});
	};

	const updateItem = () => {
		console.log(newProduct);
		if (newProduct.purchaseDate) {
			setNewProduct({
				...newProduct,
				purchaseDate: firebase.firestore.Timestamp.fromDate(
					newProduct.purchaseDate
				),
			});
		}
		if (newProduct.openDate) {
			setNewProduct({
				...newProduct,
				openDate: firebase.firestore.Timestamp.fromDate(newProduct.openDate),
			});
		}
		if (newProduct.expDate) {
			setNewProduct({
				...newProduct,
				expDate: firebase.firestore.Timestamp.fromDate(newProduct.expDate),
			});
		}

		//	console.log("Timestamp", newProduct);
		const db = firebase.firestore();
		db.collection("products").doc(newProduct.id).set({
			userId: newProduct.userId,
			name: newProduct.name,
			brand: newProduct.brand,
			prodType: newProduct.prodType,
			color: newProduct.color,
			photo: newProduct.photo,
			price: newProduct.price,
			purchaseDate: newProduct.purchaseDate,
			openDate: newProduct.openDate,
			expDate: newProduct.expDate,
			isFinished: newProduct.isFinished,
		});
		setTimeout(() => {
			console.log(newProduct);
			navigation.navigate("Home", {
				productName: product.name,
				action: "Edit",
			});
		}, 2000);
	};

	return (
		<ScrollView style={styles.inputContainer}>
			<Input
				label="Product name"
				defaultValue={product.name}
				onChangeText={(n) => setNewProduct({ ...newProduct, name: n })}
			/>
			<Input
				label="Brand"
				defaultValue={product.brand}
				onChangeText={(b) => setNewProduct({ ...newProduct, brand: b })}
			/>
			<Input
				label="Product type"
				defaultValue={product.prodType}
				onChangeText={(p) => setNewProduct({ ...newProduct, prodType: p })}
			/>
			<Input
				label="Color"
				defaultValue={product.color}
				onChangeText={(c) => setNewProduct({ ...newProduct, color: c })}
			/>
			{/* <Button
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
			</View> */}
			<Input
				label="Price"
				defaultValue={product.price}
				onChangeText={(pr) => setNewProduct({ ...newProduct, price: pr })}
				keyboardType="numeric"
			/>
			<Input
				label="Purchase Date"
				defaultValue={
					product.purchaseDate
						? moment(product.purchaseDate).format("DD/MM/YYYY")
						: ""
				}
				value={moment(newProduct.purchaseDate).format("DD/MM/YYYY")}
				onFocus={showDatePicker}
				leftIcon={{ type: "font-awesome", name: "calendar", color: "#000" }}
			/>
			<Input
				label="Opening Date"
				defaultValue={
					product.openDate ? moment(product.openDate).format("DD/MM/YYYY") : ""
				}
				value={moment(newProduct.openDate).format("DD/MM/YYYY")}
				onFocus={showDatePicker}
				leftIcon={{ type: "font-awesome", name: "calendar", color: "#000" }}
			/>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={(date) => {
					//hideDatePicker();
					setNewProduct({ ...newProduct, purchaseDate: date });
					hideDatePicker();
				}}
				onCancel={hideDatePicker}
			/>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={(date) => {
					//hideDatePicker();
					setNewProduct({ ...newProduct, openDate: date });
					hideDatePicker();
				}}
				onCancel={hideDatePicker}
			/>
			<Input
				label="Period after opening (months)"
				defaultValue={String(pao)}
				onChangeText={(p) => calculateExpiration(p)}
				keyboardType="numeric"
			/>
			<Input
				label="Expiration date"
				defaultValue={
					product.expDate ? moment(product.expDate).format("DD/MM/YYYY") : ""
				}
				value={moment(newProduct.expDate).format("DD/MM/YYYY")}
				leftIcon={{ type: "font-awesome", name: "calendar", color: "#000" }}
				onChangeText={(date) => setNewProduct({ ...newProduct, expDate: date })}
			/>
			<Button
				title="Update product"
				onPress={updateItem}
				buttonStyle={styles.actionBtn}
			/>
		</ScrollView>
	);
}

{
	/* moment(product.expDate.toDate()).diff(
					moment(product.openDate.toDate()),
					"months"
				) */
}
