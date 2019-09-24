import React from 'react';
import {Route, Link} from 'react-router-dom';
import Product from "./product/Product";
import TranslateService from '../../services/Translate.service';
import {IProduct} from '../../../interfaces/interface';
import './products.scss';

interface Props {
    match: any;
    products: IProduct[];
}

interface State {
    products: IProduct[];
    selectedProduct: IProduct | null;
}

class Products extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            products: [],
            selectedProduct: null
        };
    }

    componentDidMount(): void {
        this.getProducts()
            .then((products: IProduct[]) => {
                console.log('product config :', products);
                this.setState({products: products});
            });
    }

    getProducts(): Promise<IProduct[]> {
        return fetch('/config/product', {
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

    onProductClick(product: IProduct): void {
        this.setState({
            products: this.state.products,
            selectedProduct: product
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
                        this.state.products.map((product: IProduct) =>
                            (
                                <div className="route-product-link" key={product.name}>
                                    <Link to={`${this.props.match.url}/${product.name}`} onClick={() => this.onProductClick(product)}>{TranslateService.translate(product.title)}</Link>
                                </div>
                            )
                        )
                    }
                </div>
                <div className="route-product-content">
                    <Route path={`${this.props.match.path}/:productName`}
                           render={() => <Product items={this.state.selectedProduct ? this.state.selectedProduct.items: []} />}
                    />
                </div>
            </div>
        );
    }
}

export default Products;
