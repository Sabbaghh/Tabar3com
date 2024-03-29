import React, { useState, useEffect, useContext } from 'react'
import { Container, Grid, TextField, Button } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { ProjectFireStore } from '../API/FireBase'
import { AuthContext } from '../API/authContext'
import '../styles/Profile.scss'
const emailRgx =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
	const [initilPhoneNumber, setInitialPhoneNumber] = useState('')
	//FireStoreData
	const [FireStoreData, setFireStoreData] = useState([])
	//donation value
	const [donationMoney, setDonationMoney] = useState(0)
	const [donationGold, setDonationGold] = useState(0)
	//currentUser
	const currentUser = useContext(AuthContext).currentUser
	//error and loading
	const [error, setError] = useState('')
	const [loading, setLoading] = useState('')
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
		// {
		// 	type: 'Text',
		// 	label: 'Email Address',
		// 	value: EmailValue,
		// 	onchange: (e) => {
		// 		setEmailValue(e.target.value)
		// 		e.target.value.match(emailRgx)
		// 			? setEmailControl(true)
		// 			: setEmailControl(false)
		// 	},
		// 	control: EmailControl,
		// },
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
		// {
		// 	value: 'Change password',
		// 	color: 'primary',
		// 	disabled: false,
		// 	onButtonClick: () => {
		// 		console.log('click')
		// 	},
		// },
		{
			value: `${InputDisabled ? 'edit profile information' : 'SAVE CHANGES'}`,
			color: 'primary',
			disabled: false,
			onButtonClick: () => {
				setInputDisabled((prev) => !prev)
				setError('')
			},
			type: `${InputDisabled ? 'submit' : 'button'}`,
		},
		{
			value: 'RESET GOLD DONATION',
			color: 'secondary',
			disabled: donationGold === 0 ? true : false,
			onButtonClick: () => {
				try {
					ProjectFireStore.collection('users')
						.doc(currentUser.email)
						.set({
							...FireStoreData,
							donationGold: 0,
						})
				} catch {
					setError('something went wrong! please try again..')
				}
			},
			type: 'button',
		},
		{
			value: 'RESET MONEY DONATION',
			color: 'secondary',
			disabled: donationMoney === 0 ? true : false,
			onButtonClick: () => {
				try {
					ProjectFireStore.collection('users')
						.doc(currentUser.email)
						.set({
							...FireStoreData,
							donationMoney: 0,
						})
				} catch {
					setError('something went wrong! please try again..')
				}
			},
			type: 'button',
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
				setInitialPhoneNumber(snap.data().phoneNumber)
				if (snap.data().donationMoney) {
					setDonationMoney(snap.data().donationMoney)
				} else {
					setDonationMoney(0)
				}
				if (snap.data().donationGold) {
					setDonationGold(snap.data().donationGold)
				} else {
					setDonationGold(0)
				}
			})
	}, [currentUser.email])
	const onSaveChanges = async (e) => {
		e.preventDefault()
		if (new Date().getFullYear() - DateValue.getFullYear() < 18) {
			setError('you must be at least 18 years old')
			return
		}
		if (phoneNumber.length < 9) {
			setPhoneNumber(initilPhoneNumber)
			setError('you must enter a valid phone number')
			return
		}
		try {
			setError('')
			setLoading('Loading..')
			ProjectFireStore.collection('users')
				.doc(currentUser.email)
				.set({
					...FireStoreData,
					firstName: FirstNameValue,
					lastName: LastNameValue,
					date: DateValue,
					phoneNumber,
				})
			setError('')
			setLoading(false)
		} catch {
			setError('something went wrong! please try again..')
		}
	}
	return (
		<Container>
			<Grid
				container
				direction='column'
				justify='"space-between"'
				alignItems='center'
			>
				<form className='profile-form' onSubmit={(e) => onSaveChanges(e)}>
					<h1 className='profile-header'>الصفحة الشخصية</h1>
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
					<div style={{ textAlign: 'center', marginTop: '1rem' }}>
						{error && <span style={{ color: 'red' }}>{error}</span>}
						{loading && <span style={{ color: 'blue' }}>{loading}</span>}
					</div>
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='center'
						className='input-container'
					>
						<div>
							<p>قيمة التبرع المستحقة : {donationMoney} دينار أردني بالمال</p>
							<hr />
							<p> قيمة التبرع المستحقة : {donationGold} دينار أردني بالذهب</p>
							<hr />
							<p style={{ textAlign: 'center' }}>
								المجموع :{parseInt(donationGold) + parseInt(donationMoney)}{' '}
								دينار أردني
							</p>
						</div>
					</Grid>
					<Grid
						container
						direction='column'
						justify='center'
						alignItems='center'
						className='input-container'
					>
						{buttons.map(({ color, onButtonClick, value, disabled, type }) => {
							return (
								<Button
									variant='contained'
									color={color}
									type={type}
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
