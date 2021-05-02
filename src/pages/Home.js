import React from 'react'
import Slider from '../components/Slider'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { ProjectFireStore } from '../API/FireBase'
import '../styles/homePage.scss'

const Home = () => {
	return (
		<div className='HomePage'>
			<Slider />
			<Container className='msg'>
				<p>
					نشكركم على مساهمتكم القيمة فمهما كان التبرع كبيراً أو صغيراً، سيحدث
					تغييراً إيجابياً في كفاحنا ضد الفقر
				</p>
			</Container>
			<Container className='calOrdonate'>
				<Grid
					container
					direction='row'
					justify='space-evenly'
					alignItems='center'
				>
					<Link to='/charities'>
						<Button
							className='input'
							size='large'
							variant='outlined'
							color='primary'
							type='button'
						>
							تبرع الان
						</Button>
					</Link>

					<Link to='/calculator'>
						<Button
							className='input'
							size='large'
							variant='outlined'
							color='primary'
							type='button'
						>
							احسب الزكاة
						</Button>
					</Link>
				</Grid>
			</Container>
		</div>
	)
}

export default Home
