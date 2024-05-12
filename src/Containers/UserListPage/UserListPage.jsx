import styles from './UserListPage.module.scss'

import { UserTable } from '../../Components/UserTable/UserTable'

export function UserListPage() {
    return <>
        <header className={styles['header']}>

            <h1>UserList App</h1>
            <p><i>..inspired by ChatGPT test task</i><a href='#description'> *</a></p>

        </header>

        <UserTable />

        <footer id='description' className={styles['footer']}>
            <a href='#description'>* </a>
            <p>I asked Chat to generate test task for junior frontend developer - and my implementation of that here. No other cheats with LLM</p>

            <br /> <br />

            <span>Sure it looks very simple so I hope my code shows more about my possibilities: </span>
            <a className={styles['github-link']} target='_blank' href='https://github.com/malexit240/react-userlist'>
                github link
            </a>

        </footer>
    </>
}