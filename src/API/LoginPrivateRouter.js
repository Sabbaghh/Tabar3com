import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './authContext'

const LoginPrivateRouter = ({ component: Component, ...rest }) => {
	const currentUser = useContext(AuthContext).currentUser
	return (
		<>
			<Route
				{...rest}
				render={(props) => {
					return currentUser ? <Redirect to='/' /> : <Component {...props} />
				}}
			/>
		</>
	)
}

export default LoginPrivateRouter
