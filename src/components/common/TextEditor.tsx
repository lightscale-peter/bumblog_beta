import React, { useRef, useState } from 'react';
import './TextEditor.scss';
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
    BsCardImage
} from 'react-icons/bs';
import {VscTextSize} from 'react-icons/vsc';
import { useEffect } from 'react';

function TextEditor(){

    type textEditorImagesType = {
        descriptionImage: {
            originalname: string;
            filename: string;
        }[];
    }

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);
    const fontSizeRef = useRef<HTMLUListElement>(null);

    const [inputTagCountState, setInputTagCountState] = useState(0);
    const [firstClickOfEditorState, setFirstClickOfEditorState] = useState(true);
    const [imageState, setImageState] = useState<textEditorImagesType>({
        descriptionImage:[]
    });
    const [descriptionImageFilesState, setDescriptionImageFilesState] = useState<(File | null)[] | null>(null);

    // 텍스트 에디터 폰트사이즈 윈도우 토글
    const toggleFontSizeWindow = () =>{
        if(fontSizeRef.current){
            fontSizeRef.current.classList.toggle('on');
        }
    }
    

    // 텍스트 에디터 (옵션) 로직
    const sendOptionToTextEditor = (exec: string, value: string, event?:React.MouseEvent<HTMLLIElement, MouseEvent>) =>{
        toggleButtonStatus(event);
        applyOptionOnTextEditor(exec, value);
        focusOnTextEditor();
    }

    const toggleButtonStatus = (event:React.MouseEvent<HTMLLIElement, MouseEvent> | undefined) =>{
        if(event){
            event.currentTarget.classList.toggle('on');
        }
    }

    const focusOnTextEditor = ()=>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.body.focus();
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

    const openFileInput = ()=>{

        setInputTagCountState(inputTagCountState + 1);
        setTimeout(()=>{
            document.querySelector<HTMLInputElement>(`.decriptionInputFileTag-${inputTagCountState+1}`)?.click();
        }, 10)
        
        // iframeRef.current?.contentDocument?.write("<img width='100%' height='300px'/>");
    }

    const addEventOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentWindow){
            iframeRef.current.contentWindow.addEventListener('keyup', clickAndKeyUpEventOfTextEditor);
            iframeRef.current.contentWindow.addEventListener('click', clickAndKeyUpEventOfTextEditor);
        }
    }

    const removeEventOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentWindow){
            iframeRef.current.contentWindow.removeEventListener('keyup', clickAndKeyUpEventOfTextEditor);
            iframeRef.current.contentWindow.removeEventListener('click', clickAndKeyUpEventOfTextEditor);
        }
    }

    const clickAndKeyUpEventOfTextEditor = (e: KeyboardEvent | MouseEvent & {key?: string}) =>{

        if(firstClickOfEditorState){
            clearTextOnTextEditor();
            setFirstClickOfEditorState(false);
        }

        // 텍스트 에디터 (옵션 실시간 체크) 로직
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
                // imageState - 기존 이미지 지워졌는지 검사
                imageState.descriptionImage.forEach(image => {
                    if(iframeRef.current?.contentDocument?.body.innerHTML.indexOf(image.filename) === -1){
                        setImageState({
                            ...imageState,
                            descriptionImage: imageState.descriptionImage.filter(item => item.filename !== image.filename)
                        });

                    }
                });

                // descriptionImageFilesState - 신규 이미지 지워졌는지 검사
                if(inputTagCountState > 0){
                    for(let i=1; i<=inputTagCountState; i++){
    
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

    const clearTextOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.body.innerHTML = "";
        }
    }

    const setDefaultOnTextEditor = () =>{
        if(iframeRef.current && iframeRef.current.contentDocument){
            iframeRef.current.contentDocument.designMode = "on"
            iframeRef.current.contentDocument.head.innerHTML 
            = `<style>
                @import url("https://fonts.googleapis.com/earlyaccess/notosanskr.css");
            </style>`;
            iframeRef.current.contentDocument.body.style.fontFamily = 'Noto Sans KR';
            iframeRef.current.contentDocument.body.style.fontWeight = '400';
            iframeRef.current.contentDocument.body.style.margin = '0px';
            const placeholder = "<div style='color: grey;'>내용을 입력해주세요.</div>"
            iframeRef.current.contentDocument.body.innerHTML = placeholder;
        }
    }

    useEffect(()=>{
        setDefaultOnTextEditor();

        // const listId = match.params.list_id;
        
        // 수정요청으로 들어올 경우
        // if(listId){
            // setIdState(listId);
            // setContentsOnPage(listId);
            setFirstClickOfEditorState(false);
        // }

        window.scrollTo(0, 0);

    }, []);

    useEffect(()=>{
        addEventOnTextEditor();
        return ()=>{
            removeEventOnTextEditor();
        }
    }, [descriptionImageFilesState, imageState, firstClickOfEditorState]);

    return (
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
    )
}

export default TextEditor;