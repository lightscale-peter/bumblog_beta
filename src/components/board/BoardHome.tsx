import React, { useEffect, useState } from 'react';
import './BoardHome.scss';
import BoardList from './BoardList';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {BsPencilSquare} from 'react-icons/bs';

export type boardListType = {
    _id: string;
    tags: string[];
    title: string;
    description: string;
    writer: string;
    thumbnailImage: imageStateType[],
    descriptionImage: imageStateType[]
}

export type imageStateType = {
    originalname: string;
    filename: string;
}


function BoardHome(){

    const [boardList, setBoardList] = useState<boardListType[]>([]);
    const tagFilter = (e:React.MouseEvent<HTMLLIElement, MouseEvent>) =>{

        // 버튼 초기화
        document.querySelectorAll('.bb-board-home__tags-ul > li').forEach((list)=>{
            list.classList.remove('on');
        });

        // 버튼 표시
        e.currentTarget.classList.add('on');

        // 데이터 불러오고 => 필터 적용
        const targetTag = e.currentTarget.innerText;

        getListFromDB().then((res) => {
            if(targetTag === '모두'){
                setBoardList(res.data)
            }else{
                const filterdList = res.data.filter((list:boardListType) => list.tags.indexOf(targetTag) !== -1);
                setBoardList(filterdList);
            }
        });
    }

    const getListFromDB = () =>{
        return axios({
            method: 'get',
            url: '/api/board/list'
        });
    }

    useEffect(()=>{
        getListFromDB().then((res) =>{
            setBoardList(res.data);
        });

        window.scrollTo(0, 0);
    }, []);


    return (
        <main className="bb-board-home__main">
            <section className="bb-board-home__hero-section">
                <div>
                    <h1>Bumblog</h1>
                    <div className="bb-board-home__hero-desc">
                        생각나는 것을 기록하고 저장하는 공간
                    </div>
                </div>
            </section>
            <section className="bb-board-home__tags-section">
                <div>
                    <ul className="bb-board-home__tags-ul">
                        <li className="on" onClick={tagFilter}>모두</li>
                        <li onClick={tagFilter}>개발</li>
                        <li onClick={tagFilter}>공부</li>
                        <li onClick={tagFilter}>생각</li>
                    </ul>
                </div>
            </section>
            <section className="bb-board-home__write-button-section">
                <div className="bb-board-home__btns-wrapper">
                    <div>&nbsp;</div>
                    <div>
                        <Link className="bb-board-home__icon-wrapper" to="/board/write">
                            <BsPencilSquare className="bb-board-home__write-icon" />&nbsp;글쓰기
                        </Link>
                    </div>
                </div>
            </section>
            <section className="bb-board-home__list-section">
                <ul className="bb-board-home__list-ul-tag">
                    {boardList.map(x => <BoardList key={x._id} data={x} />)}
                </ul>
            </section>
            
        </main>
    )
}

export default BoardHome;