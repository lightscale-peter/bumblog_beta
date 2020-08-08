const TOGGLE = 'modal/toggle' as const;
const OPEN = 'modal/open' as const;
const CLOSE = 'modal/close' as const;

export const toggleModal = ()=>({
    type: TOGGLE
});

export const openModal = () =>({
    type: OPEN
});

export const closeModal = () =>({
    type: CLOSE
})

type ModalAction = 
    | ReturnType<typeof toggleModal>
    | ReturnType<typeof openModal>
    | ReturnType<typeof closeModal>

type ModalState = {
    status: boolean;
}

const initialState: ModalState = {
    status: false
}

function modal(state: ModalState = initialState, action: ModalAction){
    switch(action.type){
        case TOGGLE:
            return {status: !state.status}
        case OPEN:
            return {status: true}
        case CLOSE:
            return {status: false}
        default:
            return state;
    }
}

export default modal;