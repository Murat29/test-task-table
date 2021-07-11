import React from 'react';
import Table from '../Table/Table';
import Menu from '../Menu/Menu';
import Navigation from '../Navigation/Navigation';
import Popup from '../Popup/Popup';
import { columnsData, numberUsersInOnePage } from '../../utils/constants';
import sortDefaultIcon from '../../images/sort-default.png';
import sortAlphabeticallyIcon from '../../images/sort-alphabetically.png';
import sortAlphabeticallyReverseIcon from '../../images/sort-alphabetically-reverse.png';
import api from '../../utils/api';
import './App.css';

function App() {
  const [users, setUsers] = React.useState([]);
  // в displayedСolumns лежит объект вида: {name: true, gender: true, email: true}
  const [displayedСolumns, setDisplayedСolumns] = React.useState(
    columnsData.reduce((acc, cur) => {
      acc[cur.name] = true;
      return acc;
    }, {})
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [maxPages, setMaxPages] = React.useState(1);
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [popupData, setPopupData] = React.useState({});
  const [inputValue, setInputValue] = React.useState('');
  const [currentSortIcon, setCurrentSortIcon] = React.useState(sortDefaultIcon);

  React.useEffect(() => {
    const storedInputValue = localStorage.getItem('inputValue' || '');
    setInputValue(storedInputValue);
    updateUsers(storedInputValue);
  }, []);

  React.useEffect(() => {
    setMaxPages(Math.ceil(users.length / numberUsersInOnePage) || 1);
  }, [users]);

  async function updateUsers(number) {
    let newUser = [];
    if (Number(number)) {
      async function fetchData() {
        newUser = await api.getUsers(number).then((data) => data.results);
      }
      await fetchData();
    }
    setUsers(newUser);
    setCurrentSortIcon(sortDefaultIcon);
  }

  function handleBtnDelete(i) {
    users.splice(i, 1);
    setUsers([...users]);
    setInputValue(inputValue - 1);
  }

  function handleClickSort() {
    let newIcon;
    if (currentSortIcon !== sortAlphabeticallyIcon) {
      sortUsersAlphabetically();
      newIcon = sortAlphabeticallyIcon;
    } else {
      sortUsersReverseAlphabetical();
      newIcon = sortAlphabeticallyReverseIcon;
    }
    setCurrentSortIcon(newIcon);
  }

  function handleChangeInput(number) {
    let newValue = inputValue;
    console.log(number[0]);
    if (/[0-9]/.test(number) || number === '') {
      newValue = number;
      localStorage.setItem('inputValue', number);
    }
    setInputValue(newValue);
    updateUsers(newValue);
  }
  function handleClickUser(i) {
    setPopupData({
      name: returnFullName(users[i]),
      email: users[i].email,
      gender: users[i].gender === 'female' ? 'женский' : 'мужской',
      location: `${users[i].location.country} ${users[i].location.state} ${users[i].location.city}`,
      street: `${users[i].location.street.name} ${users[i].location.street.number}`,
      picture: users[i].picture.medium,
    });
    setIsOpenPopup(true);
  }

  function closePopup() {
    setIsOpenPopup(false);
  }

  function handlePageNumberButton(i) {
    setCurrentPage(i);
  }

  function handleChangeCheckbox(e) {
    if (displayedСolumns[e.target.name]) {
      // Проверка, на то что бы оставался один столбец
      let numberColumnsDisplayed = 0;
      for (let key in displayedСolumns) {
        if (displayedСolumns[key]) numberColumnsDisplayed++;
        if (numberColumnsDisplayed > 1) {
          break;
        }
      }
      if (numberColumnsDisplayed > 1) {
        displayedСolumns[e.target.name] = !displayedСolumns[e.target.name];
      }
    } else {
      displayedСolumns[e.target.name] = !displayedСolumns[e.target.name];
    }

    setDisplayedСolumns({ ...displayedСolumns });
  }

  function sortUsersAlphabetically() {
    setUsers([...users.sort((a, b) => returnFullName(a).localeCompare(returnFullName(b)))]);
  }
  function sortUsersReverseAlphabetical() {
    setUsers([...users.sort((a, b) => returnFullName(b).localeCompare(returnFullName(a)))]);
  }

  function returnFullName({ name: { title, first, last } }) {
    return `${title} ${first} ${last}`;
  }

  return (
    <div className="app">
      <h1 className="app__title">Рандомные пользователи</h1>
      <main className="app__main">
        <div className="app__table-container">
          <Table
            users={users}
            displayedСolumns={displayedСolumns}
            handleBtnDelete={handleBtnDelete}
            handleClickUser={handleClickUser}
            currentPage={currentPage}
            handleClickSort={handleClickSort}
            currentSortIcon={currentSortIcon}
          />
        </div>
        <Menu
          checkedCheckbox={displayedСolumns}
          handleChangeCheckbox={handleChangeCheckbox}
          inputValue={inputValue}
          handleChangeInput={handleChangeInput}
        />
        <Navigation
          currentPage={currentPage}
          maxPages={maxPages}
          handlePageNumberButton={handlePageNumberButton}
        />
        {isOpenPopup && <Popup isOpen={isOpenPopup} data={popupData} closePopup={closePopup} />}
      </main>
    </div>
  );
}

export default App;
