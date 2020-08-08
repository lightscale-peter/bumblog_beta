import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../modules';
import {toggleModal, openModal, closeModal} from '../modules/modal';
import { useCallback } from 'react';

function useModal(){
    const status = useSelector((state:RootState) => state.modal.status);
    const dispatch = useDispatch();

    const onToggleModal = useCallback(()=>{
        dispatch(toggleModal());
    }, [dispatch]);

    const onOpenModal = useCallback(()=>{
        dispatch(openModal());
    }, [dispatch]);

    const onCloseModal = useCallback(()=>{
        dispatch(closeModal());
    }, [dispatch]);

    return {
        status,
        onToggleModal,
        onOpenModal,
        onCloseModal
    }
}

export default useModal;