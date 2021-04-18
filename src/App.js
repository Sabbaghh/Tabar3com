import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Charities from './pages/Charities'
import Calculator from './pages/Calculator'
import Layout from './layout/Layout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App() {
	return (
		<Router>
			<Switch>
				<Layout>
					<Route path='/' exact component={Home} />
					<Route path='/Login' component={Login} />
					<Route path='/Register' component={Register} />
					<Route path='/Charities' component={Charities} />
					<Route path='/Calculator' component={Calculator} />
				</Layout>
			</Switch>
		</Router>
	)
}

export default App
