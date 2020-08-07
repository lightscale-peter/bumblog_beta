import React, { useRef, useState } from 'react';
import './Modal.scss';

type ModalDataType = {
    title: String;
    desc: String;
    confirm: boolean;
}

function Modal(){
    const modalEl = useRef<HTMLDivElement>(null);
    const [modalData, setModalData] = useState<ModalDataType>({
        title: 'Tiele',
        desc: 'Lorem ipsum dolor sit amet consectetucabo delectus.',
        confirm: true
    });

    const openWindow = (data: ModalDataType) =>{
        setModalData(data);
        modalEl.current?.classList.add('on');
    }
    const closeWindow = () =>{
        modalEl.current?.classList.remove('on');
    }

    return (
        <div className="bb-modal__body on" ref={modalEl}>
            <div className="bb-modal__dim" onClick={closeWindow}></div>
            <div className="bb-modal__window">
                <div className="bb-modal__window-close-btn" onClick={closeWindow}>X</div>
                <div>
                    <h1 className="bb-modal__window-title">{modalData.title}</h1>
                    <div className="bb-modal__window-desc">
                        {modalData.desc}
                    </div>
                    <div className={`bb-modal__window-btns ${modalData.confirm && 'on'}`}>
                        <button>아니오</button>
                        <button>예</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;