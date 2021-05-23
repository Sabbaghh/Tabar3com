import React from 'react'
import '../styles/Contact.scss'
const Contact = () => {
	return (
		<section className='ContactPage' id='CONTACT'>
			<div className='AnimatedContactSvg'>
				<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M46.9,-13.4C51.5,-1.1,39.6,18.4,22.4,31C5.2,43.5,-17.3,49.1,-26.9,41.1C-36.6,33.1,-33.5,11.6,-26.9,-3.5C-20.3,-18.5,-10.1,-27.2,5.5,-29C21.2,-30.8,42.3,-25.7,46.9,-13.4Z'
						transform='translate(100 100)'
					/>
				</svg>
				<div className='ContactUs'>
					<h1>CONTACT</h1>
					<h1>______US</h1>
				</div>
			</div>
			<form
				className='ContactForm'
				method='post'
				action='https://formspree.io/f/xbjqgnwd'
				name='contact'
			>
				<input type='text' name='_gotcha' style={{ display: 'none' }} />
				<div className='input'>
					<input
						className='inpt'
						type='text'
						placeholder='YOUR NAME'
						name='Name'
					/>
				</div>
				<div className='input'>
					<input
						className='inpt'
						type='text'
						placeholder='YOUR EMAIL'
						name='_replyto'
					/>
				</div>
				<div className='input'>
					<textarea
						className='txt'
						placeholder='SHARE YOUR THOUGHTS'
						name='MESSAGE'
					/>
				</div>
				<div className='btn'>
					<button type='submit'>SEND</button>
				</div>
			</form>
		</section>
	)
}

export default Contact
