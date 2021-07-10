import React from 'react';
import sortDefaultIcon from '../../images/sort-default.png';
import sortAlphabeticallyIcon from '../../images/sort-alphabetically.png';
import sortAlphabeticallyReverseIcon from '../../images/sort-alphabetically-reverse.png';
import cross from '../../images/cross.svg';
import { columnsData } from '../../utils/constants';
import './Table.css';

function Table({ users, displayedСolumns, sortUsers, sortUsersReverse }) {
  const [currentLineHover, setCurrentLineHover] = React.useState(-1);
  const [currentSortIcon, setCurrentSortIcon] = React.useState(sortDefaultIcon);

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

  function handleClickSort() {
    let newIcon;
    if (currentSortIcon !== sortAlphabeticallyIcon) {
      sortUsers();
      newIcon = sortAlphabeticallyIcon;
    } else {
      sortUsersReverse();
      newIcon = sortAlphabeticallyReverseIcon;
    }
    setCurrentSortIcon(newIcon);
  }

  return (
    <table className="table">
      <tbody>
        <tr className="table__line">
          {columnsData.map((data) => {
            return (
              displayedСolumns[data.name] && (
                <th key={data.name} className="table__header">
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
        {users.map(({ name: { title, first, last }, gender, email, login: { uuid } }, i) => {
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
                <td className="table__cell">
                  {title} {first} {last}
                </td>
              )}
              {displayedСolumns[columnsData[1].name] && (
                <td className="table__cell">{gender === 'female' ? 'женский' : 'мужской'}</td>
              )}
              {displayedСolumns[columnsData[2].name] && <td className="table__cell">{email}</td>}
              <td className="table__cell-delete">
                <button className="table__btn table__btn_type_delete">
                  <img className="table__img-delete" src={cross} alt="Удалить запись." />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
