import React, { useRef, useState, useEffect } from 'react';
import './Modal.scss';
import useModal from '../../hooks/useModal';
import {ModalDataType} from '../../modules/modal';
import {BsX} from 'react-icons/bs';

function Modal({data} : {data: ModalDataType}){

    const {state, onCloseModal} = useModal();
    const modalEl = useRef<HTMLDivElement>(null);
    const [modalData, setModalData] = useState<ModalDataType>(data);

    useEffect(function(){
        setModalData(state);
    }, [state]);

    const closeWindow = () =>{
        onCloseModal();
    }

    return (
        <div className={`bb-modal__body ${modalData.status && 'on'}`} ref={modalEl}>
            <div className="bb-modal__dim" onClick={closeWindow}></div>
            <div className="bb-modal__window">
                <div className="bb-modal__window-close-btn" onClick={closeWindow}><BsX className="bb-modal__window-corss-icon" /></div>
                <div>
                    <h1 className="bb-modal__window-title">{modalData.title}</h1>
                    <div className="bb-modal__window-desc">
                        {modalData.desc}
                    </div>
                    <div className={`bb-modal__window-btns ${modalData.confirm.isShow && 'on'}`}>
                        <button onClick={closeWindow}>아니오</button>
                        <button onClick={modalData.confirm.func}>예</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.defaultProps = {
    data: {
        status: false,
        title: '',
        desc: '',
        confirm: {
          isShow: false
        }
    }
}

export default Modal;