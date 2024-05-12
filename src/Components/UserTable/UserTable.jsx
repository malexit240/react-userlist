import { useEffect, useState } from 'react'
import axios from 'axios';

import styles from './UserTable.module.scss'

import {UserDetailModalPage} from '../../Containers/UserDetailModalPage/UserDetailModalPage'

export function UserTable() {
    //STATES
    const [users, setUsers] = useState([]);
    const [orderState, setOrderState] = useState(
        {
            fieldName: undefined,
            isAscending: true,
        });
    const [searchField, setSearchField] = useState('');
    const [currentId, setCurrentId] = useState(0);

    //EFFECTS
    useEffect(() => {
        loadUsers();
    }, [orderState, searchField]);

    async function loadUsers() {
        // localStorage.clear();
        if (!localStorage.getItem('users')) {
            const data = await axios.get('https://jsonplaceholder.typicode.com/users');
            localStorage.users = JSON.stringify(data.data);
        }

        let users = JSON.parse(localStorage.users);

        users = filterUsers(users);

        if (orderState.fieldName != undefined) {
            users = orderState.isAscending
                ? users.toSorted((u1, u2) => (+(u1[orderState.fieldName] >= u2[orderState.fieldName]) * 2 - 1))
                : users.toSorted((u1, u2) => (+(u1[orderState.fieldName] <= u2[orderState.fieldName]) * 2 - 1))
        }

        setUsers(users);
    }

    const filterUsers = function (users) {
        return users.filter(u =>
            u.email.toLowerCase().includes(searchField)
            || u.username.toLowerCase().includes(searchField)
        );
    }

    const onSearchFieldTextChanged = function (newValue) {
        setSearchField(newValue.toLowerCase());
    }

    const onHeaderClicked = function (fieldName) {

        let isAscending = orderState.isAscending;

        if (fieldName != orderState.fieldName) {
            isAscending = true;
        }
        else if (isAscending) {
            isAscending = false;
        }
        else {
            fieldName = undefined;
        }

        setOrderState({
            ...orderState,
            fieldName: fieldName,
            isAscending: isAscending,
        });

    }

    const getOrderingClass = function (fieldName) {

        return fieldName != orderState.fieldName ? ''
            : orderState.isAscending ? styles['active-asc']
                : styles['active-desc']
    }


    const openUserInfo = function (id) {
        setCurrentId(id);
    }

    return <>
        <section className={styles['table-container']} >

            <form className={styles['form']}>

                <label htmlFor='search-field'>Search</label>

                <input
                    id='search-field'
                    type='text'
                    placeholder='Type to search...'
                    maxLength='24'
                    onInput={(e) => onSearchFieldTextChanged(e.target.value)}></input>

            </form>

            <table className={styles['table']}>
                <tr>
                    <th className={styles['index-field']}>#</th>
                    <th className={''.attachClasses(styles['orderable'], getOrderingClass('name'))} onClick={() => onHeaderClicked('name')}>Name</th>
                    <th className={''.attachClasses(styles['orderable'], getOrderingClass('username'))} onClick={() => onHeaderClicked('username')}>Username</th>
                    <th className={''.attachClasses(styles['orderable'], getOrderingClass('email'))} onClick={() => onHeaderClicked('email')}>Email</th>
                </tr>

                {users.map((u, i) => <tr onClick={() => openUserInfo(u.id)} key={u.id}>

                    <td className={styles['index-field']}>
                        {i + 1}
                    </td>

                    <td>
                        {u.name}
                    </td>

                    <td>
                        {u.username}
                    </td>

                    <td>
                        {u.email}
                    </td>

                </tr>)}

            </table>

            <UserDetailModalPage
                opened={currentId > 0}
                selectedUserForModalPage={users?.find(u => u.id == currentId)}
                closeModal={() => setCurrentId(0)} />

        </section>
    </>
}