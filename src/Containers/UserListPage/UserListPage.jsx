import styles from './UserListPage.module.scss'

import { UserTable } from '../../Components/UserTable/UserTable'

export function UserListPage() {
    return <>
        <header className={styles['header']}>

            <h1>UserList App</h1>
            <p><i>..inspired by ChatGPT test task</i></p>

        </header>

        <UserTable />
    </>
}