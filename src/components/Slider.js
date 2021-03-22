import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Container from '@material-ui/core/Container'
import Img1 from '../images/slider-1.jpg'
import Img2 from '../images/slider-2.jpg'
import Img3 from '../images/slider-3.jpg'
import '../styles/slider.scss'

const SliderSlick = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		arrows: true,
	}
	return (
		<Slider {...settings} className='slider'>
			<Container fixed className='img-slider-container'>
				<img className='slider-img' src={Img1} alt='slider-1' />
			</Container>
			<Container fixed className='img-slider-container'>
				<img className='slider-img' src={Img2} alt='slider-2' />
			</Container>
			<Container fixed className='img-slider-container'>
				<img className='slider-img' src={Img3} alt='slider-3' />
			</Container>
		</Slider>
	)
}

export default SliderSlick
