import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './footer.scss';

class Footer extends React.Component {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="footer">
                <div className="footer-row">
                    <div className="footer-col col-35">
                        <div>Humboldt 2190 &nbsp;|&nbsp; Palermo Hollywood CABA</div>
                        <div>Tel: +5411 4775 5717</div>
                        <div>Email: <a href="mailto:forma@formamuebles.com" className="footer-email">forma@formamuebles.com</a></div>
                    </div>
                    <div className="footer-col col-35">
                        <div>Gascon 206 oficina 3 &nbsp;|&nbsp; San Isidro</div>
                        <div>Tel: +5411 4700 2625</div>
                        <div>Email: <a href="mailto:gufina@formamuebles.com" className="footer-email">gufina@formamuebles.com</a></div>
                    </div>
                    <div className="footer-col col-30">
                        <ul>
                            <li>
                                <a href="mailto:forma@formamuebles.com" title="email a forma" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={["fas", "envelope"]}/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/pages/Forma/339381916213055" title="forma en facebook" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={["fab", "facebook"]}/>
                                </a>
                            </li>
                            <li>
                                <a href="http://www.pinterest.com/formamuebles/" title="forma en pinterest" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={["fab", "pinterest"]}/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/forma_muebles/?hl=es" title="forma en Instagram" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={["fab", "instagram"]}/>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/formamuebles" title="forma en twitter" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={["fab", "twitter"]}/>
                                </a>
                            </li>
                            <li>
                                <a href="https://plus.google.com/+FormaBuenosAires/posts" title="forma en google+" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={["fab", "google-plus"]}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-row copyright">
                    <div className="footer-col">
                        <p>Copyright &copy; 2014. All rights reserved</p>
                        <div className="fb-like" data-href="https://www.facebook.com/Forma.palermo" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>
                    </div>
                    <div className="footer-col logo-abbr">
                        <img className="forma-logo-abbr" src="/images/forma/forma-logo-abbr.png" width="61" alt="forma" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
