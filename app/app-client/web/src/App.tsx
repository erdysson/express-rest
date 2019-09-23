import React from 'react';
import Routes from './routes/Routes';
import Footer from './components/footer/Footer';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import './styles/app.scss';

library.add(fas, fab);

const App: React.FC = () => {
  return (
    <div className="app">
        <Routes />
        <Footer />
    </div>
  );
};

export default App;
