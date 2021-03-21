import React from 'react'
import Grid from '@material-ui/core/Grid'
import { NavLink } from 'react-router-dom'
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
				<NavLink to='/'>Tabaro3.com</NavLink>
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
		</>
	)
}

export default NavBar
