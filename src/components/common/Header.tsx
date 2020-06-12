import React, {useRef, useMemo} from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';

function Header(){

    const navRef = useRef<HTMLElement>(null);

    const toggleMenu = () =>{
        if(navRef.current){
            navRef.current.classList.toggle('on');
        }
    }

    useMemo(()=>{
        window.addEventListener('resize', ()=>{
            navRef.current?.classList.remove('on');
        });
    }, []);
    

    return (
        <nav className="bg-hd-nav" ref={navRef}>
            <div className="bg-hd-wrapper">
                <div className="bg-hd-menu-mobile-btn" onClick={toggleMenu}>--</div>
                <div><Link to="/">LOGO</Link></div>
                <ul className="bg-hd-menu desktop">
                    <li><Link to="/keyword">MENU-1</Link></li>
                    <li>MENU-2</li>
                    <li>MENU-3</li>
                    <li>MENU-4</li>
                </ul>
                <div className="bg-hd-menu-right-icon"></div>
            </div>
            <div>
                <ul className="bg-hd-menu mobile">
                    <li>MENU-1</li>
                    <li>MENU-2</li>
                    <li>MENU-3</li>
                    <li>MENU-4</li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;