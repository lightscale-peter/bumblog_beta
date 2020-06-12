import React from 'react';
import './Keyword.scss';

function Keyword(){
    return (
        <main className="main">
            <section className="bg-kw-hero">
                <div>
                    <h1>Keyword</h1>
                    <div>Description</div>
                </div>
            </section>
            <section className="bg-kw-keyword">
                <div>
                    <ul className="bg-kw-tags">
                        <li className="on">프로그래밍</li>
                        <li>스마트폰</li>
                        <li>코딩</li>
                        <li>공부</li>
                        <li>아이폰</li>
                    </ul>
                </div>
                
            </section>
            <section className="bg-kw-list">
                <ul>
                    <li className="bg-kw-list-row">
                        <div className="bg-kw-list-contents">
                            <h2>Title</h2>
                            <div className="bg-kw-list-desc">
                                <div className="bg-kw-list-desc-txt">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis voluptas non nam architecto optio eaque labore velit quibusdam quam saepe aspernatur, porro dolorum, libero quis voluptatem, incidunt magni expedita asperiores!
                                </div>
                            </div>
                            <ul className="bg-kw-list-info">
                                <li>댓글0</li>
                                <li>날짜</li>
                                <li>by bkshin</li>
                            </ul>
                        </div>
                        <div>
                            <figure className="bg-kw-list-img" />
                        </div>
                    </li>
                </ul>
            </section>
        </main>
    )
}

export default Keyword;