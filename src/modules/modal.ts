const OPEN = 'modal/open' as const;
const OPEN_CONFIRM = 'modal/open_confirm' as const;
const CLOSE = 'modal/close' as const;

export const openModal = () =>({
    type: OPEN
});

type confirmModal = {
    title: string;
    desc: string;
    confirm: {
        isShow: boolean;
        func: () => void;
    }
}

export const openConfirmModal = (data:confirmModal) =>({
    type: OPEN_CONFIRM,
    payload: {
        title: data.title,
        desc: data.desc,
        confirm: {
            isShow: data.confirm.isShow,
            func: data.confirm.func
        }
    }
});

export const closeModal = () =>({
    type: CLOSE
})

type ModalAction = 
    | ReturnType<typeof openModal>
    | ReturnType<typeof openConfirmModal>
    | ReturnType<typeof closeModal>

type ModalState = {
    status: boolean;
    title: string;
    desc: string;
    confirm: {
        isShow: boolean;
        func: () => void;
    }
}

const initialState: ModalState = {
    status: false,
    title: '',
    desc: '',
    confirm: {
        isShow: false,
        func: () => {}
    }
}

function modal(state: ModalState = initialState, action: ModalAction){
    switch(action.type){
        case OPEN:
            return {status: true}
        case OPEN_CONFIRM:
            return {
                status: true, 
                title: action.payload.title,
                desc: action.payload.desc,
                confirm: {
                    isShow: action.payload.confirm.isShow,
                    func: action.payload.confirm.func
                }
            }
        case CLOSE:
            return {status: false}
        default:
            return state;
    }
}

export default modal;