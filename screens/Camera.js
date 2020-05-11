import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default function Photo({ route, navigation }) {
	const [hasCameraPermission, setPermission] = useState(null);
	const [photoName, setPhotoName] = useState("");
	const [photoBase64, setPhotoBase64] = useState("");

	const camera = useRef(null);

	useEffect(() => {
		//console.log(product);
		askCameraPermission();
	}, []);

	const askCameraPermission = async () => {
		const { status } = await Camera.requestPermissionsAsync();
		setPermission(status == "granted");
	};

	const snap = async () => {
		if (camera) {
			const photo = await camera.current.takePictureAsync({ base64: true });
			setPhotoName(photo.uri);
			setPhotoBase64(photo.base64);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			{hasCameraPermission ? (
				<View style={{ flex: 1 }}>
					<Camera style={{ flex: 2 }} ref={camera} />
					<View>
						<Button title="Take Photo" onPress={snap} />
					</View>
					{photoName ? (
						<View style={{ flex: 2 }}>
							<View style={{ flex: 1 }}>
								<Image source={{ uri: photoName }} />
								<Image
									style={{ flex: 1 }}
									source={{ uri: `data:image/gif;base64,${photoBase64}` }}
								/>
							</View>
							<Button
								title="Save photo"
								onPress={() => {
									navigation.navigate("AddItem", {
										address: photoName,
									});
									console.log(photoName);
								}}
							/>
						</View>
					) : (
						<View></View>
					)}
				</View>
			) : (
				<Text>No access to camera</Text>
			)}
		</View>
	);
}
