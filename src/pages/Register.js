import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import PhoneInput from 'react-phone-number-input'
import { Link } from 'react-router-dom'
import Logo from '../images/tabar3kom.png'
import MenuItem from '@material-ui/core/MenuItem'
import 'react-phone-number-input/style.css'
import '../styles/form.scss'

const Register = () => {
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
	const passowrdExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
	const emailRgx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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
	return (
		<Container fixed className='Form-container'>
			<form>
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
				</Grid>
			</form>
		</Container>
	)
}

export default Register
