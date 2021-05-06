import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import { makeStyles } from '@material-ui/core/styles'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Button } from '@material-ui/core'
import { AuthContext } from '../API/authContext'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}))
const Layout = ({ children }) => {
	const currentUser = useContext(AuthContext).currentUser
	const sendEmailVerification = useContext(AuthContext).sendEmailVerification
	console.log(currentUser)
	const classes = useStyles()
	const renderAlert = () => {
		if (!currentUser.emailVerified) {
			return (
				<div className={classes.root}>
					<Alert severity='error'>
						<AlertTitle>حسابك غير مفعل</AlertTitle>
						الرجاء تفعيل حسابك عن طريق رسائل البريد الألكنروني الخاص بك
						<br />
						<Button
							color='secondary'
							variant='contained'
							onClick={() => sendEmailVerification()}
						>
							أرسال رسالة التفعيل
						</Button>
					</Alert>
				</div>
			)
		}
		return
	}
	return (
		<>
			<NavBar />
			{currentUser && renderAlert()}
			{children}
		</>
	)
}

export default Layout
