window.addEventListener = (x) => x; // to avoid eventlistener error: https://stackoverflow.com/questions/61429599/error-cloud-firestore-addeventlistener-is-not-a-function-react-native-firestor

import firebase from "firebase";
import firestore from "firebase/firestore";

import {
	API_KEY,
	AUTH_DOMAIN,
	DATABASE_URL,
	PROJECT_ID,
	MESSAGE_SENDER_ID,
	APP_ID,
} from "react-native-dotenv";

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	databaseURL: DATABASE_URL,
	projectId: PROJECT_ID,
	storageBucket: "",
	messagingSenderId: MESSAGE_SENDER_ID,
	appId: APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
