import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import './BoardWrite.scss';
import {useHistory} from 'react-router-dom';
import {searchToJson} from '../../utils';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function BoardWrite(urlParams: any){

    type titleType = {
        title: string;
        subTitle: string
    }

    const editorEl = useRef<any>(null);
    const [boardTitle, setBoardTitle] = useState<titleType>({
        title: '',
        subTitle: ''
    });
    const [boardArticle, setBoardArticle] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [searchVal, setSearchVal] = useState({_id: null});
    let history = useHistory();


    useEffect(()=>{
        const searchVal = urlParams.location.search;
        const searchData = searchToJson(searchVal);
        setSearchVal(searchData);

        console.log('searchData', searchData);

        // 수정요청으로 들어올 경우
        if(searchData._id){
            setIsUpdate(true);
            axios({
                method: 'get',
                url: 'http://localhost:8001/api/board/list',
                params: searchData
            }).then((res) =>{
                console.log('res', res.data[0]);

                setBoardTitle({
                    title: res.data[0].title,
                    subTitle: res.data[0].subTitle
                });
                setBoardArticle(res.data[0].description);
                editorEl.current.editorInst.setHtml(res.data[0].description);
            });
        }else{
            setIsUpdate(false);
        }
    }, []);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        // 데이터 보내기
        console.log('boardTitle', boardTitle);
        console.log('boardArticle', boardArticle);

        setBoardTitle({
            title: '',
            subTitle: ''
        });
        setBoardArticle('');
        editorEl.current.editorInst.setHtml('');

        const boardData = {
            _id: searchVal._id,
            title: boardTitle.title,
            subTitle: boardTitle.subTitle,
            description: boardArticle,
            writer: 'bkshin2'
        };


        if(isUpdate){ // 수정일 경우
            axios({
                method: 'put',
                url: 'http://localhost:8001/api/board/list',
                params: boardData
            }).then((res) =>{
                console.log('put_res', res.data[0]);
                history.push('/board/view?_id=' + searchVal._id);
            });
            
        }else{ // 신규일 경우
            axios({
                method: 'post',
                url: 'http://localhost:8001/api/board/list',
                params: boardData
            }).then((res) =>{
                console.log('post_res', res.data[0]);
                history.push('/board');
            });
            
        }
        
    }

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setBoardTitle({
            ...boardTitle,
            [name]: value
        })
    }
    const onChangeText = () => {
        let htmlVal = editorEl.current.editorInst.getHtml();
        setBoardArticle(htmlVal);
    }

    return (
        <main className="bb-board-write__main">
            <form className="bb-board-write__form" onSubmit={onSubmit}>
                <input className="bb-board-write__title" placeholder="제목을 입력해주세요." type="text" name="title" value={boardTitle?.title} onChange={onChangeTitle}/>
                <input className="bb-board-write__title--sub" placeholder="소제목을 입력해주세요." type="text" name="subTitle" value={boardTitle?.subTitle} onChange={onChangeTitle}/>
                <Editor
                    language="ko-KR"
                    placeholder="내용을 입력해주세요."
                    previewStyle="vertical"
                    initialEditType="wysiwyg"
                    height="500px"
                    useCommandShortcut={true}
                    ref={editorEl}
                    events={{"change": () => onChangeText()}}
                    initialValue={boardArticle}
                />
                <div className="bb-board-write__buttons">
                    <button>완료</button>
                    <button>취소</button>
                </div>
            </form>
        </main>
    )
}

export default BoardWrite;