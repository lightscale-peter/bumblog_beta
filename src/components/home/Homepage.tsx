import React from 'react';
import './Homepage.scss';

function Homepage(){
    return (
        <main className="main">
            <section className="bg-hp-hero">
                <div>
                    <div className="bg-hp-copy">
                        <h1>Main Title</h1>
                        <div className="bg-hp-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae quos maiores a error modi inventore vero alias, consequuntur labore rerum commodi autem placeat eligendi? Obcaecati laborum eaque temporibus reiciendis recusandae?</div>
                    </div>
                    <figure className="bg-hp-hero-img"></figure>
                </div>
            </section>
            <section className="bg-hp-grid">
                <div className="bg-hp-grid-wrapper">
                    <ul className="bg-hp-table">
                        <li className="bg-hp-list merge-row">
                            <div className="bg-hp-banner">
                                <h1>Sub Title</h1>
                                <div>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex inventore ipsum? Sapiente est laboriosam eius ratione voluptatem omnis laudantium molestias? Doloribus, ipsa. Dicta sit non suscipit architecto dignissimos rem?
                                </div>
                            </div>
                        </li>
                        <li className="bg-hp-list">
                            <h2>Sub Title</h2>
                            <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid aspernatur rerum a id rem eligendi odio, blanditiis veritatis laboriosam explicabo suscipit iste obcaecati dolorum consectetur quo consequatur deleniti cum. Vitae!
                            </div>
                        </li>
                        <li className="bg-hp-list"></li>
                        <li className="bg-hp-list"></li>
                        <li className="bg-hp-list"></li>
                    </ul>   
                </div>
            </section>
            

        </main>
    )
}

export default Homepage;