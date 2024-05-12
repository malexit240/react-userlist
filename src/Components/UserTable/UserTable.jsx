import { useEffect, useState } from 'react'
import axios from 'axios';

import styles from './UserTable.module.scss'

export function UserTable() {
    const [users, setUsers] = useState([]);
    const [orderState, setOrderState] = useState(
        {
            fieldName: '',
            isAscending: true,
        });

    useEffect(() => {
        loadUsers();
    }, [orderState]);

    async function loadUsers() {

        // localStorage.clear();
        if (!localStorage.getItem('users')) {
            const data = await axios.get('https://jsonplaceholder.typicode.com/users');
            localStorage.users = JSON.stringify(data.data);
        }

        setUsers(JSON.parse(localStorage.users));
    }

    const onSearchFieldTextChanged = function (newValue) {
        const searchField = newValue.toLowerCase();

        const newUsers = JSON.parse(localStorage.users)
            .filter(u =>
                u.email.toLowerCase().includes(searchField)
                || u.username.toLowerCase().includes(searchField)
            );

        setUsers(newUsers);
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

        // console.log(newOrderState);
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

    return <>
        <form className={styles['form']}>
            <label htmlFor='search-field'>Search</label>
            <input
                id='search-field'
                type='text'
                placeholder='type to search...'
                maxLength='24'
                onInput={(e) => onSearchFieldTextChanged(e.target.value)}></input>
        </form>

        <table className={styles['table']}>
            <tr>
                <th className={styles['index-field'].attachClass(getOrderingClass('number'))} onClick={() => onHeaderClicked('number')}>#</th>
                <th className={getOrderingClass('name')} onClick={() => onHeaderClicked('name')}>Name</th>
                <th className={getOrderingClass('username')} onClick={() => onHeaderClicked('username')}>Username</th>
                <th className={getOrderingClass('email')} onClick={() => onHeaderClicked('email')}>Email</th>
            </tr>

            {users.map((u, i) => <tr key={u.id}>

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
    </>
}