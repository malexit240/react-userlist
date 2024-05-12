import { useRef, useState } from "react";

import styles from './ModalPage.module.scss'

export function ModalPage({ parent, okClick, cancelClick, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef(null);

    parent.ref = dialogRef;

    const closeModal = function () {
        dialogRef.current.close();
    }

    const okClicked = function (e) {
        if (okClick) okClick();
        closeModal();
    }

    const cancelClicked = function () {
        if (cancelClick) cancelClick();
        closeModal();
    }

    let dialog = <dialog id='call' className={styles['dialog']} ref={dialogRef}>

        <section className={styles['modal-container']}>

            <header className={styles['header']}>

                <h1>
                    Title
                </h1>

                <button onClick={cancelClicked} className={styles['cancel-button']}></button>

            </header>

            <article className={styles['content']}>

                {children}

            </article>

            <footer className={styles['footer']}>

                <button onClick={e => okClicked(e)}>Ok</button>

            </footer>

        </section>

    </dialog>

    return dialog;
}