import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './BoardView.scss';
import axios from 'axios';
import {getQueryString} from '../../utils';
import {boardListType} from './BoardHome';
import {useHistory} from 'react-router-dom';
import defaultThumbnail from '../../assets/images/board/default_thumbnail.jpg';
import {BsPencilSquare, BsTrash} from 'react-icons/bs'
import path from 'path';
import useModal from '../../hooks/useModal';

function BoardView(urlParams: any){

    const {onOpenConfirmModal, onCloseModal} = useModal();

    const [listData, setListData] = useState<boardListType>({
        _id: '',
        tags: [],
        title: '',
        description: '',
        writer: '',
        images: {
            thumbnailImage: [],
            descriptionImage: []
        }
    });

    const [thumbnailImageState, setThumbnailImageState] = useState('');
    let history = useHistory();
    
    useEffect(()=>{
        console.log('useEffect');
        const searchVal = urlParams.location.search;
        const searchData = getQueryString(searchVal);

        console.log('searchData', searchData);
       
        axios({
            method: 'get',
            url: '/api/board/list',
            params: searchData
        }).then((res) =>{
            console.log('res', res.data);
            if(res.data){
                setListData(res.data);

                const thumbnailImage = res.data.images.thumbnailImage[0];
                if(thumbnailImage){
                    setThumbnailImageState(path.resolve('./uploads', thumbnailImage.filename));
                }else{
                    setThumbnailImageState(defaultThumbnail);   
                }
                
            }
        });
    }, []);


    const handleDelete = () =>{

        onOpenConfirmModal({
            status: true,
            title: '정말 삭제하시겠습니까?',
            desc: '삭제한 데이터는 복원할 수 없습니다.',
            confirm: {
                isShow: true,
                func: () => {
                    axios({
                        method: 'delete',
                        url: '/api/board/list',
                        data: listData
                    }).then((res) =>{
                        console.log('deleteRes', res.data);
                        onCloseModal();
                        history.push('/board');
                    });
                }
            }
        });
        
    }


    return (
        <main className="bb-board-view__main">
            <section className="bb-board-view__hero-section" style={{backgroundImage: `url(${thumbnailImageState})`}}>
                <div className="bb-board-view__hero-section-title-wrapper">
                    <h1>{listData?.title}</h1>
                    <div className="bb-board-view__subtitle">
                        {/* {listData?.subTitle} */}
                    </div>
                </div>
            </section>
            <section className="bb-board-view__article-section">
                <article className="bb-board-view__article tui-editor-contents" dangerouslySetInnerHTML={{__html: listData.description}}></article>
            </section>
            <section className="bb-board-view__buttons-section">
                <ul className="bb-board-view__update-btns">
                    <li>
                        <button>
                            <Link to={`/board/write?_id=${listData._id === null ? '' : listData._id}`}>
                                <BsPencilSquare className="bb-board-view__pencil-icon" />
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button onClick={handleDelete}>
                            <BsTrash className="bb-board-view__tresh-icon" />
                        </button>
                    </li>
                </ul>
            </section>
        </main>
    );
}

export default BoardView;