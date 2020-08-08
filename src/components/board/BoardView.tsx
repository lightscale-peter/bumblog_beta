import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import './BoardView.scss';
import axios from 'axios';
import {searchToJson} from '../../utils';
import {boardListType} from './BoardHome';
import {useHistory} from 'react-router-dom';

import useModal from '../../hooks/useModal';


function BoardView(urlParams: any){

    const {onOpenModal} = useModal();

    const [listData, setListData] = useState<boardListType>({
        subTitle: '',
        title: '',
        description: '',
        writer: '',
        _id: ''
    });
    let history = useHistory();
    
    useEffect(()=>{
        console.log('useEffect');
        const searchVal = urlParams.location.search;
        const searchData = searchToJson(searchVal);
       
        axios({
            method: 'get',
            url: 'http://localhost:8001/api/board/list',
            params: searchData
        }).then((res) =>{
            // console.log('res', res.data[0]);
            setListData(res.data[0]);
        });

    }, []);


    const handleDelette = () =>{

        onOpenModal();

        
        // axios({
        //     method: 'delete',
        //     url: 'http://localhost:8001/api/board/list',
        //     params: listData
        // }).then((res) =>{
        //     console.log('deleteRes', res.data[0]);
        //     history.push('/board');
        // });
    }


    return (
        <main className="main">
            <section className="bb-board-view__hero-section">
                <div className="bb-board-view__hero-section-title-wrapper">
                    <h1>{listData?.title}</h1>
                    <div className="bb-board-view__subtitle">
                        {listData?.subTitle}
                    </div>
                </div>
            </section>
            <section className="bb-board-view__article-section">
                <article className="bb-board-view__article tui-editor-contents" dangerouslySetInnerHTML={{__html: listData.description}}></article>
                <ul className="bb-board-view__update-btns">
                    <li>
                        <button>
                            <Link to={`/board/write?_id=${listData._id === null ? '' : listData._id}`}>수정</Link>
                        </button>
                    </li>
                    <li><button onClick={handleDelette}>삭제</button></li>
                </ul>
            </section>
        </main>
    );
}

export default BoardView;