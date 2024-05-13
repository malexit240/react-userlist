import { useContext } from 'react';

import { ModalManagerContext } from '../../Helpers/ModalManager/ModalManager';

import styles from './ModalPage.module.scss'

export function ModalPage({ title, okClick, cancelClick, children }) {
    const manager = useContext(ModalManagerContext)

    const okClicked = function () {
        if (okClick) okClick();
        manager.hide();
    }

    const cancelClicked = function () {
        if (cancelClick) cancelClick();
        manager.hide();
    }

    return <section className={styles['modal-container']}>

        <header className={styles['header']}>

            <h1>
                {title ?? 'Title'}
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
}