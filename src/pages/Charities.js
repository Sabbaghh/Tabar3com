import React, { useState, useEffect } from 'react'
import {
	Grid,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	makeStyles,
	Typography,
	Backdrop,
} from '@material-ui/core'
import { ProjectFireStore } from '../API/FireBase'
import '../styles/Charities.scss'

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		margin: 20,
	},
	media: {
		height: 140,
	},
	backdrop: {
		zIndex: 2,
		color: '#fff',
	},
	innerBackDrop: {
		background: '#FFF',
		color: '#000',
		width: '80%',
		height: '80%',
	},
})
const Charities = () => {
	const [charities, setCharities] = useState([])
	useEffect(async () => {
		const data = await getData()
		setCharities(data)
	}, [])

	const getData = async () => {
		const snapshot = await ProjectFireStore.collection('charities').get()
		return snapshot.docs.map((doc) => doc.data())
	}
	const [toggleBackDrop, setToggleBackDrop] = useState(false)
	const classes = useStyles()
	const [currentData, setCurrentData] = useState()
	return (
		<>
			<Grid container direction='row' justify='center' alignItems='center'>
				{charities &&
					charities?.map((cha) => {
						return (
							<Card
								className={classes.root}
								onClick={() => {
									setToggleBackDrop(true)
									setCurrentData(cha)
								}}
								key={cha.name}
							>
								<CardActionArea>
									<CardMedia className={classes.media} image={cha.image} />
									<CardContent>
										<Typography gutterBottom variant='h5' component='h2'>
											{cha.name}
										</Typography>
										<Typography
											variant='body2'
											color='textSecondary'
											component='p'
										>
											{cha.description}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Button
										size='small'
										color='primary'
										type='button'
										onClick={() => {
											setToggleBackDrop(true)
											setCurrentData(cha)
										}}
									>
										لمزيد من التفاصيل
									</Button>
								</CardActions>
							</Card>
						)
					})}
			</Grid>
			{currentData && (
				<Backdrop
					className={classes.backdrop}
					open={toggleBackDrop}
					onClick={() => setToggleBackDrop(false)}
				>
					<div className='currentDataContainer'>
						<div className='currentDataImageContainer'>
							<img src={currentData.image} alt='logo' />
						</div>
						<div className='currentDataDecContianer'>
							<h1> {currentData.name}</h1>
							<p>{currentData.description}</p>
							<Button
								type='button'
								variant='outlined'
								color='primary'
								size='large'
								onClick={() => {
									alert('test')
								}}
							>
								تبرع الان
							</Button>
						</div>
					</div>
				</Backdrop>
			)}
		</>
	)
}

export default Charities
