import React from 'react';
import {boardListType} from './BoardHome';
import {Link} from 'react-router-dom';
import './BoardList.scss';

function BoardList({data}: {data: boardListType}){
    return (
            <li className="bg-kw-list-row">
                <Link to={`/board/view?_id=${data._id}`}>
                    <div className="bg-kw-list-row-wrapper">
                        <div className="bg-kw-list-contents">
                            <h2>{data.title}</h2>
                            <div className="bg-kw-list-desc">
                                <div className="bg-kw-list-desc-txt">
                                    {data.description}
                                </div>
                            </div>
                            <ul className="bg-kw-list-info">
                                <li>댓글0</li>
                                <li>날짜</li>
                                <li>by {data.writer}</li>
                            </ul>
                        </div>
                        <div>
                            <figure className="bg-kw-list-img" />
                        </div>
                    </div>
                </Link>
            </li>
        
    )
}

export default BoardList;