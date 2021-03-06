import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

const auth = app.auth()
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
const ProjectFireStore = app.firestore()
const TimeStamps = firebase.firestore.Timestamp
export { ProjectFireStore, auth, TimeStamps }
export default app
