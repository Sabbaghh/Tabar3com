import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Charities from './pages/Charities'
import Calculator from './pages/Calculator'
import Profile from './pages/Profile'
import Layout from './layout/Layout'
import { AuthProvider } from './API/authContext'
import ProfilePrivateRouter from './API/ProfilePrivateRouter'
import LoginPrivateRouter from './API/LoginPrivateRouter'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App() {
	return (
		<Router>
			<AuthProvider>
				<Switch>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Layout>
							<Route path='/' exact component={Home} />
							<Route path='/Charities' component={Charities} />
							<Route path='/Calculator' component={Calculator} />
							<ProfilePrivateRouter
								example
								path='/profile'
								component={Profile}
							/>
							<LoginPrivateRouter example path='/Login' component={Login} />
							<LoginPrivateRouter
								example
								path='/Register'
								component={Register}
							/>
						</Layout>
					</MuiPickersUtilsProvider>
				</Switch>
			</AuthProvider>
		</Router>
	)
}

export default App
