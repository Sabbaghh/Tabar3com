import React from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Logo from '../images/tabar3kom.png'
import MenuItem from '@material-ui/core/MenuItem'
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
						label='Name'
						placeholder='John'
						variant='filled'
						type='text'
						name='name'
						inputRef={register}
						color='primary'
						required
					/>
					<TextField
						className='input'
						id='filled-basic'
						label='Last Name'
						placeholder='Doe'
						variant='filled'
						type='text'
						name='LastName'
						inputRef={register}
						color='primary'
						required
					/>
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
						id='date'
						label='Birth date'
						type='date'
						name='date'
						className='input'
						variant='filled'
						InputLabelProps={{
							shrink: true,
						}}
						inputRef={register}
						required
					/>
					<TextField
						className='input'
						id='filled-basic'
						label='Phone number'
						placeholder='07xxxxxxxxx'
						variant='filled'
						type='tel'
						name='phone'
						inputRef={register}
						color='primary'
						required
					/>
					<TextField
						id='select'
						label='Gender'
						value='Male'
						select
						className='input'
						variant='filled'
					>
						<MenuItem value='Select' disabled selected>
							Select
						</MenuItem>
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
