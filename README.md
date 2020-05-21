# MakeApp v0

MakeApp is a React Native mobile application for tracking makeup and beauty product purchases.

## What does it do?

The application supports CRUD (create, read, update, delete) functions for makeup and beauty products. User can create a user account, and after logging in they can perform actions on their own products:

- Input a new product either manually or by fetching the brand or product type from an online REST API [Makeup API](http://makeup-api.herokuapp.com/api/v1/products.json)
- Modify product's information
- Delete product

## How does it work?

The user can create an account by providing an e-mail address and a password. After logging in the user can navigate the application's different functions from the home page with buttons or by pressing the individual products on their product list.

MakeApp uses [Google Firebase](https://firebase.google.com/) for user authentication and Firebase's Firestore as a cloud database.

## Who will user this project?

This application is for people who are interested in tracking their makeup and beauty product consumption. At the moment the application supports basic CRUD functions but future development will involve:

- Wish lists
- Notifications on expiring products
- Budgeting and project pan
- Tracking of monthly purchase amounts
- Etc.

## What is the goal of this project?

See above.

## Used technologies and components

- Framework: React Native, [Expo](https://expo.io/)
- Components:
  - Authentication: [Google Firebase](https://firebase.google.com/) authentication
  - Database: [Google Firebase](https://firebase.google.com/) Firestore
  - Key management: [Dotenv](https://github.com/motdotla/dotenv)
  - Styling: [React Native Elements](https://react-native-elements.github.io/react-native-elements/), [React Native Community Picker](https://github.com/react-native-community/react-native-picker)
  - Navigation: [React Navigation](https://reactnavigation.org/) (Stack)
  - Camera: [Expo Camera](https://docs.expo.io/versions/v37.0.0/sdk/camera/)
  - Calendar and time management: [React Native Community Datetimepicker](https://github.com/react-native-community/datetimepicker), [React Native Modal Datetime-Picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker), [Moment](https://momentjs.com/)
  - Other: [Base64](https://www.npmjs.com/package/react-native-base64) for supporting base-64 encoding-decoding with Firebase
