import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Products from './products/Products';
import './routes.scss';
import Contact from './contact/Contact';

const Routes: React.FC = () => {
    return (
        <div className="routes">
            <Router>
                <div className="route-links">
                    <div className="logo">
                        <Link to="/">
                            <img src={'./images/forma-logo.jpg'} alt={'forma'} />
                        </Link>
                    </div>
                    <div className="route-links-wrapper">
                        <div className="route-link">
                            <NavLink to="/" activeClassName="active" exact={true}>Home</NavLink>
                        </div>
                        <div className="route-link">
                            <NavLink to="/about" activeClassName="active" exact={true}>About us</NavLink>
                        </div>
                        <div className="route-link">
                            <NavLink to="/products" activeClassName="active" exact={true}>Products</NavLink>
                        </div>
                        <div className="route-link">
                            <NavLink to="/contact" activeClassName="active" exact={true}>Contact</NavLink>
                        </div>
                    </div>
                </div>
                <div className="route-content">
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/products" component={Products} />
                    <Route path="/contact" component={Contact} />
                </div>
            </Router>
        </div>
    );
};

export default Routes;
