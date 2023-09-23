import React from 'react';
import './style.css'

const AboutUs = () => {
    return (
        <div>
            <a onClick={() => {
                window.location.reload();
            }}><span className="arrow left"></span></a>

        </div>
    );
};

export default AboutUs;