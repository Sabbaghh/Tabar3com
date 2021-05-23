/* eslint-disable no-useless-escape */
import React from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import '../styles/creditCard.scss'
import { Button } from '@material-ui/core'
import { Form, Field } from 'react-final-form'
import { Alert, AlertTitle } from '@material-ui/lab'

import {
	formatCreditCardNumber,
	formatCVC,
	formatExpirationDate,
} from './cardUtils'
import { ProjectFireStore } from '../API/FireBase'

export default class PaymentForm extends React.Component {
	inputs = [
		{
			name: 'number',
			lable: 'Credit card number',
			placeholder: 'xxxx-xxxx-xxxx-xxxx',
			format: formatCreditCardNumber,
			pattren: `[\d| ]{16,22}`,
		},
		{
			name: 'name',
			lable: 'Credit card name',
			placeholder: 'Mohammad nidal hussien',
		},
		{
			name: 'expiry',
			lable: 'Credit card expiry',
			placeholder: 'xx / xx',
			format: formatExpirationDate,
			pattren: `\d\d/\d\d`,
		},
		{
			name: 'cvc',
			lable: 'Credit card cvc',
			placeholder: 'xxx',
			format: formatCVC,
			pattren: `\d{3,4}`,
		},
	]
	state = {
		cvc: '',
		expiry: '',
		focus: '',
		name: '',
		number: '',
		userData: {},
		expectedMoneyDonation: this.props.donationMoney,
		expectedGoldDonation: this.props.donationGold,
		sucess: false,
	}

	getuserData = async (email) => {
		try {
			await ProjectFireStore.collection('users')
				.doc(email)
				.onSnapshot((snap) => {
					console.log(snap.data())
					this.setState({ ...this.state, userData: snap.data() })
				})
		} catch (error) {
			console.error(error)
		}
	}
	handleInputFocus = (e) => {
		this.setState({ focus: e.target.name })
	}

	handleInputChange = (e) => {
		const { name, value } = e.target

		this.setState({ [name]: value })
	}

	onSubmit = async (values) => {
		try {
			if (
				(this.state.expectedMoneyDonation < 0 ||
					!this.state.expectedMoneyDonation ||
					this.state.expectedMoneyDonation > this.props.donationMoney) &&
				(this.state.expectedGoldDonation < 0 ||
					!this.state.expectedGoldDonation ||
					this.state.expectedGoldDonation > this.props.donationGold)
			) {
				alert('please enter a valid donation number')
				return
			}
			await ProjectFireStore.collection('donations')
				.doc()
				.set({
					user: { ...this.state.userData },
					creditCard: { ...values },
					donationInformation: {
						donationByGold: this.state.expectedGoldDonation,
						donationByMoney: this.state.expectedMoneyDonation,
						date: new Date(),
						NameOfCharitie: this.props.currentName,
					},
				})
			//setDonation to zero
			let updatedDonation = await ProjectFireStore.collection('users').doc(
				this.props.currentUserEmail,
			)

			await updatedDonation.update(
				'donationMoney',
				this.props.donationMoney - this.state.expectedMoneyDonation,
			)
			await updatedDonation.update(
				'donationGold',
				this.props.donationGold - this.state.expectedGoldDonation,
			)

			this.setState({ ...this.state, sucess: true })
			setTimeout(() => {
				this.setState({ ...this.state, sucess: false })
			}, 2000)
			this.props.setTogglePayment(false)
		} catch (error) {
			console.error(error)
		}
	}
	componentDidMount() {
		this.getuserData(this.props.currentUserEmail)
	}
	render() {
		return (
			<>
				{this.state.sucess && (
					<div className='alert'>
						<Alert severity='success'>
							<AlertTitle>Success</AlertTitle>
							تمت عملية التبرع بنجاح
						</Alert>
					</div>
				)}

				<div id='PaymentForm'>
					<div>
						<Form
							onSubmit={this.onSubmit}
							render={({
								handleSubmit,
								form,
								submitting,
								pristine,
								values,
								active,
							}) => {
								return (
									<form className='creditCardForm' onSubmit={handleSubmit}>
										<Cards
											number={values.number || ''}
											name={values.name || ''}
											expiry={values.expiry || ''}
											cvc={values.cvc || ''}
											focused={active}
										/>
										{this.inputs.map(
											({ name, lable, placeholder, format, pattern }) => {
												return (
													<>
														<div>
															<span className='label'>{lable}</span>
															<Field
																name={name}
																component='input'
																type='text'
																placeholder={placeholder}
																format={format}
																className='cradInput'
																required
																pattern={pattern}
															/>
														</div>
													</>
												)
											},
										)}
										<div className='buttons'>
											<Button
												className='btn'
												variant='contained'
												color='secondary'
												size='large'
												type='button'
												onClick={() => this.props.setTogglePayment(false)}
											>
												الغاء
											</Button>
											<Button
												className='btn'
												variant='contained'
												color='primary'
												size='large'
												type='submit'
											>
												تبرع
											</Button>
										</div>
									</form>
								)
							}}
						/>
					</div>
					<div className='donation-info'>
						<h4>اسم الجمعية المراد التبرع لها : {this.props.currentName}</h4>
						<h4>
							قيمة التبرع المستحقة بالذهب:{' '}
							{this.props.donationGold
								? `${this.props.donationGold} 							دينار اردني
`
								: 'لا يوجد'}{' '}
						</h4>
						<h4>
							قيمة التبرع المستحقة بالمال:{' '}
							{this.props.expectedDonation
								? `${this.props.donationMoney} 							دينار اردني
`
								: 'لا يوجد'}{' '}
						</h4>
						<h4>
							قيمة التبرع المستحقة :{' '}
							{this.props.expectedDonation
								? `${this.props.expectedDonation} 							دينار اردني
`
								: 'لا يوجد'}{' '}
						</h4>

						<span class='label'>
							القيمة التي ترغب بالتبرع بها من قيمة المال
						</span>
						<input
							type='number'
							className='input'
							required
							value={this.state.expectedMoneyDonation}
							onChange={(e) =>
								this.setState({
									...this.state,
									expectedMoneyDonation: e.target.value,
								})
							}
						/>
						<span class='label'>
							القيمة التي ترغب بالتبرع بها من قيمة الذهب
						</span>
						<input
							type='number'
							className='input'
							required
							value={this.state.expectedGoldDonation}
							onChange={(e) =>
								this.setState({
									...this.state,
									expectedGoldDonation: e.target.value,
								})
							}
						/>
					</div>
				</div>
			</>
		)
	}
}
