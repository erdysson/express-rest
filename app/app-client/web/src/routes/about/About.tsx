import React from 'react';
import './about.scss';

const About: React.FC = () => {
    return (
        <div className="route-about">
            <div className="img-wrapper">
                <img src="./images/about-us.jpg" alt="about us" />
            </div>
            <div className="desc-wrapper">
                <p className="desc">
                    En Forma nos dedicamos al diseño, fabricación y comercialización de muebles de madera con presencia internacional.
                    Creemos en la sofisticación de lo simple, el valor del detalle único, en la expresión de la naturaleza de la madera y en el trabajo artesanal y personalizado.
                    Usamos en nuestros muebles materiales naturales renovables. Nos nutrimos de la naturaleza y para la naturaleza.
                    Nuestros clientes reciben atención personalizada, donde cada detalle es importante para lograr un producto de calidad.
                </p>
            </div>
        </div>
    );
};

export default About;
