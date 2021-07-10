import React from 'react';
import Table from '../Table/Table';
import Menu from '../Menu/Menu';
import Navigation from '../Navigation/Navigation';
import Popup from '../Popup/Popup';
import testData from '../../utils/testData.json';
import { columnsData, numberUsersInOnePage } from '../../utils/constants';
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
  const [maxPages, setMaxPages] = React.useState(10);
  const [isOpenPopup, setIsOpenPopup] = React.useState(false);
  const [popupData, setPopupData] = React.useState({});

  React.useEffect(() => {
    setUsers(testData.results);
    setMaxPages(users.length / numberUsersInOnePage);
    // fetch('https://api.randomuser.me/?results=68')
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
  }, [users]);

  function handleBtnDelete(i) {
    users.splice(i, 1);
    setUsers([...users]);
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
        <Table
          users={users}
          displayedСolumns={displayedСolumns}
          sortUsers={sortUsersAlphabetically}
          sortUsersReverse={sortUsersReverseAlphabetical}
          handleBtnDelete={handleBtnDelete}
          handleClickUser={handleClickUser}
          currentPage={currentPage}
        />
        <Menu checkedCheckbox={displayedСolumns} handleChangeCheckbox={handleChangeCheckbox} />
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
