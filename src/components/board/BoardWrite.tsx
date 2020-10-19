import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import './BoardWrite.scss';
import {useHistory} from 'react-router-dom';
import {searchToJson} from '../../utils';

import {
    BsTypeBold, 
    BsTypeItalic,
    BsTypeUnderline,
    BsTypeStrikethrough,
    BsListUl,
    BsListOl,
    BsTextIndentLeft,
    BsTextIndentRight,
    BsTextCenter

} from 'react-icons/bs';
import {VscTextSize} from 'react-icons/vsc';

function BoardWrite(urlParams: any){

    type titleType = {
        title: string;
        subTitle: string
    }

    const [boardTitle, setBoardTitle] = useState<titleType>({
        title: '',
        subTitle: ''
    });
    const [isUpdate, setIsUpdate] = useState(false);
    const [searchVal, setSearchVal] = useState({_id: null});
    let history = useHistory();

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);


    // 텍스트 에디터 (옵션) 로직
    const execCmd = (exec: string, value: string, event?:React.MouseEvent<HTMLLIElement, MouseEvent>) =>{

        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.addEventListener('keyup', checkCmdState);
            iframeRef.current.contentDocument.addEventListener('click', checkCmdState);
        }

        //현재 상태를 확인해야 하는 부분
        if(event){
            event.currentTarget.classList.toggle('on');
        }
        
        
        // insertHTML, insertImage, styleWithCss
        if(iframeRef.current && iframeRef.current.contentDocument){
            if(value === ''){
                iframeRef.current.contentDocument.execCommand(exec);
            }else{
                iframeRef.current.contentDocument.execCommand(exec, true, value);
            }
        }

        // 로직이 끝난 후 Textarea로 포커스 하기
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.body.focus();
        }
    }


    // 텍스트 에디터 (옵션 실시간 체크) 로직
    const checkCmdState = () =>{
        if(iframeRef.current && iframeRef.current.contentDocument){

            const document = iframeRef.current.contentDocument;

            if(optionsRef.current){
                optionsRef.current.childNodes.forEach((list: any) => {
                    if(list.dataset.cmd){
                        if(document.queryCommandState(list.dataset.cmd)){
                            list.classList.add('on');
                        }else{
                            list.classList.remove('on');
                        }
                        // console.log('list', list);
                    } 
                });
            }
        }
    }

    const fontSizeRef = useRef<HTMLUListElement>(null);

    // 텍스트 에디터 폰트사이즈 윈도우 토글
    const fontSizeToggle = () =>{
        if(fontSizeRef.current){
            fontSizeRef.current.classList.toggle('on');
        }
    }

    useEffect(()=>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.designMode = "on"
            iframeRef.current.contentDocument.body.style.fontFamily = 'NotoSansKR-Regular';
        }

        const searchVal = urlParams.location.search;
        const searchData = searchToJson(searchVal);
        setSearchVal(searchData);

        console.log('searchData', searchData);

        // 수정요청으로 들어올 경우
        if(searchData._id){
            setIsUpdate(true);
            axios({
                method: 'get',
                url: '/api/board/list',
                params: searchData
            }).then((res) =>{
                console.log('res', res.data[0]);

                setBoardTitle({
                    title: res.data[0].title,
                    subTitle: res.data[0].subTitle
                });
                if(iframeRef.current && iframeRef.current.contentDocument){
                    iframeRef.current.contentDocument.body.innerHTML = res.data[0].description;
                }
            });
        }else{
            setIsUpdate(false);
        }


        return ()=>{
            if(iframeRef.current && iframeRef.current.contentDocument){
                iframeRef.current.contentDocument.removeEventListener('keyup', checkCmdState);
                iframeRef.current.contentDocument.removeEventListener('click', checkCmdState);
            }
        }
    }, []);



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        // 데이터 전송
        const boardData = {
            _id: searchVal._id,
            title: boardTitle.title,
            subTitle: boardTitle.subTitle,
            description: iframeRef.current?.contentDocument?.body.innerHTML,
            writer: 'bkshin2'
        };

        // 데이터 전송 확인
        console.log('boardTitle', boardTitle);
        console.log('boardArticle', iframeRef.current?.contentDocument?.body.innerHTML);
        

        // 데이터 비우기
        setBoardTitle({
            title: '',
            subTitle: ''
        });
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.body.innerHTML = "";
        }


        if(isUpdate){ // 수정일 경우
            axios({
                method: 'put',
                url: '/api/board/list',
                data: boardData
            }).then((res) =>{
                console.log('put_res', res.data[0]);
                history.push('/board/view?_id=' + searchVal._id);
            });
            
        }else{ // 신규일 경우
            axios({
                method: 'post',
                url: '/api/board/list',
                data: boardData
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

    // 텍스트 에디터 만들기 시작
    // 기능 : 볼드, 폰트사이즈 10~30, 이탤릭, 삭선, 밑줄, 번호, 점, 들여쓰기(2개), 링크, 이미지 삽입, 파일 첨부

    return (
        <main className="bb-board-write__main">
            <form className="bb-board-write__form" onSubmit={onSubmit}>
                <input className="bb-board-write__title" placeholder="제목을 입력해주세요." type="text" name="title" value={boardTitle?.title} onChange={onChangeTitle}/>
                <input className="bb-board-write__title--sub" placeholder="소제목을 입력해주세요." type="text" name="subTitle" value={boardTitle?.subTitle} onChange={onChangeTitle}/>
  

                <div className="bb-board-write__editor-wrapper">
                    <ul className="bb-board-write__editor-options" ref={optionsRef}>
                        <li data-cmd="bold" onClick={(e) => execCmd('bold', '', e)}><BsTypeBold /></li>
                        <li data-cmd="italic" onClick={(e) => execCmd('italic', '', e)}><BsTypeItalic /></li>
                        <li data-cmd="underline" onClick={(e) => execCmd('underline', '', e)}><BsTypeUnderline /></li>
                        <li data-cmd="strikethrough" onClick={(e) => execCmd('strikethrough', '', e)}><BsTypeStrikethrough /></li>
                        <li data-cmd="justifycenter" onClick={(e) => execCmd('justifycenter', '', e)}><BsTextCenter /></li>
                        <li onClick={(e) => execCmd('insertunorderedlist', '')}><BsListUl /></li>
                        <li onClick={(e) => execCmd('insertorderedlist', '')}><BsListOl /></li>
                        <li onClick={(e) => execCmd('indent', '')}><BsTextIndentLeft /></li>
                        <li onClick={(e) => execCmd('outdent', '')}><BsTextIndentRight /></li>
                        <li onClick={fontSizeToggle}>
                            <VscTextSize />
                            <ul className="bb-board-write__editor-font-box" ref={fontSizeRef}>
                                <li onClick={(e) => execCmd('fontSize', '1')}>10px</li>
                                <li onClick={(e) => execCmd('fontSize', '2')}>13px</li>
                                <li onClick={(e) => execCmd('fontSize', '3')}>16px</li>
                                <li onClick={(e) => execCmd('fontSize', '4')}>18px</li>
                                <li onClick={(e) => execCmd('fontSize', '5')}>24px</li>
                                <li onClick={(e) => execCmd('fontSize', '6')}>32px</li>
                                <li onClick={(e) => execCmd('fontSize', '7')}>48px</li>
                            </ul>
                        </li>
                    </ul>
                    <iframe className="bb-board-wrtie__editor" name="boadeditrot" ref={iframeRef}></iframe>
                </div>
                



                <div className="bb-board-write__buttons">
                    <button>취소</button>
                    <button>완료</button>
                </div>
            </form>
        </main>
    )
}

export default BoardWrite;