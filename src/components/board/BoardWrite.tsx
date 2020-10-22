import React, { useRef, useState, useEffect, createElement } from 'react';
import axios from 'axios';

import './BoardWrite.scss';
import path from 'path';
import {useHistory} from 'react-router-dom';
import {getQueryString} from '../../utils';

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
    BsX,
    BsCardImage

} from 'react-icons/bs';
import {VscTextSize} from 'react-icons/vsc';
import { boardListType } from './BoardHome';
import { isJsxFragment } from 'typescript';

function BoardWrite(urlParams: any){

    const [titleState, setTitleState] = useState('')
    const [tagsState, setTagsState] = useState<string[]>([]);
    const [idState, setIdState] = useState('');

    const [tempThumbnailImagePathState, setTempThumbnailImagePathState] = useState('');
    const [thumbnailImageFileState, setThumbnailImageFileState] = useState<File | null>(null); 
    const [thumbnailImageNamesFromDBState, setThumbnailImageNamesFromDBState] = useState<imageNameType[]>([]);
    const [descriptionImageFilesState, setDescriptionImageFilesState] = useState<(File | null)[] | null>(null);
    const [descriptionImageNamesFromDBState, setDescriptionImageNamesFromDBState] = useState<imageNameType[]>([]);

    type imageNameType = {
        originalname: string;
        filename: string;
    }

    let history = useHistory();

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);
    const thumbImageDom = useRef<HTMLInputElement>(null);


    const addEventOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.addEventListener('keyup', checkOptionsOfTextEditor);
            iframeRef.current.contentDocument.addEventListener('click', checkOptionsOfTextEditor);
        }
    }

    const toggleButtonStatus = (event:React.MouseEvent<HTMLLIElement, MouseEvent> | undefined) =>{
        if(event){
            event.currentTarget.classList.toggle('on');
        }
    }

    const applyOptionOnTextEditor = (exec: string, value: string) =>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            if(value === ''){
                iframeRef.current.contentDocument.execCommand(exec);
            }else{
                iframeRef.current.contentDocument.execCommand(exec, true, value);
            }
        }
    }

    const focusOnTextEditor = ()=>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.body.focus();
        }
    }

    // 텍스트 에디터 (옵션) 로직
    const sendOptionToTextEditor = (exec: string, value: string, event?:React.MouseEvent<HTMLLIElement, MouseEvent>) =>{

        
        toggleButtonStatus(event);
        applyOptionOnTextEditor(exec, value);
        focusOnTextEditor();
    }


    // 텍스트 에디터 (옵션 실시간 체크) 로직
    const checkOptionsOfTextEditor = (e: KeyboardEvent | MouseEvent & {key?: string}) =>{

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
                    } 
                });
            }
        }

        if(e.type === "keyup"){
            if(e.key === "Backspace"){
                // console.log('백스페이스 눌렀다.', iframeRef.current?.contentDocument?.body.innerHTML); 
                console.log('백스페이스 눌렀다.');

                if(inputTagCount > 0){
                    for(let i=1; i<=inputTagCount; i++){

                        // console.log(`이미지 검사 ${i}`)
    
                        if(iframeRef.current?.contentDocument?.body.innerHTML.indexOf(`decriptionImageImg-${i}`) !== -1){
                            // console.log('이미지가 있다.!!')
                        }else{
                            // console.log('이미지가 없다.!!')
        
                            if(document.querySelectorAll<HTMLInputElement>(`.decriptionImageInput-${i}`))
                            document.querySelectorAll<HTMLInputElement>(`.decriptionImageInput-${i}`)[0].value = "";

                            if(descriptionImageFilesState && descriptionImageFilesState.length > 0){
                                console.log('이거다이거다', descriptionImageFilesState.map((file, index) => {
                                    if(index+1 === i){
                                        return null;
                                    }else{
                                        return file;
                                    }
                                    
                                }))
                                setDescriptionImageFilesState(descriptionImageFilesState.map((file, index) => {
                                    if(index+1 === i){
                                        return null;
                                    }else{
                                        return file;
                                    }
                                    
                                }))
                            }
                            
                        }
                    }
                }
                
            }
        }
        
       
    }

    const fontSizeRef = useRef<HTMLUListElement>(null);

    // 텍스트 에디터 폰트사이즈 윈도우 토글
    const toggleFontSizeWindow = () =>{
        if(fontSizeRef.current){
            fontSizeRef.current.classList.toggle('on');
        }
    }

    const setTextOnTextEditor = (text: string) =>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.body.innerHTML = text;
        }
    }

    const setDefaultOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.designMode = "on"
            iframeRef.current.contentDocument.body.style.fontFamily = 'NotoSansKR-Regular';
        }
    }

    const setContentsOnPage = (id:string) =>{
        axios({
            method: 'get',
            url: '/api/board/list',
            params: {
                _id: id
            }
        }).then((res: {data: boardListType[]}) =>{
            console.log('res', res.data[0]);

            setTitleState(res.data[0].title);
            setTagsState(res.data[0].tags[0] === '' ? [] : res.data[0].tags);
            setThumbnailImageNamesFromDBState(res.data[0].images.thumbnail);
            setDescriptionImageNamesFromDBState(res.data[0].images.description);

            setTagsOnViewFromData(res.data[0].tags);

            if(res.data[0].images.thumbnail.length > 0){
                setTempThumbnailImagePathState(path.resolve('./uploads', res.data[0].images.thumbnail[0].filename));
            }

            setTextOnTextEditor(res.data[0].description);
        });
    }

    useEffect(()=>{

        addEventOnTextEditor();
        setDefaultOnTextEditor();

        const queryString = getQueryString(urlParams.location.search);
        
        // 수정요청으로 들어올 경우
        if(queryString._id){
            setIdState(queryString._id);
            setContentsOnPage(queryString._id);
        }

        return ()=>{
            removeEventOnTextEditor();
        }
    }, []);

    const removeEventOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.removeEventListener('keyup', checkOptionsOfTextEditor);
            iframeRef.current.contentDocument.removeEventListener('click', checkOptionsOfTextEditor);
        }
    }


    const clearTextOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.body.innerHTML = "";
        }
    }

    const setFormData = (idState: string) =>{
        const form = new FormData();

        form.append('title', titleState);
        form.append('tags', tagsState.toString());
        form.append('description', iframeRef.current?.contentDocument?.body.innerHTML ? iframeRef.current?.contentDocument?.body.innerHTML : '');
        form.append('writer', '신범근');

        if(idState == ''){ // 신규 등록

            if(thumbnailImageFileState){ // 썸네일 이미지가 있을때
                form.append('thumbnail', thumbnailImageFileState);
            }

            if(descriptionImageFilesState){ // 본문 이미지가 있을때
                descriptionImageFilesState.forEach(file =>{
                    if(file){
                        form.append('description', file);
                    }
                })
            }           

        }else{ // 수정 등록
            form.append('_id', idState);

            if(thumbnailImageFileState){ // 이미지를 추가, 변경할때
                form.append('thumbnail', thumbnailImageFileState);
            }else{ //  이미지를 유지할 때 x => x '[]' , o => o '[blabla]', 이미지를 삭제할때
                form.append('thumbnailImage', JSON.stringify(thumbnailImageNamesFromDBState));
            }
        }

        return form;
    }


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const form = setFormData(idState);
      
        if(idState === ''){ // 신규 등록
            
            axios({
                headers: {'Content-Type': 'multipart/form-data'},
                method: 'post',
                url: '/api/board/list',
                data: form
            }).then((res) =>{
                console.log('post_res', res.data[0]);
                history.push('/board');
            });

        }else{ // 수정 등록
  
            axios({
                headers: {'Content-Type': 'multipart/form-data'},
                method: 'put',
                url: '/api/board/list',
                data: form
            }).then((res) =>{
                console.log('put_res', res.data[0]);
                history.push('/board/view?_id=' + idState);
            });
        }


        // 데이터 비우기
        setTitleState('');
        setThumbnailImageFileState(null);
        setThumbnailImageNamesFromDBState([]);
        setDescriptionImageFilesState(null);
        setDescriptionImageNamesFromDBState([]);

        clearTextOnTextEditor();
        
    }

    const setTitleForOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setTitleState(value);
    }

    const setTagsData = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>) =>{

        const classList = e.currentTarget.classList;
        const innerText = e.currentTarget.innerText;

        if(classList.contains('on')){
            // 버튼 OFF
            classList.remove('on');
            if(tagsState.indexOf(innerText) !== -1){ // 해당 태그가 있을 경우 => 뺸다
                setTagsState(tagsState.filter(tag => tag !== innerText));
            }
        }else{
            // 버튼 ON
            classList.add('on');
            if(tagsState.indexOf(innerText) === -1){ // 해당 태그가 없을 경우 => 더한다
                setTagsState(tagsState.concat(innerText));
            }
        }
    }

    const setTagsOnViewFromData = (initTags:string[]) =>{
        document.querySelectorAll('.bb-board-write__tags-wrapper > span').forEach(span =>{
            initTags.forEach(tag =>{
                if(tag === span.innerHTML){
                    span.classList.add('on');
                }
            })
        })
    }

    const setThumbnailImageFile = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if(e.currentTarget.files){

            const thumbImageFile = e.currentTarget.files[0];

            if(thumbImageFile){
                if(verifyImageType(thumbImageFile.type) === false){
                    alert('jpeg, png, jpg 파일만 허용됨');
                    e.currentTarget.value = ""; // Input File 초기화
                    setThumbnailImageFileState(null); // State 초기화
                }else{
                    setTempThumbnailImageOnView(thumbImageFile);
                    setThumbnailImageFileState(thumbImageFile);
                }
            }
        }
    }


    const setTempThumbnailImageOnView = (thumbImageFile: File) =>{
        const reader = new FileReader();
        reader.onload = function(e){
            if(e.target?.result){
                setTempThumbnailImagePathState(e.target.result.toString());
            }
        }
        reader.readAsDataURL(thumbImageFile);
    }

    const verifyImageType = (image: string) =>{
        const types = ['image/jpeg', 'image/png', 'image/jpg'];
        if(types.indexOf(image) === -1){
            return false;
        }else{
            return true;
        }
    }

    const removeThumbnailImage = () =>{
        setTempThumbnailImagePathState('');
        setThumbnailImageNamesFromDBState([]);
        setThumbnailImageFileState(null);      
    }

    const [inputTagCount, setInputTagCount] = useState(0);




    const openFileInput = ()=>{

        setInputTagCount(inputTagCount + 1);
        setTimeout(()=>{
            document.querySelector<HTMLInputElement>(`.decriptionImageInput-${inputTagCount+1}`)?.click();
        }, 10)
        


        // iframeRef.current?.contentDocument?.write("<img width='100%' height='300px'/>");
    }

    const setDescriptionImageFile = (e: React.ChangeEvent<HTMLInputElement>) =>{

        console.log('e', e);

        if(e.currentTarget.files){
            const descriptionImageFile = e.currentTarget.files[0];

            if(descriptionImageFile){
                if(verifyImageType(descriptionImageFile.type) === false){
                    alert('jpeg, png, jpg 파일만 허용됨');
                    if(inputTagCount !== 0){
                        setInputTagCount(inputTagCount-1);
                    }
                    e.currentTarget.value = ""; // Input File 초기화
                }else{
                    setTempDescriptImageOnTextEditor(descriptionImageFile);

                    if(descriptionImageFilesState === null){
                        setDescriptionImageFilesState([descriptionImageFile]);
                    }else{
                        setDescriptionImageFilesState(descriptionImageFilesState.concat(descriptionImageFile));
                    }
                }   
            }

        }
    
    }

    const setTempDescriptImageOnTextEditor = (descriptionImageFile: File)=>{
        const reader = new FileReader();
        reader.onload = function(e){
            if(e.target?.result){
                const imageTag = `<img width='100%' height='200px' name="testName" src="${e.target.result.toString()}" class=".decriptionImageImg-${inputTagCount}" />`;
                iframeRef.current?.contentDocument?.execCommand('InsertHTML', false, imageTag);
            }
        }
        reader.readAsDataURL(descriptionImageFile);
    }



    return (
        <main className="bb-board-write__main">
            <form className="bb-board-write__form" onSubmit={onSubmit}>

                {[...Array(inputTagCount)].map((v, key) => <input key={key} className={`decriptionImageInput-${key+1}`} type="file" onChange={setDescriptionImageFile} />)}

                <input className="bb-board-write__title" placeholder="제목을 입력해주세요." type="text" name="title" value={titleState} onChange={setTitleForOnChange}/>
                {/* <input className="bb-board-write__title--sub" placeholder="소제목을 입력해주세요." type="text" name="subTitle" value={boardTitle?.subTitle} onChange={setTitleForOnChange}/> */}
                <div className="bb-board-write__tags-wrapper">
                    <span onClick={setTagsData}>개발</span>
                    <span onClick={setTagsData}>공부</span>
                    <span onClick={setTagsData}>생각</span>
                </div>
                <div className="bb-board-write__editor-wrapper">
                    <ul className="bb-board-write__editor-options" ref={optionsRef}>
                        <li onClick={toggleFontSizeWindow}>
                            <VscTextSize />
                            <ul className="bb-board-write__editor-font-box" ref={fontSizeRef}>
                                <li onClick={(e) => sendOptionToTextEditor('fontSize', '1')}>10px</li>
                                <li onClick={(e) => sendOptionToTextEditor('fontSize', '2')}>13px</li>
                                <li onClick={(e) => sendOptionToTextEditor('fontSize', '3')}>16px</li>
                                <li onClick={(e) => sendOptionToTextEditor('fontSize', '4')}>18px</li>
                                <li onClick={(e) => sendOptionToTextEditor('fontSize', '5')}>24px</li>
                                <li onClick={(e) => sendOptionToTextEditor('fontSize', '6')}>32px</li>
                                <li onClick={(e) => sendOptionToTextEditor('fontSize', '7')}>48px</li>
                            </ul>
                        </li>
                        <li data-cmd="bold" onClick={(e) => sendOptionToTextEditor('bold', '', e)}><BsTypeBold /></li>
                        <li data-cmd="italic" onClick={(e) => sendOptionToTextEditor('italic', '', e)}><BsTypeItalic /></li>
                        <li data-cmd="underline" onClick={(e) => sendOptionToTextEditor('underline', '', e)}><BsTypeUnderline /></li>
                        <li data-cmd="strikethrough" onClick={(e) => sendOptionToTextEditor('strikethrough', '', e)}><BsTypeStrikethrough /></li>
                        <li data-cmd="justifycenter" onClick={(e) => sendOptionToTextEditor('justifycenter', '', e)}><BsTextCenter /></li>
                        <li className="small-hidden" onClick={(e) => sendOptionToTextEditor('insertunorderedlist', '')}><BsListUl /></li>
                        <li className="small-hidden" onClick={(e) => sendOptionToTextEditor('insertorderedlist', '')}><BsListOl /></li>
                        <li className="small-hidden" onClick={(e) => sendOptionToTextEditor('indent', '')}><BsTextIndentLeft /></li>
                        <li className="small-hidden" onClick={(e) => sendOptionToTextEditor('outdent', '')}><BsTextIndentRight /></li>
                        <li onClick={openFileInput}><BsCardImage /></li>
                    </ul>
                    <iframe className="bb-board-wrtie__editor" name="boadeditrot" ref={iframeRef}></iframe>
                </div>
                <div className={`bb-board-write__image-tiles ${tempThumbnailImagePathState !== '' && 'on'}`}>
                    <span style={{backgroundImage: `url(${tempThumbnailImagePathState})`}} onClick={removeThumbnailImage}><BsX /></span>
                </div>
                <div className="bb-board-write__image-upload-btn">
                    <input type="file" ref={thumbImageDom} onChange={setThumbnailImageFile} />
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