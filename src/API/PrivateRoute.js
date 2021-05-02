import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './authContext'

const MainAdminPrivateRoute = ({ component: Component, ...rest }) => {
	const currentUser = useContext(AuthContext).currentUser
	console.log(currentUser)
	return (
		<>
			{currentUser && (
				<Route
					{...rest}
					render={(props) => {
						return currentUser ? <Component {...props} /> : <Redirect to='/' />
					}}
				/>
			)}
		</>
	)
}

export default MainAdminPrivateRoute
