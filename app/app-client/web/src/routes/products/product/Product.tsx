import React from 'react';
import './product.scss';

const Product: React.FC = (props: any) => {
    return (
        <div className="route-product">{props.match.params.productId}</div>
    );
};

export default Product;
