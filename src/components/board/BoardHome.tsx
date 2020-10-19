import React, { useEffect, useState } from 'react';
import './BoardHome.scss';
import BoardList from './BoardList';
import {Link} from 'react-router-dom';
import axios from 'axios';

export type boardListType = {
    _id: string;
    subTitle: string;
    title: string;
    description: string;
    writer: string;
}


function BoardHome(){

    const [boardList, setBoardList] = useState<boardListType[]>([]);

    useEffect(()=>{
        console.log('BoardHome-useEffect 실행');
        axios({
            method: 'get',
            url: '/api/board/list'
        }).then((res) =>{
            console.log('data', res.data);
            setBoardList(res.data);
        });

    }, []);


    return (
        <main className="bb-board-home__main">
            <section className="bb-board-home__hero-section">
                <div>
                    <h1>My Blog</h1>
                    <div className="bb-board-home__hero-desc">
                        생각나는 것을 기록하고 저장하는 공간
                    </div>
                </div>
            </section>
            <section className="bb-board-home__tag-section">
                <div>
                    <ul className="bb-board-home__tag-ul">
                        <li className="on">모두</li>
                        <li>프로그래밍</li>
                        <li>스마트폰</li>
                        <li>코딩</li>
                        <li>공부</li>
                        <li>아이폰</li>
                    </ul>
                </div>
            </section>
            <section>
                <div className="bb-board-home__btns-wrapper">
                    <div>&nbsp;</div>
                    <div><Link to="/board/write">- 글쓰기 -</Link></div>
                </div>
            </section>
            <section className="bb-board-home__list-section">
                <ul>
                    {boardList.map(x => <BoardList key={x._id} data={x} />)}
                </ul>
            </section>
            
        </main>
    )
}

export default BoardHome;