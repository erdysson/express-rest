import React from 'react';
import './contact.scss';

const Contact: React.FC = () => {
    return (
        <div className="route-contact">
            <div className="location-img-wrapper">
                <img className="location-img" src={'./images/forma-location.jpg'} alt={'location'} />
            </div>
            <div className="contact-wrapper">
                <div className="col contact-detail">
                    <div className="contact-title">Showroom Palermo</div>
                    <div className="contact-address-line">Humboldt 2190</div>
                    <div className="contact-address-line">Palermo Hollywood CABA </div>
                    <div className="contact-phone-number">Tel: +5411 4775 5717</div>
                    <div className="contact-opening-hours">Horario de verano de lunes a viernes de 10:30hs a 19:00hs</div>
                    <div className="contact-email">Email: forma@formamuebles.com</div>
                </div>
                <div className="col contact-detail">
                    <div className="contact-title">Showroom San Isidro</div>
                    <div className="contact-address-line">Gascon 206 oficina 3</div>
                    <div className="contact-address-line">San Isidro</div>
                    <div className="contact-phone-number">Tel: +5411 4700 2625</div>
                    <div className="contact-opening-hours">Horario de verano de lunes a viernes de 10:30hs a 19:00hs los días sábados con cita previa</div>
                    <div className="contact-email">Email: gufina@formamuebles.com</div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
