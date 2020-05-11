import React, { useState, useEffect } from "react";
import { Keyboard, View, ScrollView, Image } from "react-native";
import { Input, Button } from "react-native-elements";
import Firebase from "../config/Firebase";
import styles from "../stylesheets/style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default function AddItem({ route, navigation }) {
	const { userId } = route.params;
	const { address } = route.params;
	let purchDate = "";
	const [openingDate, setOpenDate] = useState({
		dd: null,
		mm: null,
		yyyy: null,
	});
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

	const getFormattedDate = (date) => {
		if (!date) {
			return "";
		} else {
			const myDate = new Date(date);
			const year = myDate.getFullYear();
			const month = (1 + myDate.getMonth()).toString().padStart(2, "0");
			const day = myDate.getDate().toString().padStart(2, "0");
			return day + "/" + month + "/" + year;
		}
	};

	const calculateExpiration = (pao) => {
		const validity = Number(pao);
		setProduct({
			...product,
			expDate: moment(product.openDate).add(validity, "M"),
		});
	};

	const saveItem = () => {
		console.log(product);
		// setProduct({
		// 	...product,
		// 	// purchaseDate: String(product.purchaseDate),
		// 	// openDate: String(product.openDate),
		// 	// expDate: String(product.expDate),
		// });
		console.log(
			typeof product.purchaseDate,
			typeof product.openDate,
			typeof product.expDate
		);
		//Firebase.database().ref("products/").push({ product: product });
	};

	return (
		<ScrollView>
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
			<Input
				label="Purchase Date"
				//value={getFormattedDate(product.purchaseDate)}
				value={
					product.purchaseDate
						? moment(product.purchaseDate).format("DD/MM/YYYY")
						: ""
				}
				//value={moment(product.purchaseDate).format("DD/MM/YYYY")}
				onFocus={showDatePicker}
				leftIcon={{ type: "font-awesome", name: "calendar", color: "#000" }}
			/>
			<Input
				label="Opening Date"
				//value={getFormattedDate(product.openDate)}
				value={
					product.openDate ? moment(product.openDate).format("DD/MM/YYYY") : ""
				}
				//value={moment(product.openDate).format("DD/MM/YYYY")}
				onFocus={showDatePicker}
				leftIcon={{ type: "font-awesome", name: "calendar", color: "#000" }}
			/>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={(date) => {
					//hideDatePicker();
					setProduct({ ...product, purchaseDate: date });
					hideDatePicker();
				}}
				onCancel={hideDatePicker}
			/>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={(date) => {
					//hideDatePicker();
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
			<Button title="Add product" onPress={saveItem} />
		</ScrollView>
	);
}

{
	/* <Text>Opening Date</Text>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					width: "80%",
					margin: 20,
				}}
			>
				<Input
					keyboardType="numeric"
					containerStyle={{ width: 60 }}
					label="DD"
					value={openingDate.dd}
					onChangeText={(d) => setOpenDate({ ...openingDate, dd: d })}
				/>
				<Text> / </Text>
				<Input
					keyboardType="numeric"
					containerStyle={{ width: 60 }}
					label="MM"
					value={openingDate.mm}
					onChangeText={(m) => setOpenDate({ ...openingDate, mm: m })}
				/>
				<Text> / </Text>
				<Input
					keyboardType="numeric"
					containerStyle={{ width: 60 }}
					label="YYYY"
					value={openingDate.yyyy}
					onChangeText={(y) => setOpenDate({ ...openingDate, yyyy: y })}
				/>
				<Button
					title="Set"
					onPress={() => {
						console.log("set button", openingDate);
						inputDate(openingDate);
					}}
				/> 
			</View>*/
}
