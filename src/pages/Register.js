import React, { useContext, useState } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import PhoneInput from 'react-phone-number-input'
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
	const [date, setDate] = useState()
	const passowrdExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
	const emailRgx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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
	const onSignUp = async (e) => {
		e.preventDefault()
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
			history.push('/profile')
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
					<TextField
						id='date'
						label='Birth date'
						type='date'
						name='date'
						className='input'
						variant='filled'
						value={date}
						onChange={(e) => setDate(e.target.value)}
						InputLabelProps={{
							shrink: true,
						}}
						required
					/>
					<PhoneInput
						placeholder='Enter phone number'
						value={phoneNumber}
						onChange={setPhoneNumber}
						className='input phone-input'
					/>
					<TextField
						label='Gender'
						value={gender}
						select
						className='input'
						variant='filled'
						onChange={onGenderChange}
					>
						<MenuItem value='Male'>Male</MenuItem>
						<MenuItem value='Female'>Female</MenuItem>
					</TextField>
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
