import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../modules';
import {openModal, openConfirmModal, closeModal, ModalDataType} from '../modules/modal';
import { useCallback } from 'react';

function useModal(){
    const state = useSelector((state:RootState) => state.modal);
    const dispatch = useDispatch();

    const onOpenModal = useCallback((data)=>{
        dispatch(openModal(data));
    }, [dispatch]);

    const onOpenConfirmModal = useCallback((data)=>{
        dispatch(openConfirmModal(data));
    }, [dispatch]);

    const onCloseModal = useCallback(()=>{
        dispatch(closeModal());
    }, [dispatch]);

    return {
        state,
        onOpenModal,
        onOpenConfirmModal,
        onCloseModal
    }
}

export default useModal;