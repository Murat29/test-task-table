import React from 'react';
import Table from '../Table/Table';
import Menu from '../Menu/Menu';
import Navigation from '../Navigation/Navigation';
import Popup from '../Popup/Popup';
import testData from '../../utils/testData.json';
import { columnsData } from '../../utils/constants';
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

  React.useEffect(() => {
    setUsers(testData.results);
  }, []);

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
        />
        <Menu checkedCheckbox={displayedСolumns} handleChangeCheckbox={handleChangeCheckbox} />
        <Navigation />
        <Popup />
      </main>
    </div>
  );
}

export default App;
