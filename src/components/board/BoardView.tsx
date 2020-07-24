import React, { useEffect, useState } from 'react';
import './BoardView.scss';
import axios from 'axios';
import {searchToJson} from '../../utils';
import {boardListType} from './BoardHome';

function BoardView(urlParams: any){


    const [listData, setListData] = useState<boardListType>();

    useEffect(()=>{
        console.log('useEffect');
        const searchVal = urlParams.location.search;
        const searchData = searchToJson(searchVal);
        
        axios({
            method: 'get',
            url: 'http://localhost:8001/api/board/findOneList',
            params: searchData
        }).then((res) =>{
            console.log('res', res.data[0]);
            setListData(res.data[0]);
        });

    }, []);


    return (
        <main className="main">
            <section className="bg-kw-vw-hero">
                <div className="bg-kw-vw-hero-article">
                    <h1>{listData?.title}</h1>
                    <div className="bg-kw-vw-hero-article-cont">
                        {listData?.subTitle}
                    </div>
                </div>
            </section>
            <section className="bg-kw-vw-article">
                <article className="bg-kw-vw-article-cont">
                {listData?.description}
                </article>
            </section>
        </main>
    );
}

export default BoardView;