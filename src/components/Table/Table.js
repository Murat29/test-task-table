import React from 'react';

import cross from '../../images/cross.svg';
import { columnsData, numberUsersInOnePage } from '../../utils/constants';
import './Table.css';

function Table({
  users,
  displayedСolumns,
  handleBtnDelete,
  handleClickUser,
  currentPage,
  handleClickSort,
  currentSortIcon,
}) {
  const [displayedUsers, setDisplayedUsers] = React.useState(
    users.slice(currentPage * numberUsersInOnePage - 10, currentPage * numberUsersInOnePage)
  );
  const [currentLineHover, setCurrentLineHover] = React.useState(-1);

  React.useEffect(() => {
    setDisplayedUsers(
      users.slice(currentPage * numberUsersInOnePage - 10, currentPage * numberUsersInOnePage)
    );
  }, [users, currentPage]);
  // функции lineMouseOverhandler и handlerLineMouseOut нужны для подсветки строки,
  // при наведенни на ячейки, но не при наведении на кнопку удения
  function handlerLineMouseOver(event, i) {
    let newCurrentLineHover;
    if (event.target.classList[0] === 'table__cell') newCurrentLineHover = i;
    else newCurrentLineHover = -1;
    setCurrentLineHover(newCurrentLineHover);
  }

  function handlerLineMouseOut() {
    setCurrentLineHover(-1);
  }

  return (
    <table className="table">
      <tbody>
        <tr className="table__line">
          {columnsData.map((data) => {
            return (
              displayedСolumns[data.name] && (
                <th
                  key={data.name}
                  className={`table__header ${'table__header_type_' + data.name}`}
                >
                  {data.title}
                  {data.isBtnSort && (
                    <button onClick={handleClickSort} className="table__btn table__btn_type_sort">
                      <img
                        className="table__img-sort"
                        src={currentSortIcon}
                        alt="Сортировка по алфавиту."
                      />
                    </button>
                  )}
                </th>
              )
            );
          })}
        </tr>
        {displayedUsers.map(
          ({ name: { title, first, last }, gender, email, login: { uuid } }, i) => {
            const fullIndex = (currentPage - 1) * numberUsersInOnePage + i;
            // Здесь очень важен порядок ячеек(td). Он должен быть такой же, как в columnsData
            // Иначе могут скрыться разные header столбца и его ячейки
            return (
              <tr
                tabIndex="0"
                onMouseOver={(event) => handlerLineMouseOver(event, i)}
                onMouseOut={handlerLineMouseOut}
                key={uuid}
                className={`table__line ${i === currentLineHover && 'table__line_hover'}`}
              >
                {displayedСolumns[columnsData[0].name] && (
                  <td onClick={(e) => handleClickUser(fullIndex)} className="table__cell">
                    {title} {first} {last}
                  </td>
                )}
                {displayedСolumns[columnsData[1].name] && (
                  <td onClick={(e) => handleClickUser(fullIndex)} className="table__cell">
                    {gender === 'female' ? 'женский' : 'мужской'}
                  </td>
                )}
                {displayedСolumns[columnsData[2].name] && (
                  <td onClick={(e) => handleClickUser(fullIndex)} className="table__cell">
                    {email}
                  </td>
                )}
                <td className="table__cell_type_delete">
                  <button
                    onClick={() => handleBtnDelete(fullIndex)}
                    className="table__btn table__btn_type_delete"
                  >
                    <img className="table__img-delete" src={cross} alt="Удалить запись." />
                  </button>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}

export default Table;
