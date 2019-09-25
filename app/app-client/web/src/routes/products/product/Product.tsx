import React from 'react';
import './product.scss';
import {IItem} from '../../../../interfaces/interface';
import Item from '../../../components/product/item/Item';

interface Props {
    productType: string;
    items: IItem[];
}

class Product extends React.Component<Props> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="route-product">
                {
                    this.props.items.map((item: IItem) => <Item key={item.id} item={item} productType={this.props.productType} />)
                }
            </div>
        );
    }
}

export default Product;
