import React from 'react'
import Slider from '../components/Slider'
import Container from '@material-ui/core/Container'
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
		</div>
	)
}

export default Home
