import React from 'react';
import Routes from './routes/Routes';
import Footer from './components/footer/Footer';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import './styles/app.scss';

library.add(fas, fab);

const App: React.FC = () => {

    fetch('/product', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            'branchCode': 'ES_AR'
        })
    })
    .then((res: any) => res.json())
    .then((translations: Record<string, string>) => {
        console.log('product config :', translations);
    })
    .catch((e: any) => {
        console.log('product config request failed :', e);
    });

    fetch('/translation/ES_AR', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'GET'
    })
    .then((res: any) => res.json())
    .then((translations: Record<string, string>) => {
        console.log('translation :', translations);
    })
    .catch((e: any) => {
        console.log('translation request failed :', e);
    });

  return (
    <div className="app">
        <Routes />
        <Footer />
    </div>
  );
};

export default App;
