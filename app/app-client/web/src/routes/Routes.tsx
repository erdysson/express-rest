import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Products from './products/Products';
import './routes.scss';
import Contact from './contact/Contact';
import TranslateService from '../services/Translate.service';


class Routes extends React.Component {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="routes">
                <Router>
                    <div className="route-links">
                        <div className="logo">
                            <Link to="/">
                                <img src={'/images/forma/forma-logo.jpg'} alt={'forma'} />
                            </Link>
                        </div>
                        <div className="route-links-wrapper">
                            <div className="route-link">
                                <NavLink to="/" activeClassName="active" exact={true}>{TranslateService.translate('forma.main.nav.item.label.start')}</NavLink>
                            </div>
                            <div className="route-link">
                                <NavLink to="/about" activeClassName="active" exact={true}>{TranslateService.translate('forma.main.nav.item.label.aboutus')}</NavLink>
                            </div>
                            <div className="route-link">
                                <NavLink to="/products" activeClassName="active" exact={true}>{TranslateService.translate('forma.main.nav.item.label.products')}</NavLink>
                            </div>
                            <div className="route-link">
                                <NavLink to="/contact" activeClassName="active" exact={true}>{TranslateService.translate('forma.main.nav.item.label.contactus')}</NavLink>
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
    }
}

export default Routes;
