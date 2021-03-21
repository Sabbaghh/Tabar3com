import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './layout/Layout'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
function App() {
	return (
		<Router>
			<Switch>
				<Layout>
					<Route path='/' exact component={Home} />
					<Route path='/Login' component={Login} />
					<Route path='/Register' component={Register} />
				</Layout>
			</Switch>
		</Router>
	)
}

export default App
