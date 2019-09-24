import React from 'react';
import './product.scss';

class Product extends React.Component<{items: any[]}> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        console.log('props :', this.props);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (!this.props.items) {
            return null;
        }
        return (
            <div className="route-product">
                {
                    this.props.items.map((item: any) => {
                        return (<div key={item.name}>{JSON.stringify(item)}</div>);
                    })
                }
            </div>
        );
    }
}

export default Product;
