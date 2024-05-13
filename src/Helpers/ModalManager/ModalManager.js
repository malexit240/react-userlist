import { createContext, useRef, useState } from 'react';

import defaultStyles from './ModalManager.module.scss'

export const ModalManagerContext = createContext(null);

export default function ModalManager(children) {
    const dialogRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    let manage = {
        show: () => {
            dialogRef.current?.showModal();
            setIsVisible(true);
        }
        ,
        hide: () => {
            dialogRef.current?.close();
            setIsVisible(false);
        },
        visibility: () => isVisible,

    }

    let element = <dialog dialog id='call' className={defaultStyles['dialog']} ref={dialogRef}>

        <ModalManagerContext.Provider value={manage}>

            {children}

        </ModalManagerContext.Provider>

    </dialog>

    return {
        content: element,
        ...manage,
    };
}