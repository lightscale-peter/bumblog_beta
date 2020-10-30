import React, { useState } from 'react';
import TextEditor from '../common/TextEditor';

function BoardTest(){

    // 본문 텍스트 textEditorContents = string
    // 본문 이미지 textEditorImageFiles = []
    // 기존 이미지 textEditorImageArray = []
    // 수정 여부


    const [textEditorContentsState, setTextEditorContentsState] = useState('');
    const [textEditorImageFileNamesState, setTextEditorImageFileNamesState] = useState<string[]>([]); // 기존 이미지 확인용 
    const [textEditorImageFilesState, setTextEditorImageFilesState] = useState<File[]>([]); // 신규 이미지 확인용

    return (
        <div className="board-test" style={{marginTop: '50px'}}>
           {/* <TextEditor 
                textEditorContentsState={textEditorContentsState}
                setTextEditorContentsState={setTextEditorContentsState}
                textEditorImageFileNamesState={textEditorImageFileNamesState}
                setTextEditorImageFileNamesState={setTextEditorImageFileNamesState}
                textEditorImageFilesState={textEditorImageFilesState}
                setTextEditorImageFilesState={setTextEditorImageFilesState}
           /> */}
        </div>
    )
}

export default BoardTest;
