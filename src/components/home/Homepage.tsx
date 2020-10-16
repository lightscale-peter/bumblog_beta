import React from 'react';
import {BiChevronRight} from 'react-icons/bi';
import './Homepage.scss';
import {Link} from 'react-router-dom';

function Homepage(){
    return (
        <main className="bg-hp-main">
            <section>
                <div className="bg-hp-hero">
                    <div className="bg-hp-copy-wrapper">
                        <div className="bg-hp-copy">
                            <h1>BeomGeun&nbsp;Shin</h1>
                            <div className="text-medium text-grey">Front-End Developer</div>
                            <div className="bg-hp-desc">
                                <Link className="link" to="/board">이력서 보기<BiChevronRight className="icon-chevronright" /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-hp-hero-img-wrapper">
                        <figure className="bg-hp-hero-img"></figure>
                    </div>
                </div>
            </section>
            <section className="bg-hp-grid">
                <div className="bg-hp-grid-wrapper">
                    <ul className="bg-hp-table">
                        <li className="bg-hp-list merge-row bb-homme__site-intro">
                            <div className="bg-hp-banner">
                                <h1>사이트 소개</h1>
                                <div>
                                    본 사이트는 React, Redux, express, RESTful API, mongodb로 이루어져&nbsp;있습니다.
                                </div>
                            </div>
                        </li>
                        <li className="bg-hp-list">
                            <h2>이력서</h2>
                            <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid aspernatur rerum a id rem eligendi odio, blanditiis veritatis laboriosam explicabo suscipit iste obcaecati dolorum consectetur quo consequatur deleniti cum. Vitae!
                            </div>
                        </li>
                        <li className="bg-hp-list">
                            <h2>자기소개서</h2>
                            <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid aspernatur rerum a id rem eligendi odio, blanditiis veritatis laboriosam explicabo suscipit iste obcaecati dolorum consectetur quo consequatur deleniti cum. Vitae!
                            </div>
                        </li>
                        <li className="bg-hp-list">
                            <h2>경력기술서</h2>
                            <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid aspernatur rerum a id rem eligendi odio, blanditiis veritatis laboriosam explicabo suscipit iste obcaecati dolorum consectetur quo consequatur deleniti cum. Vitae!
                            </div>
                        </li>
                    </ul>   
                </div>
            </section>
        </main>
    )
}

export default Homepage;