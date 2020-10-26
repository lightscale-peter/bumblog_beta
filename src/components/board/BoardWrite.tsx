import React, { useRef, useState, useEffect, createElement } from 'react';
import axios from 'axios';

import './BoardWrite.scss';
import path from 'path';
import {useHistory} from 'react-router-dom';
import {getQueryString} from '../../utils';
import useModal from '../../hooks/useModal';

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
import { boardListType, boardListImagesType } from './BoardHome';

function BoardWrite(urlParams: any){

    const {onOpenConfirmModal, onCloseModal} = useModal();

    const [titleState, setTitleState] = useState('')
    const [tagsState, setTagsState] = useState<string[]>([]);
    const [idState, setIdState] = useState('');
    const [imageState, setImageState] = useState<boardListImagesType>({
        thumbnailImage: [],
        descriptionImage:[]
    });
    const [nullCheckState, setNullCheckState] = useState(false);

    const [tempThumbnailImagePathState, setTempThumbnailImagePathState] = useState('');
    const [thumbnailImageFileState, setThumbnailImageFileState] = useState<File | null>(null); 
    const [descriptionImageFilesState, setDescriptionImageFilesState] = useState<(File | null)[] | null>(null);

    const [inputTagCountState, setInputTagCountState] = useState(0);

    type imageNameType = {
        originalname: string;
        filename: string;
    }

    let history = useHistory();

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);
    const thumbImageRef = useRef<HTMLInputElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);


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

        // 백스페이스를 눌렀을떄 이미지가 지워졌는지 확인하는 로직
        if(e.type === "keyup"){
            if(e.key === "Backspace"){
                console.log('백스페이스 눌렀다.', inputTagCountState);

                // imageState - 기존 이미지 지워졌는지 검사
                imageState.descriptionImage.forEach(image => {
                    if(iframeRef.current?.contentDocument?.body.innerHTML.indexOf(image.filename) === -1){
                        console.log('이미지가 삭제 되었다.');
                        setImageState({
                            ...imageState,
                            descriptionImage: imageState.descriptionImage.filter(item => item.filename !== image.filename)
                        });

                    }
                });

                // descriptionImageFilesState - 신규 이미지 지워졌는지 검사
                if(inputTagCountState > 0){
                    for(let i=1; i<=inputTagCountState; i++){

                        console.log(`이미지 검사 ${i}`)
    
                        if(iframeRef.current?.contentDocument?.body.innerHTML.indexOf(`decriptionImgTag-${i}`) !== -1){
                            console.log('이미지가 있다.!!')
                        }else{
                            console.log('이미지가 없다.!!', descriptionImageFilesState)
        
                            if(document.querySelectorAll<HTMLInputElement>(`.decriptionInputFileTag-${i}`))
                            document.querySelectorAll<HTMLInputElement>(`.decriptionInputFileTag-${i}`)[0].value = "";

                            if(descriptionImageFilesState && descriptionImageFilesState.length > 0){
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
        }).then((res: {data: boardListType}) =>{
            console.log('res', res.data);

            setTitleState(res.data.title);
            setTagsState(res.data.tags[0] === '' ? [] : res.data.tags);
            setImageState(res.data.images);

            setTagsOnViewByData(res.data.tags);

            if(res.data.images.thumbnailImage.length > 0){
                setTempThumbnailImagePathState(path.resolve('./uploads', res.data.images.thumbnailImage[0].filename));
            }

            setTextOnTextEditor(res.data.description);
        });
    }

    useEffect(()=>{
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

    useEffect(()=>{
        addEventOnTextEditor();
        return ()=>{
            removeEventOnTextEditor();
        }
    }, [descriptionImageFilesState, imageState]);



    const addEventOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentWindow){
            iframeRef.current.contentWindow.addEventListener('keyup', checkOptionsOfTextEditor);
            iframeRef.current.contentWindow.addEventListener('click', checkOptionsOfTextEditor);
        }
    }

    const removeEventOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentWindow){
            iframeRef.current.contentWindow.removeEventListener('keyup', checkOptionsOfTextEditor);
            iframeRef.current.contentWindow.removeEventListener('click', checkOptionsOfTextEditor);
        }
    }


    const clearTextOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.body.innerHTML = "";
        }
    }

    const getTextEditorContentsAfterRemoveTempImgSrc = () =>{
        let stringData = iframeRef.current?.contentDocument?.body.innerHTML;
        stringData = stringData?.replace(/([0-9]\"\s)src=\".*?\"/gi, "$1");
        // "<img src='dasd' />dassadsdads<img src='dasd' />".replace(/src='.*?\'/gi, "")
        // "<img class\".decriptionImgTag-1\" src=\"adasddsasdadas\" />".replace(/([0-9]\"\s)src=\".*?\"/gi, "$1");
        return stringData ? stringData : '';
    }

    const getTextEditorContents = ()=>{
        let stringData = iframeRef.current?.contentDocument?.body.innerHTML;
        return stringData ? stringData : '';
    }


    const nullCheckData = (targets: {type: string; target: string;} []): boolean =>{
        let passFlag = true;

        console.log('targets', targets);
      
        targets.some(item => {
            console.log('item', item);

            if(item.target === ''){
                onOpenConfirmModal({
                    status: true,
                    title: `${item.type} 오류`,
                    desc: `${item.type}을 입력해 주세요.`,
                    confirm: {
                        isShow: true,
                        func: () => {
                            onCloseModal();
                            switch(item.type){
                                case '제목':
                                    titleInputRef.current?.focus();
                                    break;
                                case '본문':
                                    if(iframeRef.current?.contentDocument)
                                        iframeRef.current?.contentDocument.body.focus();
                                    break;
                                default:
                            }
                        }
                    }
                });
                passFlag = false;
                return true;
            }
        });

        return passFlag;
       
    }

    const setFormData = (idState: string) =>{
        const form = new FormData();

        form.append('title', titleState);
        form.append('tags', JSON.stringify(tagsState));
        form.append('description', getTextEditorContentsAfterRemoveTempImgSrc());
        form.append('writer', '신범근');

        if(idState == ''){ // 신규 등록

            // 썸네일 이미지
            if(thumbnailImageFileState){ 
                form.append('thumbnailImage', thumbnailImageFileState);
            }

            // 본문 이미지     
            if(descriptionImageFilesState){ 
                descriptionImageFilesState.forEach(file =>{
                    if(file){
                        form.append('descriptionImage', file);
                    }
                })
            }           

        }else{ // 수정 등록
            form.append('_id', idState);
            form.append('images', JSON.stringify(imageState)); // 기존 이미지 정보
            
            // 썸네일 이미지
            if(thumbnailImageFileState){ // 이미지를 추가, 변경할때
                form.append('thumbnailImage', thumbnailImageFileState);
            }

            // 본문 이미지
            if(descriptionImageFilesState){ // 이미지를 추가, 변경할때
                descriptionImageFilesState.forEach(file =>{
                    if(file){
                        form.append('descriptionImage', file);
                    }
                })
            }
        }

        return form;
    }


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const passFlag = nullCheckData([
                {type: '제목', target: titleState}, 
                {type: '태그', target: tagsState.toString()}, 
                {type: '본문', target: getTextEditorContents()}
            ]);

        
        if(passFlag){
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
            setImageState({
                thumbnailImage: [],
                descriptionImage:[]
            });
            setThumbnailImageFileState(null);
            setDescriptionImageFilesState(null);
    
            clearTextOnTextEditor();
        }
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

    const setTagsOnViewByData = (initTags:string[]) =>{
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

            const imageFile = e.currentTarget.files[0];

            if(imageFile){
                if(verifyImageType(imageFile.type) === false){
                    onOpenConfirmModal({
                        status: true,
                        title: '이미지 오류',
                        desc: 'jpeg, png, jpg 파일만 가능합니다.',
                        confirm: {
                            isShow: false
                        }
                    });
                    e.currentTarget.value = ""; // Input File 초기화
                    setThumbnailImageFileState(null); // State 초기화
                }else{
                    setTempThumbnailImageOnView(imageFile);
                    setThumbnailImageFileState(imageFile);
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
        setThumbnailImageFileState(null);   
        setImageState({
            ...imageState,
            thumbnailImage: []
        });   
    }

    




    const openFileInput = ()=>{

        setInputTagCountState(inputTagCountState + 1);
        setTimeout(()=>{
            document.querySelector<HTMLInputElement>(`.decriptionInputFileTag-${inputTagCountState+1}`)?.click();
        }, 10)
        

        // iframeRef.current?.contentDocument?.write("<img width='100%' height='300px'/>");
    }

    const setDescriptionImageFile = (e: React.ChangeEvent<HTMLInputElement>) =>{

        // console.log('e', e);

        if(e.currentTarget.files){
            const imageFile = e.currentTarget.files[0];

            if(imageFile){
                if(verifyImageType(imageFile.type) === false){
                    onOpenConfirmModal({
                        status: true,
                        title: '이미지 오류',
                        desc: 'jpeg, png, jpg 파일만 가능합니다.',
                        confirm: {
                            isShow: false
                        }
                    });
                    if(inputTagCountState !== 0){
                        setInputTagCountState(inputTagCountState-1);
                    }
                    e.currentTarget.value = ""; // Input File 초기화
                }else{
                    setTempDescriptImageOnTextEditor(imageFile);

                    if(descriptionImageFilesState === null){
                        setDescriptionImageFilesState([imageFile]);
                    }else{
                        setDescriptionImageFilesState(descriptionImageFilesState.concat(imageFile));
                    }
                }   
            }

        }
    
    }

    const setTempDescriptImageOnTextEditor = (descriptionImageFile: File)=>{
        const reader = new FileReader();
        reader.onload = function(e){
            if(e.target?.result){
                const imageTag = `<img width='100%' height='auto' class=".decriptionImgTag-${inputTagCountState}" src="${e.target.result.toString()}" />`;
                iframeRef.current?.contentDocument?.execCommand('InsertHTML', false, imageTag);
            }
        }
        reader.readAsDataURL(descriptionImageFile);

        focusOnTextEditor();
    }

    return (
        <main className="bb-board-write__main">
            <form className="bb-board-write__form" onSubmit={onSubmit}>

                {[...Array(inputTagCountState)].map((v, key) => <input key={key} className={`decriptionInputFileTag-${key+1}`} type="file" onChange={setDescriptionImageFile} />)}

                <input className="bb-board-write__title" ref={titleInputRef} placeholder="제목을 입력해주세요." type="text" name="title" value={titleState} onChange={setTitleForOnChange}/>
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
                    <input type="file" ref={thumbImageRef} onChange={setThumbnailImageFile} />
                    <button type="button" onClick={()=> thumbImageRef.current?.click()}>썸네일 이미지 업로드</button>
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