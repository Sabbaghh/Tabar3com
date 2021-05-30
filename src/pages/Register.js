import React, { useContext, useState } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../API/authContext'
import { useHistory } from 'react-router-dom'
import { ProjectFireStore } from '../API/FireBase'
// import Logo from '../images/tabar3kom.png'
import MenuItem from '@material-ui/core/MenuItem'
import 'react-phone-number-input/style.css'
import '../styles/form.scss'

const Register = () => {
	const signup = useContext(AuthContext).signup
	const [firstName, setFirstName] = useState('')
	const [firstNameErr, setFirstNameErr] = useState(false)
	const [lastName, setLastName] = useState('')
	const [lastNameErr, setLastNameErr] = useState(false)
	const [password, setPassword] = useState('')
	const [passwordErr, setPassswordErr] = useState(false)
	const [email, setEmail] = useState('')
	const [emailErr, setEmailErr] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState('')
	const [gender, setGender] = useState('')
	const [date, setDate] = useState(new Date())
	const passowrdExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
	const emailRgx =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const [error, setError] = useState('')
	const [loading, setLoading] = useState('')
	const history = useHistory()

	const onPasswordChange = (e) => {
		setPassword(e.target.value)
		e.target.value.match(passowrdExp)
			? setPassswordErr(true)
			: setPassswordErr(false)
	}
	const onEmailChange = (e) => {
		setEmail(e.target.value)
		e.target.value.match(emailRgx) ? setEmailErr(true) : setEmailErr(false)
	}
	const onGenderChange = (e) => {
		setGender(e.target.value)
	}
	const onFirstNameChange = (e) => {
		setFirstName(e.target.value)
		e.target.value.length > 2 ? setFirstNameErr(true) : setFirstNameErr(false)
	}
	const onLastNameChange = (e) => {
		setLastName(e.target.value)
		e.target.value.length > 2 ? setLastNameErr(true) : setLastNameErr(false)
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
	const onDateChange = (date) => {
		setDate(date)
	}
	const onSignUp = async (e) => {
		e.preventDefault()
		if (phoneNumber.length < 9) {
			setError('you must enter a valid phone number')
			return
		}

		if (new Date().getFullYear() - date.getFullYear() < 18) {
			setError('you must be at least 18 years old')
			return
		}
		if (!passwordErr) {
			setError('The password is weak')
			return
		}
		if (!emailErr) {
			setError('The email isnt valid')
			return
		}
		try {
			setError('')
			setLoading('Loading..')
			await signup(email, password)
			ProjectFireStore.collection('users').doc(email).set({
				firstName,
				lastName,
				email,
				date,
				gender,
				phoneNumber,
			})
			// history.push('/profile')
		} catch {
			setError('something went wrong! please try again..')
		}
		setLoading(false)
	}
	return (
		<Container fixed className='Form-container'>
			<form onSubmit={(e) => onSignUp(e)}>
				<Grid container direction='column' justify='center' alignItems='center'>
					<Container className='logo-container'>
						<p style={{ color: '#FFF', textAlign: 'center' }}>
							ZAKATNA | زكاتنا
						</p>
					</Container>
					<TextField
						className='input'
						label='Name'
						placeholder='John'
						variant='filled'
						type='text'
						name='name'
						color={firstNameErr ? 'primary' : 'secondary'}
						required
						onChange={onFirstNameChange}
						value={firstName}
					/>
					<TextField
						className='input'
						label='Last Name'
						placeholder='Doe'
						variant='filled'
						type='text'
						name='LastName'
						color={lastNameErr ? 'primary' : 'secondary'}
						required
						onChange={onLastNameChange}
						value={lastName}
					/>
					<TextField
						label='Gender'
						value={gender}
						select
						className='input'
						variant='filled'
						onChange={onGenderChange}
						required
					>
						<MenuItem value='Male'>Male</MenuItem>
						<MenuItem value='Female'>Female</MenuItem>
					</TextField>
					<KeyboardDatePicker
						margin='normal'
						className='input'
						label='Birth date - MM/DD/YYYY'
						format='MM/dd/yyyy'
						value={date}
						onChange={onDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
					<span
						style={{ paddingTop: '0.5rem', width: '90%', color: '#7d7c83' }}
					>
						Phone Number
					</span>
					<div className='phoneNumberContainer'>
						<p>+962</p>
						<TextField
							className='input'
							variant='filled'
							value={phoneNumber}
							label='phone number'
							placeholder='xxxxxxxxx'
							onChange={(e) => {
								onPhoneNumberCahnge(e)
							}}
							color={phoneNumber.length === 9 ? 'primary' : 'secondary'}
							required
						/>
					</div>

					<TextField
						className='input'
						label='Email'
						placeholder='exmaple@example.com'
						variant='filled'
						type='email'
						name='email'
						required
						value={email}
						color={emailErr ? 'primary' : 'secondary'}
						onChange={onEmailChange}
					/>
					<TextField
						className='input'
						label='Password'
						placeholder='********'
						variant='filled'
						type='Password'
						name='Password'
						color={passwordErr ? 'primary' : 'secondary'}
						required
						onChange={onPasswordChange}
						value={password}
					/>
					<span
						style={{ paddingTop: '0.5rem', width: '90%', color: '#7d7c83' }}
					>
						Password must be 8-16 characters long and contain both numbers and
						letters/special characters
					</span>
					<Button
						className='input'
						size='large'
						variant='outlined'
						color='primary'
						type='submit'
					>
						Sign up
					</Button>
					<span>
						DO YOU HAVE AN ACCOUNT ? <Link to='/Login'>LOG IN</Link>
					</span>
					{error && <span style={{ color: 'red' }}>{error}</span>}
					{loading && <span style={{ color: 'blue' }}>{loading}</span>}
				</Grid>
			</form>
		</Container>
	)
}

export default Register
