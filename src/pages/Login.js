import React, { useContext, useState } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../API/authContext'

import '../styles/form.scss'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState('')
	const history = useHistory()

	const login = useContext(AuthContext).login
	// const setCurrentUser = useContext(AuthContext).setCurrentUser

	const handleLoginSubmit = async (e) => {
		e.preventDefault()
		try {
			setError('')
			setLoading('Loading..')
			await login(email, password)
			history.push('/profile')
		} catch {
			//if you can't find email for main admin look for secondary admins
			setError('something went wrong! please try again..')
		}
		setLoading(false)
	}
	return (
		<Container fixed className='Form-container'>
			<form onSubmit={(e) => handleLoginSubmit(e)}>
				<Grid container direction='column' justify='center' alignItems='center'>
					<Container className='logo-container'>
						{/* <img src={Logo} alt='LOGO' /> */}
						<p style={{ color: '#FFF', textAlign: 'center' }}>
							ZAKATNA | زكاتنا
						</p>
					</Container>
					<TextField
						className='input'
						id='filled-basic'
						label='Email'
						placeholder='exmaple@example.com'
						variant='filled'
						type='email'
						name='email'
						color='primary'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						className='input'
						id='filled-basic'
						label='Password'
						placeholder='********'
						variant='filled'
						type='Password'
						name='Password'
						color='primary'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						className='input'
						size='large'
						variant='outlined'
						color='primary'
						type='submit'
					>
						Login
					</Button>
					<span>
						DON'T HAVE AN ACCOUNT ? <Link to='/Register'>REGISTER</Link>
					</span>
					{error && <span style={{ color: 'red' }}>{error}</span>}
					{loading && <span style={{ color: 'blue' }}>{loading}</span>}
				</Grid>
			</form>
		</Container>
	)
}

export default Login
