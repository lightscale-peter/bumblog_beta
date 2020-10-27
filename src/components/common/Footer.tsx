import React from 'react';
import './Footer.scss';

function Footer(){
    return (
        <footer className="bb-common__footer">
            <div className="bb-common__footer-contents-wrapper">
                <div className="bb-common__footer-copyright">
                    <div>Copyright © 2020 Bumblog Inc. All rights reserved</div>
                </div>
                <div className="text-bold">Bumblog</div>
            </div>
        </footer>
    )
}

export default Footer;