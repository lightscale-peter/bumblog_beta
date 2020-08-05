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
            url: 'http://localhost:8001/api/board/list'
        }).then((res) =>{
            console.log('data', res.data);
            setBoardList(res.data);
        });

    }, []);


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
            <section>
                <div className="bg-kw-btm-btns">
                    <div>&nbsp;</div>
                    <div><Link to="/board/write">- 글쓰기 -</Link></div>
                </div>
            </section>
            <section className="bg-kw-list">
                <ul>
                    {boardList.map(x => <BoardList key={x._id} data={x} />)}
                </ul>
            </section>
            
        </main>
    )
}

export default BoardHome;