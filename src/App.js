import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Charities from './pages/Charities'
import Calculator from './pages/Calculator'
import Profile from './pages/Profile'
import Layout from './layout/Layout'
import { AuthProvider } from './API/authContext'
import PrivateRouter from './API/PrivateRoute'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App() {
	return (
		<Router>
			<AuthProvider>
				<Switch>
					<Layout>
						<Route path='/' exact component={Home} />
						<Route path='/Login' component={Login} />
						<Route path='/Register' component={Register} />
						<Route path='/Charities' component={Charities} />
						<Route path='/Calculator' component={Calculator} />
						<PrivateRouter example path='/profile' component={Profile} />
					</Layout>
				</Switch>
			</AuthProvider>
		</Router>
	)
}

export default App
