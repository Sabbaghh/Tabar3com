import React from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Logo from '../images/tabar3kom.png'
import '../styles/form.scss'

const Register = () => {
	const { register, handleSubmit } = useForm()
	const onLogin = (data) => {
		console.log(data)
	}
	return (
		<Container fixed className='Form-container'>
			<form onSubmit={handleSubmit(onLogin)}>
				<Grid container direction='column' justify='center' alignItems='center'>
					<Container className='logo-container'>
						<img src={Logo} />
					</Container>
					<TextField
						className='input'
						id='filled-basic'
						label='Email'
						placeholder='exmaple@example.com'
						variant='filled'
						type='email'
						name='email'
						inputRef={register}
						color='primary'
						autoComplete
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
						inputRef={register}
						color='primary'
						required
					/>
					<TextField
						className='input'
						id='filled-basic'
						label='re-type the password'
						placeholder='********'
						variant='filled'
						type='rePassword'
						name='rePassword'
						inputRef={register}
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
						Login in
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
