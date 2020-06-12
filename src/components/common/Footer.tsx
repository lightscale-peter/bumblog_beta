import React from 'react';
import './Footer.scss';

function Footer(){
    return (
        <footer className="footer">
            <div className="bg-ft">
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eos repudiandae, porro voluptas, quidem excepturi quo soluta officia odit, alias quod minima autem deleniti laboriosam labore quaerat cum consectetur? Sequi!</div>
                <div className="bg-ft-row-2">
                    <div className="bg-ft-copyright">
                        <div>Copyright © 2020 Bumlog Inc. All rights reserved</div>
                        <ul>
                            <li>menu-1</li>
                            <li>menu-2</li>
                            <li>menu-3</li>
                            <li>menu-4</li>
                        </ul>
                    </div>
                    <div>logo</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;