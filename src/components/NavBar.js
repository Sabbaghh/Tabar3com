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
				<NavLink exact to='/' activeClassName='nav-active'>
					HOME
				</NavLink>
				<NavLink to='/About' activeClassName='nav-active'>
					ABOUT
				</NavLink>
				<NavLink to='/login' activeClassName='nav-active'>
					LOGIN
				</NavLink>
			</Grid>
			<Container className='logo-container-nav'>
				<img src={Logo} alt='LOGO' />
			</Container>
		</>
	)
}

export default NavBar
