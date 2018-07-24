import * as firebase from 'firebase';

const config = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "your-database-url",
  projectId: "your-project-id",
  storageBucket: "your-store-bucket",
  messagingSenderId: "your-messaging-sender-id"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('posts/');
export const auth = firebase.auth();
// export const userDb = firebase.database().ref('users/');