import React, { createContext, useState, useEffect } from 'react'
import { auth } from './FireBase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState()
	const signup = (email, PWD) => {
		return auth.createUserWithEmailAndPassword(email, PWD)
	}
	const login = (email, PWD) => {
		return auth.signInWithEmailAndPassword(email, PWD)
	}
	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email)
	}
	const logout = () => {
		return auth.signOut()
	}
	const sendEmailVerification = () => {
		return currentUser
			.sendEmailVerification()
			.then(() => {
				console.log('sent')
			})
			.catch((err) => {
				console.log(err)
			})
	}

	useEffect(() => {
		const unSub = auth.onAuthStateChanged((user) => {
			setCurrentUser(user)
		})
		return unSub
	}, [])

	const value = {
		currentUser,
		setCurrentUser,
		signup,
		login,
		resetPassword,
		logout,
		sendEmailVerification,
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
