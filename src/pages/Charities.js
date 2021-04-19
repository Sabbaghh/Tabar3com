import React, { useState } from 'react'
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
	Container,
} from '@material-ui/core'
import '../styles/Charities.scss'

const charitiesDummy = [
	{
		name: 'نوى',
		image:
			'https://scontent.famm3-3.fna.fbcdn.net/v/t1.15752-9/cp0/174819573_3840730326009079_8439408159521362367_n.png?_nc_cat=105&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeFlZyWge-jVte77Ub0MVOLUHMmhtFak_dgcyaG0VqT92HFpDTNkHeBCEp42N_iEyHbPFPFfhHGBBdWIB0sl1xuE&_nc_ohc=EHgd98AZ8GoAX_Te24U&_nc_ht=scontent.famm3-3.fna&tp=30&oh=5c87293bd9d15d23522584225f4f5107&oe=60A31E4E',
		description:
			'أولَ منظمة من نوعها في العالم العربي، كما أنها أول منظمة غير حكومية تقوم بتوفير الدعم الغذائي المستدام من خلال توزيع الطرود الغذائية إلى الأسر التي تقع تحت خط الفقر الغذائي، وتقديم الوجبات الساخنة لعابري السبيل في مقرها الرئيسي، وتوفير الإعانات الإنسانية الغذائية للفقراء والمحتاجين في الأردن. وتعتمد في ذلك على تبرعات الخيّرين المستمرة والمتزايدة لتستمر في تأمين الدعم الغذائي للأسر المنتفعة.',
	},
	{
		name: ' الصندوق الأردني الهاشمي ',
		image:
			'https://scontent.famm3-3.fna.fbcdn.net/v/t1.15752-9/174403902_397006241642316_8747771775012255161_n.png?_nc_cat=111&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeF2xPJt5tpmUAqZs5ed9UutAmILFmNvVVcCYgsWY29VV6_x8WCOsWb3ZydYdjyFvMfzSsojIKMPEBWSL8MW9xmx&_nc_ohc=6x1zuYEzzxkAX8Hpmqy&_nc_oc=AQnSLzZOU6RfRgvEq7_2dCBB8Hujuu3ChMQFYyFbCihwvvcXsqPHuJx704r64voVGLE&_nc_ht=scontent.famm3-3.fna&oh=f5a59372b475dd66a62a52957e0fee8f&oe=60A37072',
		description: `"تأسس الصندوق الأردني الهاشمي للتنمية البشرية (جهد) عام 1977 كأقدم واكبر مؤسسة غير ربحية وغير حكومية متخصصة بدعم الحقوق الانسانية و نطوير الأفراد في الاردن.


تتكون شبكتنا من مركز تطوبر مجتمعي منتشرة في جميع أنحاء البلاد، نحن نعمل لبناء مستقبل أكثر إشراقا لأولئك الذين يعيشون في ظروف عمل، والفقراء، والمجتمعات النائية. تقدم جهد الدعم المستدام التي تمكن الأفراد للعمل مع جيرانهم نحو تعزيز المجتمعات المحلية، وضمان الحصول على الموارد التي يحتاجونها لتحقيق حياة صحية ومتكاملة`,
	},
	{
		name: ' مؤسسة نهر الاردن',
		image:
			'https://scontent.famm3-1.fna.fbcdn.net/v/t1.15752-9/80534656_2384590795124250_1903672605307568128_n.png?_nc_cat=109&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeFNZSyCxyC7jyzRX1EJG7qhMrQgYUJ4hwIytCBhQniHAkMWIngT8Xa4aE-kQwB02IvphX5P1WLX1WGZ6ttcffu5&_nc_ohc=ePPKl6edKHgAX8cOuZJ&_nc_ht=scontent.famm3-1.fna&oh=8a64b690c1d34f9099e35cc1c9482081&oe=60A3FBB5',
		description: `تأسست مؤسسة نهر الأردن التي ترأسها جلالة الملكة رانيا العبدالله عام ١٩٩٥، وهي مؤسسة أردنية غير حكومية وغير ربحية
تساهم المؤسسة في الرفاه الاجتماعي والاقتصادي للمجتمع، انطلاقاً من إيمانها بأهمية التغيير الإيجابي عبر تطوير نماذج تنموية مستدامة تقوم بالتصدي للتحديات التي تؤثر على حياة الأردنيين اليومية، وذلك من خلال برامج ومبادرات تتمحور حول حماية الطفل وتمكين المجتمعات`,
	},
	{
		name: 'الكاريتاس الأردنية',
		image:
			'https://scontent.famm3-3.fna.fbcdn.net/v/t1.15752-9/175401309_281201066896342_7465530546217948940_n.png?_nc_cat=111&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeFnD4xAwDifY6gAtf6_OJ7rhnWeH8TO5EaGdZ4fxM7kRm2VgN97ynypbfMUBI3lOmPfmSpqQ2E94rGSOZkXSmpz&_nc_ohc=GFIUypHD4vUAX-7BeIw&_nc_ht=scontent.famm3-3.fna&oh=e4f463ff4854d8204822ee2897a8b442&oe=60A1ED76',
		description:
			'تساهم المؤسسة في الرفاه الاجتماعي والاقتصادي للمجتمع، انطلاقاً من إيمانها بأهمية التغيير الإيجابي عبر تطوير نماذج تنموية مستدامة تقوم بالتصدي للتحديات التي تؤثر على حياة الأردنيين اليومية، وذلك من خلال برامج ومبادرات تتمحور حول حماية الطفل وتمكين المجتمعات',
	},
]
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
	const [toggleBackDrop, setToggleBackDrop] = useState(false)
	const classes = useStyles()
	const [currentData, setCurrentData] = useState()
	return (
		<>
			<Grid container direction='row' justify='center' alignItems='center'>
				{charitiesDummy?.map((cha) => {
					return (
						<Card
							className={classes.root}
							onClick={() => {
								setToggleBackDrop(true)
								setCurrentData(cha)
							}}
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
