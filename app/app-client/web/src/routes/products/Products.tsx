import React from 'react';
import {Route, Link} from 'react-router-dom';
import Product from "./product/Product";
import './products.scss';

const Products: React.FC = (props: any) => {
    return (
        <div className="route-products">
            <div className="route-product-links-wrapper">
                <div className="route-product-link">
                    <Link to={`${props.match.url}/product1`}>Product 1</Link>
                </div>
                <div className="route-product-link">
                    <Link to={`${props.match.url}/product2`}>product 2</Link>
                </div>
                <div className="route-product-link">
                    <Link to={`${props.match.url}/product3`}>product 3</Link>
                </div>
            </div>
            <div className="route-product-content">
                <Route path={`${props.match.path}/:productId`} component={Product} />
                {/*<Route exact path={props.match.path} render={() => <h3>Please select a topic.</h3>} />*/}
            </div>
        </div>
    );
};

export default Products;
