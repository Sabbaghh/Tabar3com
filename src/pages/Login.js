import React from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Logo from '../images/tabar3kom.png'
import '../styles/form.scss'

const Login = () => {
	return (
		<Container fixed className='Form-container'>
			<form>
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
				</Grid>
			</form>
		</Container>
	)
}

export default Login
