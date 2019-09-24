import React from 'react';
import {Route, Link} from 'react-router-dom';
import Product from "./product/Product";
import './products.scss';
import TranslateService from '../../services/Translate.service';

class Products extends React.Component<{match: any}, {products: any[]}> {

    constructor(props: any) {
        super(props);

        this.state = {
            products: []
        };
    }

    componentDidMount(): void {
        this.getProducts()
            .then((products: any[]) => {
                console.log('product config :', products);
                this.setState({products: products});
            });
    }

    getProducts(): Promise<any[]> {
        return fetch('/product', {
            headers: {'Content-type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({'branchCode': 'ES_AR'})
        })
            .then((res: any) => res.json())
            .then((res: any) => res.products)
            .catch((e: any) => {
                console.log('product config request failed :', e);
            });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (this.state.products.length === 0) {
            return null;
        }
        return (
            <div className="route-products">
                <div className="route-product-links-wrapper">
                    {
                        this.state.products.map((product: any) =>
                            (
                                <div className="route-product-link" key={product.title}>
                                    <Link to={`${this.props.match.url}/${product.title}`}>{TranslateService.translate(product.title)}</Link>
                                </div>
                            )
                        )
                    }
                </div>
                <div className="route-product-content">
                    <Route path={`${this.props.match.path}/:productId`}
                           render={() => <Product items={this.state.products[1].items} />}
                    />
                </div>
            </div>
        );
    }
}

export default Products;
