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
		backgroundColor: potPourri,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
	},
	cardContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		backgroundColor: potPourri,
	},
	header: {
		backgroundColor: blackRussian,
	},
	input: {
		margin: 10,
		width: "100%",
		padding: 10,
	},
	list: {
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
		backgroundColor: blackRussian,
		height: 50,
		width: 50,
		borderRadius: 50,
	},
	actionBtn: {
		backgroundColor: cabaret,
		paddingLeft: 20,
		paddingRight: 20,
	},
	textBtn: {
		color: cabaret,
	},
	card: {
		//backgroundColor: potPourri,
		height: "80%",
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
});

export default styles;
