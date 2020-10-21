import React, { useRef, useState, useEffect, createElement } from 'react';
import axios from 'axios';

import './BoardWrite.scss';
import path from 'path';
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
    BsTextCenter,
    BsX

} from 'react-icons/bs';
import {VscTextSize} from 'react-icons/vsc';
import { getAllJSDocTagsOfKind } from 'typescript';

function BoardWrite(urlParams: any){

    const [boardTitle, setBoardTitle] = useState('')
    const [tags, setTags] = useState<string[]>([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [searchVal, setSearchVal] = useState({_id: ''});

    const [tempThumbImg, setTempThumbImg] = useState('');

    const [thumbImg, setThumbImg] = useState<File | null>(null); 
    const [descImg, setDescImg] = useState<File[] | null>(null);

    let history = useHistory();

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);
    const thumbImageDom = useRef<HTMLInputElement>(null);


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

        // console.log('searchData', searchData);

        // 수정요청으로 들어올 경우
        if(searchData._id){
            setIsUpdate(true);
            axios({
                method: 'get',
                url: '/api/board/list',
                params: searchData
            }).then((res) =>{
                console.log('res', res.data[0]);

                setBoardTitle(res.data[0].title);

                setTags(res.data[0].tags);
                initTags(res.data[0].tags);

                if(res.data[0].images.thumbnail.length > 0){
                    setTempThumbImg(path.resolve('./uploads', res.data[0].images.thumbnail[0].filename));
                }

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
            title: boardTitle,
            tags: tags,
            description: iframeRef.current?.contentDocument?.body.innerHTML,
            writer: '신범근',
            images: {
                thumbnail: thumbImg,
                description: descImg
            }
        };

        // 데이터 전송 확인
        console.log('boardTitle', boardTitle);
        console.log('boardArticle', iframeRef.current?.contentDocument?.body.innerHTML);
        

        // 데이터 비우기
        setBoardTitle('');
        setThumbImg(null);
        setDescImg(null);
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

            const form = new FormData();
            form.append('title', boardData.title);
            form.append('tags', boardData.tags.toString());
            form.append('description', boardData.description ? boardData.description : '');
            form.append('writer', boardData.writer);

            if(thumbImg){
                form.append('thumbImg', thumbImg);
            }
            if(descImg){
                descImg.forEach(file => {
                    form.append('descImg', file);        
                })
            }

            axios({
                headers: {'Content-Type': 'multipart/form-data'},
                method: 'post',
                url: '/api/board/list',
                data: form
            }).then((res) =>{
                console.log('post_res', res.data[0]);
                history.push('/board');
            });
            
        }
        
    }

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setBoardTitle(value);
    }

    const onSetTags = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>) =>{

        const classList = e.currentTarget.classList;
        const innerText = e.currentTarget.innerText;

        if(classList.contains('on')){
            // 버튼 OFF
            classList.remove('on');
            if(tags.indexOf(innerText) !== -1){ // 해당 태그가 있을 경우 => 뺸다
                setTags(tags.filter(tag => tag !== innerText));
            }
        }else{
            // 버튼 ON
            classList.add('on');
            if(tags.indexOf(innerText) === -1){ // 해당 태그가 없을 경우 => 더한다
                setTags(tags.concat(innerText));
            }
        }
    }

    const initTags = (initTags:string[]) =>{
        document.querySelectorAll('.bb-board-write__tags-wrapper > span').forEach(span =>{
            initTags.forEach(tag =>{
                if(tag === span.innerHTML){
                    span.classList.add('on');
                }
            })
        })
    }

    const onThumbImage = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if(e.currentTarget.files){

            const thumbnail = e.currentTarget.files[0];

            // console.log('thumbnail', thumbnail);

            const reader = new FileReader();
            reader.onload = function(e){
                // console.log('src', e.target?.result);
                if(e.target?.result){
                    setTempThumbImg(e.target.result.toString());
                }
                
            }
            if(thumbnail){
                reader.readAsDataURL(thumbnail);
                setThumbImg(thumbnail);

                if(checkImageType(thumbnail.type)){
                    console.log('이미지 파일');
                }else{
                    alert('jpeg, png, jpg 파일만 허용됨');
                    e.currentTarget.value = "";
                    setThumbImg(null);
                }   
            }
            

            // console.log('e', e.currentTarget.files[0]);
        }
    }

    const checkImageType = (image: string) =>{
        const types = ['image/jpeg', 'image/png', 'image/jpg'];
        if(types.indexOf(image) === -1){
            return false;
        }else{
            return true;
        }
    }

    const cancelThumbImage = () =>{
        setTempThumbImg('');
        setThumbImg(null);      
    }

    return (
        <main className="bb-board-write__main">
            <form className="bb-board-write__form" onSubmit={onSubmit}>
                <input className="bb-board-write__title" placeholder="제목을 입력해주세요." type="text" name="title" value={boardTitle} onChange={onChangeTitle}/>
                {/* <input className="bb-board-write__title--sub" placeholder="소제목을 입력해주세요." type="text" name="subTitle" value={boardTitle?.subTitle} onChange={onChangeTitle}/> */}
                <div className="bb-board-write__tags-wrapper">
                    <span onClick={onSetTags}>개발</span>
                    <span onClick={onSetTags}>공부</span>
                    <span onClick={onSetTags}>생각</span>
                </div>
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
                <div className={`bb-board-write__image-tiles ${tempThumbImg !== '' && 'on'}`}>
                    <span style={{backgroundImage: `url(${tempThumbImg})`}} onClick={cancelThumbImage}><BsX /></span>
                </div>
                <div className="bb-board-write__image-upload-btn">
                    <input type="file" ref={thumbImageDom} onChange={onThumbImage} />
                    <button type="button" onClick={()=> thumbImageDom.current?.click()}>이미지 업로드</button>
                </div>
                <div className="bb-board-write__buttons">
                    <button type="button" onClick={() => history.push('/board')}>취소</button>
                    <button type="submit">완료</button>
                </div>
            </form>
        </main>
    )
}

export default BoardWrite;