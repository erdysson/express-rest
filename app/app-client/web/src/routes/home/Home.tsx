import React from 'react';
import './home.scss';
import {IHome, IHomeItem} from '../../../interfaces/interface';
import {Link} from 'react-router-dom';

interface State  {
    items: IHomeItem[];
}

class Home extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount(): void {
        this.getHomeConfig()
            .then((home: IHome) => {
               console.log('home :', home);
                this.setState({
                    items: home.items
                });
            });
    }

    getHomeConfig(): Promise<IHome> {
        return fetch('/config/home', {
            headers: {'Content-type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({'branchCode': 'ES_AR'})
        })
            .then((res: any) => res.json())
            .catch((e: any) => {
                console.log('product config request failed :', e);
            });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="route-home">
                {
                    this.state.items.map((item: IHomeItem) =>
                        <Link to={`/products/${item.type}/${item.productId}/details`} key={item.productId} className="home-item-wrapper">
                            <div className="home-item" style={{backgroundImage: `url(http://localhost:8080/${item.image})`}} />
                        </Link>
                    )
                }
            </div>
        );
    }
}

export default Home;
