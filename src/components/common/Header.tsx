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
        <nav className="bb-header__nav" ref={navRef}>
            <div className="bb-header__menu--desktop">
                <div className="bb-header__menu-toggle" onClick={toggleMenu}>--</div>
                <div><Link to="/">LOGO</Link></div>
                <ul className="bb-header__menu-detail--desktop">
                    <li><Link to="/board">MENU-1</Link></li>
                    <li>MENU-2</li>
                    <li>MENU-3</li>
                    <li>MENU-4</li>
                </ul>
                <div className="bb-header__icons--mobile"></div>
            </div>
            <div className="bb-header__menu--mobile">
                <ul className="bb-header__menu-detail--mobile">
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