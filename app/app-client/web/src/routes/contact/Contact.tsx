import React from 'react';
import './contact.scss';
import TranslateService from '../../services/Translate.service';

const Contact: React.FC = () => {
    return (
        <div className="route-contact">
            <div className="location-img-wrapper">
                <img className="location-img" src={'/images/forma/forma-location.jpg'} alt="location" />
            </div>
            <div className="contact-wrapper">
                <div className="col contact-detail">
                    <div className="contact-title">{TranslateService.translate('forma.showroom.main')}</div>
                    <div className="contact-address-line">{TranslateService.translate('forma.showroom.main.address')}</div>
                    <div className="contact-phone-number">{TranslateService.translate('forma.commons.label.phone')}&nbsp;{TranslateService.translate('forma.showroom.mainoffice.phone')}</div>
                    <div className="contact-opening-hours">{TranslateService.translate('forma.showroom.mainoffice.workinghours')}</div>
                    <div className="contact-email">{TranslateService.translate('forma.commons.label.email')}&nbsp;forma@formamuebles.com</div>
                </div>
                <div className="col contact-detail">
                    <div className="contact-title">Showroom San Isidro</div>
                    <div className="contact-address-line">Gascon 206 oficina 3 <br />San Isidro</div>
                    <div className="contact-phone-number">Tel: +5411 4700 2625</div>
                    <div className="contact-opening-hours">{TranslateService.translate('forma.showroom.mainoffice.workinghours')}</div>
                    <div className="contact-email">{TranslateService.translate('forma.commons.label.email')}gufina@formamuebles.com</div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
