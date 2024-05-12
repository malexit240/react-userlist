import styles from './UserDetailModalPage.module.scss'

import { ModalPage } from '../../Components/ModalPage/ModalPage'

export function UserDetailModalPage({ selectedUserForModalPage, opened: opened, closeModal }) {

    return <>
        <ModalPage title={selectedUserForModalPage?.name} open={opened} closeModal={() => closeModal()}>

            <span>Username: {selectedUserForModalPage?.username}</span>
            <br />
            <br />
            <span>Email: {selectedUserForModalPage?.email}</span>

        </ModalPage>
    </>
}