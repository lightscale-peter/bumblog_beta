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
    images: {
        thumbnail: {
            originalname: string;
            filename: string;
        }[],
        description: {
            originalname: string;
            filename: string;
        }[]
    }
}


function BoardHome(){

    const [boardList, setBoardList] = useState<boardListType[]>([]);
    const tagFilter = (e:React.MouseEvent<HTMLLIElement, MouseEvent>) =>{

        // 버튼 초기화
        document.querySelectorAll('.bb-board-home__tag-ul > li').forEach((list)=>{
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
        // console.log('BoardHome-useEffect 실행');
        getListFromDB().then((res) =>{
            // console.log('data', res.data);
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
                        <li className="on" onClick={tagFilter}>모두</li>
                        <li onClick={tagFilter}>개발</li>
                        <li onClick={tagFilter}>공부</li>
                        <li onClick={tagFilter}>생각</li>
                    </ul>
                </div>
            </section>
            <section>
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
                <ul>
                    {boardList.map(x => <BoardList key={x._id} data={x} />)}
                </ul>
            </section>
            
        </main>
    )
}

export default BoardHome;