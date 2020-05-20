import React from "react";
import { StyleSheet } from "react-native";

let solidPink = "#773344", // dark pink
	cashmere = "#E3B5A4", // beige
	potPourri = "#F5E9E2", // pale beige/whitish
	blackRussian = "#0B0014",
	cabaret = "#D44D5C"; // reddish

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		position: "relative",
	},
	inputContainer: {
		margin: 10,
	},
	cardContainer: {
		flex: 1,
		width: "100%",
		//	justifyContent: "center",
		backgroundColor: potPourri,
	},
	header: {
		backgroundColor: blackRussian,
	},
	input: {
		//flex: 1,
		margin: 10,
		width: "100%",
		padding: 10,
	},
	searchText: {
		justifyContent: "center",
		alignItems: "center",
	},
	list: {
		flex: 2,
		width: "100%",
		margin: 10,
	},
	listItem: {
		backgroundColor: "#fff",
	},
	addBtnContainer: {
		width: "100%",
		padding: 10,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	addBtn: {
		backgroundColor: cabaret,
		height: 50,
		width: 50,
		borderRadius: 50,
	},
	actionBtn: {
		backgroundColor: cabaret,
		paddingLeft: 20,
		paddingRight: 20,
		margin: 5,
		borderWidth: 2,
		borderColor: cabaret,
	},
	actionBtnInvert: {
		backgroundColor: "#fff",
		margin: 5,
		borderWidth: 2,
		borderColor: cabaret,
		paddingLeft: 20,
		paddingRight: 20,
	},
	actionBtnInvertText: {
		color: cabaret,
	},
	textBtn: {
		color: cabaret,
	},
	card: {
		//backgroundColor: potPourri,
		//height: "80%",
		justifyContent: "space-between",
	},
	cardTitle: {
		color: solidPink,
		fontSize: 30,
	},
	cardLine: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardText: {
		fontSize: 20,
	},
	cardImg: {
		width: 150,
		height: 150,
		margin: 20,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	logout: {
		backgroundColor: blackRussian,
	},
});

export default styles;
