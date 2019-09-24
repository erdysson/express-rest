import React from 'react';
import Routes from './routes/Routes';
import Footer from './components/footer/Footer';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import './styles/app.scss';
import TranslateService from './services/Translate.service';

library.add(fas, fab);

class App extends React.Component<{}, {translationsLoaded: boolean}> {

    constructor(props: any) {
        super(props);

        this.state = {
            translationsLoaded: false
        };
    }

    getTranslations(branchCode: string): Promise<Record<string, string>> {
        return fetch(`/translation/${branchCode}`, {
            headers: {'Content-type': 'application/json'},
            method: 'GET'
        })
            .then((res: any) => res.json())
            .catch((e: any) => {
                console.log('translation request failed :', e);
            });
    }

    componentDidMount(): void {
        this.getTranslations('ES_AR')
            .then((translations: Record<string, string>) => {
                console.log('translation :', translations);
                TranslateService.init(translations);
                this.setState({translationsLoaded: true});
            });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (!this.state.translationsLoaded) {
            return null;
        }

        return (
            <div className="app">
                <Routes />
                <Footer />
            </div>
        );
    }
}

export default App;
