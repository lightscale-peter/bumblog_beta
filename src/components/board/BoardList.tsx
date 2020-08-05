import React, { useEffect } from 'react';
import {boardListType} from './BoardHome';
import {Link} from 'react-router-dom';
import './BoardList.scss';

function BoardList({data}: {data: boardListType}){

    return (
            <li className="bb-board-list__body">
                <Link to={`/board/view?_id=${data._id}`}>
                    <div className="bb-board-list__contents-wrapper">
                        <div className="bb-board-list__article">
                            <h2 className="main-title">{data.title}</h2>
                            <div className="sub-title">{data.subTitle}</div>
                            {/* <div className="desc" dangerouslySetInnerHTML={{__html: data.description}}></div> */}
                            <ul className="info">
                                <li>댓글0</li>
                                <li>날짜</li>
                                <li>by {data.writer}</li>
                            </ul>
                        </div>
                        <div>
                            <figure className="bb-board-list__image" />
                        </div>
                    </div>
                </Link>
            </li>
        
    )
}

export default BoardList;