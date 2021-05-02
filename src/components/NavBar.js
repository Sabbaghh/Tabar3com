import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { AuthContext } from '../API/authContext'
import { Button } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
// import Logo from '../images/tabar3kom.png'

import '../styles/navbar.scss'

const NavBar = () => {
	const currentUser = useContext(AuthContext).currentUser
	const logout = useContext(AuthContext).logout
	return (
		<>
			<Grid
				container
				direction='row'
				justify='space-around'
				alignItems='center'
				className='navBar'
			>
				<NavLink to='/About' activeClassName='nav-active'>
					تواصل معنا
				</NavLink>
				<NavLink exact to='/charities' activeClassName='nav-active'>
					الجمعيات الخيرية
				</NavLink>
				<NavLink exact to='/' activeClassName='nav-active'>
					الرئيسية
				</NavLink>
				<NavLink exact to='/calculator' activeClassName='nav-active'>
					حساب الزكاة
				</NavLink>
				{currentUser ? (
					<>
						<Button
							variant='contained'
							color='primary'
							size='large'
							onClick={() => logout()}
						>
							تسجيل خروج
						</Button>
						<NavLink to='/profile' activeClassName='nav-active'>
							<AccountCircleIcon />
						</NavLink>
					</>
				) : (
					<NavLink to='/login' activeClassName='nav-active'>
						تسجيل دخول
					</NavLink>
				)}
			</Grid>
			<Container className='logo-container-nav'>
				{/* <img src={Logo} alt='LOGO' /> */}
				<span>ZAKATNA | زكاتنا</span>
			</Container>
		</>
	)
}

export default NavBar
