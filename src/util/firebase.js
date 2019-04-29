import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDQS6cMSdOm4ueLsCmTAYW5bDfUpPkcCM4",
  authDomain: "case2019k.firebaseapp.com",
};

firebase.initializeApp(config);

export default firebase;