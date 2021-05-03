import React, { useState, useEffect, useContext } from 'react'
import { Container, Grid, TextField, Button } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { ProjectFireStore } from '../API/FireBase'
import { AuthContext } from '../API/authContext'
import '../styles/Profile.scss'
const emailRgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Profile = () => {
	//email input
	const [EmailControl, setEmailControl] = useState(true)
	const [EmailValue, setEmailValue] = useState('')
	//FirstName input
	const [FirstNameControl, setFirstNameControl] = useState(true)
	const [FirstNameValue, setFirstNameValue] = useState('')
	//FirstName input
	const [LastNameControl, setLastNameControl] = useState(true)
	const [LastNameValue, setLastNameValue] = useState('')
	//password input
	const [PasswordControl, setPasswordControl] = useState(true)
	const [PasswordValue, setPasswordValue] = useState('')
	const [PasswordDiabled, setPasswordDiabled] = useState(true)
	//dateinput
	const [DateValue, setDateValue] = useState(new Date())
	//phoneNumber input
	const [phoneNumber, setPhoneNumber] = useState('')
	const [InputDisabled, setInputDisabled] = useState(true)
	//FireStoreData
	const [FireStoreData, setFireStoreData] = useState([])
	//currentUser
	const currentUser = useContext(AuthContext).currentUser
	const onDateChange = (date) => {
		setDateValue(date)
	}
	const onPhoneNumberCahnge = (e) => {
		const numbers = [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
		if (
			numbers.includes(e.target.value[e.target.value.length - 1]) &&
			e.target.value.length < 10
		) {
			setPhoneNumber(e.target.value)
		}
		if (e.target.value === '') {
			setPhoneNumber('')
		}
	}
	const inputs = [
		{
			type: 'Text',
			label: 'First Name',
			value: FirstNameValue,
			onchange: (e) => {
				setFirstNameValue(e.target.value)
				e.target.value.length > 2
					? setFirstNameControl(true)
					: setFirstNameControl(false)
			},
			control: FirstNameControl,
		},
		{
			type: 'Text',
			label: 'Last Name',
			value: LastNameValue,
			onchange: (e) => {
				setLastNameValue(e.target.value)
				e.target.value.length > 2
					? setLastNameControl(true)
					: setLastNameControl(false)
			},
			control: LastNameControl,
		},
		{
			type: 'Text',
			label: 'Email Address',
			value: EmailValue,
			onchange: (e) => {
				setEmailValue(e.target.value)
				e.target.value.match(emailRgx)
					? setEmailControl(true)
					: setEmailControl(false)
			},
			control: EmailControl,
		},
		// {
		// 	type: 'Password',
		// 	label: 'Password',
		// 	onButtonClick: () => {
		// 		setPasswordDiabled((prev) => !prev)
		// 	},
		// 	value: PasswordValue,
		// 	onchange: (e) => {
		// 		console.log('onEmailChange')
		// 	},
		// 	control: EmailControl,
		// },
	]
	const buttons = [
		{
			value: 'Change password',
			color: 'primary',
			disabled: false,
			onButtonClick: () => {
				console.log('click')
			},
		},
		{
			value: `${InputDisabled ? 'edit profile information' : 'SAVE CHANGES'}`,
			color: 'primary',
			disabled: false,
			onButtonClick: () => {
				setInputDisabled((prev) => !prev)
			},
		},
		{
			value: 'DELETE ACCOUNT',
			color: 'secondary',
			disabled: false,
			onButtonClick: () => {
				console.log('click')
			},
		},
	]
	useEffect(() => {
		ProjectFireStore.collection('users')
			.doc(currentUser.email)
			.onSnapshot((snap) => {
				console.log(snap.data())
				setFireStoreData(snap.data())
				setEmailValue(snap.data().email)
				setFirstNameValue(snap.data().firstName)
				setLastNameValue(snap.data().lastName)
				setDateValue(new Date(snap.data().date.seconds * 1000))
				setPhoneNumber(snap.data().phoneNumber)
			})
	}, [currentUser.email])
	return (
		<Container>
			<Grid
				container
				direction='column'
				justify='"space-between"'
				alignItems='center'
			>
				<form className='profile-form'>
					<h1 className='profile-header'>الصفحة الشحصية</h1>
					{inputs.map(({ type, label, value, onchange, control }) => {
						return (
							<Grid
								container
								direction='row'
								justify='center'
								alignItems='center'
								className='input-container'
							>
								<TextField
									variant='outlined'
									label={label}
									className='input'
									type={type}
									color={control ? 'primary' : 'secondary'}
									onChange={(e) => onchange(e)}
									value={value}
									disabled={InputDisabled}
								/>
							</Grid>
						)
					})}
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='center'
						className='input-container'
					>
						<KeyboardDatePicker
							margin='normal'
							className='input'
							label='Birth date - MM/DD/YYYY'
							format='MM/dd/yyyy'
							value={DateValue}
							onChange={onDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
							disabled={InputDisabled}
						/>
					</Grid>
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='center'
						className='input-container'
					>
						<p>+962</p>
						<TextField
							className='input phone'
							variant='filled'
							value={phoneNumber}
							label='phone number'
							placeholder='xxxxxxxxx'
							onChange={(e) => {
								onPhoneNumberCahnge(e)
							}}
							disabled={InputDisabled}
							color={phoneNumber.length === 9 ? 'primary' : 'secondary'}
						/>
					</Grid>
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='center'
						className='input-container'
					>
						<p>
							قيمة التبرع المستحة : 300 دينار أردني
							<hr />
						</p>
					</Grid>
					<Grid
						container
						direction='column'
						justify='center'
						alignItems='center'
						className='input-container'
					>
						{buttons.map(({ color, onButtonClick, value, disabled }) => {
							return (
								<Button
									variant='contained'
									color={color}
									type='button'
									className='btn-wide'
									onClick={() => onButtonClick()}
									disabled={disabled}
								>
									{value}
								</Button>
							)
						})}
					</Grid>
				</form>
			</Grid>
		</Container>
	)
}

export default Profile
