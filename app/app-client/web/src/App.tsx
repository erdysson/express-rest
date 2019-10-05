import React from 'react';
import Routes from './routes/Routes';
import Footer from './components/footer/Footer';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import './styles/app.scss';
import TranslateService from './services/Translate.service';

interface Props {

}

interface State {
    translationsLoaded: boolean;
    token: string;
}

library.add(fas, fab);

class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            translationsLoaded: false,
            token: ''
        };
    }

    getAuthToken(): Promise<string> {
        const authToken: string|null = localStorage.getItem('authToken');
        if (authToken) {
            console.log('auth token from local storage', authToken);
            return Promise.resolve(authToken);
        }
        return fetch('/login', {
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: 'erdi.gokalp@gmail.com',
                password: 'Etg1990!'
            }),
            method: 'POST'
        })
            .then((res: any) => res.json())
            .then((res: any) => {
                localStorage.setItem('authToken', res.token);
                console.log('auth token :', res.token);
                return res.token;
            })
            .catch((e: any) => {
                console.log('failed to login', e);
            });
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

    getUsers(): Promise<any[]> {
        return fetch('/users', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                email: 'erdi.gokalp@gmail.com',
                password: 'Etg1990!'
            }),
            method: 'POST'
        })
        .then((res: any) => res.json())
        .catch((e: any) => {
            console.log('failed to login', e);
        })
    }

    componentDidMount(): void {
        this.getAuthToken()
        .then((res: string) => {
            this.setState(Object.assign(this.state, {token: res}));
        });
        this.getTranslations('ES_AR')
            .then((translations: Record<string, string>) => {
                console.log('translation :', translations);
                TranslateService.init(translations);
                this.setState(Object.assign(this.state, {translationsLoaded: true}));
            });
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (this.state.token) {
            this.getUsers()
                .then((users: any[]) => console.log(users));
        }
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
