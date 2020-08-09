import React, { useRef, useState, useEffect } from 'react';
import './Modal.scss';
import useModal from '../../hooks/useModal';

type ModalDataType = {
    title: String;
    desc: String;
    confirm: {
        isShow: boolean;
        func: () => void;
    };
}

function Modal(){

    const [isShow, setIsShow] = useState(false);
    const {status, onOpenModal, onCloseModal} = useModal();

    console.log('status', status);

    useEffect(function(){
        setIsShow(status);
    }, [status]);

    const modalEl = useRef<HTMLDivElement>(null);
    const [modalData, setModalData] = useState<ModalDataType>({
        title: 'Tiele',
        desc: 'Lorem ipsum dolor sit amet consectetucabo delectus.',
        confirm: {
            isShow: true,
            func: () => {alert('confirm!')}
        }
    });

    const openWindow = (data: ModalDataType) =>{
        setModalData(data);
        onOpenModal();
    }
    const closeWindow = () =>{
        onCloseModal();
    }

    return (
        <div className={`bb-modal__body ${isShow && 'on'}`} ref={modalEl}>
            <div className="bb-modal__dim" onClick={closeWindow}></div>
            <div className="bb-modal__window">
                <div className="bb-modal__window-close-btn" onClick={closeWindow}>X</div>
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

export default Modal;