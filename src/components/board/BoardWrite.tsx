import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './BoardWrite.scss';
import {useHistory} from 'react-router-dom';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function BoardWrite(){

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
    let history = useHistory();

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
            title: boardTitle.title,
            subTitle: boardTitle.subTitle,
            description: boardArticle,
            writer: 'bkshin2'
        };

        console.log('boardData', boardData);

        axios({
            method: 'post',
            url: 'http://localhost:8001/api/board/list',
            params: boardData
        }).then((res) =>{
            console.log('res', res.data[0]);
        });


        history.push('/board');
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