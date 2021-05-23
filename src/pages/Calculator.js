import React, { useState, useEffect, useContext } from 'react'
import {
	Grid,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Button,
} from '@material-ui/core'
import { requestOptions } from '../API/GoldApi'
import zakatImage from '../images/zakat.jpg'
import '../styles/Calculator.scss'
import { ProjectFireStore } from '../API/FireBase'
import { AuthContext } from '../API/authContext'

const Calculator = () => {
	const [gold24, setGold24] = useState(0)
	const [gold21, setGold21] = useState(0)
	const [gold22, setGold22] = useState(0)
	const [gold18, setGold18] = useState(0)
	const [Toggle, setToggle] = useState('نقداً')

	//For Cash
	const [cash, setCash] = useState(0)
	const [gold24Input, setgold24Input] = useState(0)
	const [gold22Input, setgold22Input] = useState(0)
	const [gold21Input, setgold21Input] = useState(0)
	const [gold18Input, setgold18Input] = useState(0)

	//error and loading
	const [error, setError] = useState('')
	const [loading, setLoading] = useState('')

	//current user
	const currentUser = useContext(AuthContext).currentUser
	//fire store total amount of donations
	const [userData, setUserData] = useState('')
	const [donation, setDonation] = useState(0)
	//total donation
	const [Total, SetTotal] = useState('')

	//adding the total donation to firebase
	const setTotalDonation = (type) => {
		switch (type) {
			case 'gold':
				ProjectFireStore.collection('users')
					.doc(currentUser.email)
					.set({
						...userData,
						donationGold: parseInt(donation) + parseInt(Total),
					})
				break
			case 'money':
				ProjectFireStore.collection('users')
					.doc(currentUser.email)
					.set({
						...userData,
						donationMoney: parseInt(donation) + parseInt(Total),
					})
				break
			default:
				return
		}
		SetTotal('')
	}

	const getGoldPrices = () => {
		fetch('https://www.goldapi.io/api/XAU/USD', requestOptions)
			.then((response) => response.text())
			.then((result) => {
				let Gold24 = (JSON.parse(result).price * 31.1) / 1000
				setGold24(Gold24.toFixed(1) * 0.71)
				setGold22(((Gold24 * 22) / 24).toFixed(1) * 0.71)
				setGold21(((Gold24 * 21) / 24).toFixed(1) * 0.71)
				setGold18(((Gold24 * 18) / 24).toFixed(1) * 0.71)
			})
			.catch((error) => console.log('error', error))
	}
	useEffect(() => {
		getGoldPrices()
		SetTotal('')
		if (currentUser) {
			ProjectFireStore.collection('users')
				.doc(currentUser.email)
				.onSnapshot((snap) => {
					setUserData(snap.data())
					if (snap.data().donation) setDonation(parseInt(snap.data().donation))
				})
		}
	}, [Toggle, currentUser])
	const handleChange = (event) => {
		setError('')
		setLoading('')
		setToggle(event.target.value)
	}

	const OnCalculate = () => {
		setError('')
		setLoading('')
		switch (Toggle) {
			case 'نقداً':
				if (isNaN(cash)) {
					setError('Please enter a valid amount number amountd')
					break
				}
				if (parseInt(cash) < 3372.8) {
					setError(`المبلغ المدخل لم يبلغ النصاب ,النصاب =3372.8دينار اردني`)
					break
				}
				SetTotal(cash / 40)
				break
			default:
				let total24 = parseInt(gold24Input)
				let total22 = (parseInt(gold22Input) * 22) / 24
				let total21 = (parseInt(gold21Input) * 21) / 24
				let total18 = (parseInt(gold18Input) * 18) / 24
				let total = total24 + total22 + total21 + total18
				console.log(total)
				if (parseInt(total) < 85) {
					setError(`عدد الغرامات لا تبلغ حد النصاب`)
					break
				} else if (isNaN(total)) {
					setError('Please enter a valid amount number amountd')
					break
				} else {
					SetTotal((total * gold24) / 40)
					break
				}
		}
	}
	return (
		<section className='Calculator'>
			<div className='imagecontainer'>
				<div className='img'>
					<img src={zakatImage} alt='zakatImage'></img>
				</div>
			</div>
			<Grid
				container
				direction='column'
				justify='center'
				alignItems='center'
				className='OutterContainer'
			>
				<Grid container direction='row' justify='center' alignItems='center'>
					<Select
						className='input'
						id='select'
						value={Toggle}
						onChange={handleChange}
					>
						<MenuItem className='input' value='نقداً'>
							نقداً
						</MenuItem>
						<MenuItem value='ذهب'>ذهب</MenuItem>
					</Select>
					<InputLabel className='label'>زكاة</InputLabel>
				</Grid>
				{Toggle === 'نقداً' ? (
					<>
						<Grid
							container
							direction='row'
							justify='center'
							alignItems='center'
						>
							<TextField
								color='primary'
								className='input'
								onChange={(e) => setCash(e.target.value)}
							/>
							<InputLabel className='label'>(دينار أردني) المبلغ</InputLabel>
						</Grid>
						<p>
							<a
								href='https://www.fxnewstoday.ae/rates/%D8%AA%D8%AD%D9%88%D9%8A%D9%84-%D8%B9%D9%85%D9%84%D8%A7%D8%AA'
								target='_blank'
								rel='noopener noreferrer nofollow'
							>
								لتحويل العملات اضغط هنا
							</a>
						</p>
						<Button
							className='btn'
							variant='contained'
							color='primary'
							size='large'
							type='button'
							onClick={() => OnCalculate()}
						>
							أحسب
						</Button>
						<h1 className='total'>
							{Total && (
								<>
									<p>مقدار الزكاة بالدينار الأردني = {Total}</p>
									{currentUser && (
										<Button
											className='btn'
											variant='contained'
											color='primary'
											size='large'
											type='button'
											onClick={() => setTotalDonation('money')}
										>
											اضف
										</Button>
									)}
								</>
							)}
						</h1>
						{error && (
							<span style={{ color: 'red', marginBottom: '2rem' }}>
								{error}
							</span>
						)}
						{loading && <span style={{ color: 'blue' }}>{loading}</span>}
					</>
				) : (
					<>
						<Grid
							container
							direction='row'
							justify='center'
							alignItems='center'
						>
							<TextField
								color='primary'
								className='input'
								onChange={(e) => setgold24Input(e.target.value)}
								value={gold24Input}
							/>
							<InputLabel className='label'>(غ) ذهب عيار 24</InputLabel>
						</Grid>
						<Grid
							container
							direction='row'
							justify='center'
							alignItems='center'
						>
							<TextField
								color='primary'
								className='input'
								onChange={(e) => setgold22Input(e.target.value)}
								value={gold22Input}
							/>
							<InputLabel className='label'> (غ)ذهب عيار 22 </InputLabel>
						</Grid>
						<Grid
							container
							direction='row'
							justify='center'
							alignItems='center'
						>
							<TextField
								color='primary'
								className='input'
								onChange={(e) => setgold21Input(e.target.value)}
								value={gold21Input}
							/>
							<InputLabel className='label'>ذهب عيار 21 (غ)</InputLabel>
						</Grid>
						<Grid
							container
							direction='row'
							justify='center'
							alignItems='center'
						>
							<TextField
								color='primary'
								className='input'
								onChange={(e) => setgold18Input(e.target.value)}
								value={gold18Input}
							/>
							<InputLabel className='label'>(غ) ذهب عيار 18</InputLabel>
						</Grid>
						<div className='goldPrices'>
							<span className='labelGold'>
								سعر ذهب(غ) 24 اليوم : {gold24} دينار أردني
							</span>
							<span className='labelGold'>
								سعر ذهب(غ) 22 اليوم : {gold22} دينار أردني
							</span>
							<span className='labelGold'>
								سعر ذهب(غ) 21 اليوم : {gold21} دينار أردني
							</span>
							<span className='labelGold'>
								سعر ذهب(غ) 18 اليوم : {gold18} دينار أردني
							</span>
						</div>
						<Button
							className='btn gold'
							variant='contained'
							color='primary'
							size='large'
							type='button'
							onClick={() => OnCalculate()}
						>
							أحسب
						</Button>
						<h1 className='total'>
							{Total && (
								<>
									<p>مقدار الزكاة بالدينار الأردني = {Total}</p>
									{currentUser && (
										<Button
											className='btn'
											variant='contained'
											color='primary'
											size='large'
											type='button'
											onClick={() => setTotalDonation('gold')}
										>
											اضف
										</Button>
									)}
								</>
							)}
						</h1>
						{error && (
							<span style={{ color: 'red', marginBottom: '2rem' }}>
								{error}
							</span>
						)}
						{loading && <span style={{ color: 'blue' }}>{loading}</span>}
					</>
				)}
			</Grid>
		</section>
	)
}

export default Calculator
