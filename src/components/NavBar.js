import React from 'react'
import Grid from '@material-ui/core/Grid'
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Logo from '../images/tabar3kom.png'
import '../styles/navbar.scss'

const NavBar = () => {
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
				<NavLink to='/login' activeClassName='nav-active'>
					تسجيل دخول
				</NavLink>
			</Grid>
			<Container className='logo-container-nav'>
				<img src={Logo} alt='LOGO' />
			</Container>
		</>
	)
}

export default NavBar
