import React  from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Spinner from "react-spinkit";
import { Nav, NavItem, NavLink , Container, Row, Col} from 'reactstrap';
import './App.scss';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Loader de Components
const loading = () => 
<div className="container d-flex justify-content-center" style={{height:"100vh"}}>
    <div className="my-auto">
        <Spinner className="text-center text-info" name="ball-scale-multiple" color=""></Spinner>
    </div>
</div>

// Componentes
const Home = Loadable({
    loader: () => import('./components/Home'),
    loading
});

const Details = Loadable({
    loader: () => import('./components/Details'),
    loading
});

const Favorites = Loadable({
    loader: () => import('./components/Favorites'),
    loading
});

class App extends React.Component {

	render(){
		
		return (
		<Provider store={store}>
			<Container>
			
			<Row>
				<Col xs="12">
					<div className="p-3 mb-2 bg-gray-100 text-black border border-info rounded">
						<Nav pills>
							<NavItem>
								<NavLink href="/#/" >Inicio</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/#/Favorites" >Favoritos</NavLink>
							</NavItem>
						</Nav>
					</div>
				</Col>
			</Row>
			<HashRouter>
				<Switch>
					<Route exact path="/" name="Home" 
					render={(props) => {
						return(
							<Home
								{...props} 
								
							></Home>
						)
					}} />
					
					<Route exact path="/Details" name="Details" component={Details} />
					<Route exact path="/Favorites" name="Favorites" component={Favorites} />
					
				</Switch>
		</HashRouter>
		</Container>
		</Provider>
	 );
				}
}

export default App;
