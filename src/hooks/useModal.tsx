import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../modules';
import {openModal, closeModal} from '../modules/modal';
import { useCallback } from 'react';

function useModal(){
    const status = useSelector((state:RootState) => state.modal);
    const dispatch = useDispatch();

    const onOpenModal = useCallback(()=>{
        dispatch(openModal());
    }, [dispatch]);

    const onCloseModal = useCallback(()=>{
        dispatch(closeModal());
    }, [dispatch]);

    return {
        status,
        onOpenModal,
        onCloseModal
    }
}

export default useModal;