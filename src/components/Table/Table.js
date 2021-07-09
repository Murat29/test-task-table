import React from 'react';
import testData from '../../utils/testData.json';
import sortDefault from '../../images/sort-default.png';
import sortAlphabetically from '../../images/sort-alphabetically.png';
import sortAlphabeticallyReverse from '../../images/sort-alphabetically-reverse.png';
import cross from '../../images/cross.svg';
import './Table.css';

function Table() {
  const [currentLineHover, setCurrentLineHover] = React.useState(-1);

  function lineMouseOverhandler(event, i) {
    if (event.target.classList[0] === 'table__cell') {
      setCurrentLineHover(i);
    }
  }

  function lineMouseOuthandler(e) {
    setCurrentLineHover(-1);
    e.target.parentNode.classList.remove('table__line_hover');
  }
  return (
    <table className="table">
      <tbody>
        <tr className="table__line">
          <th className="table__heading">
            Имя
            <button className="table__btn table__btn_type_sort">
              <img
                className="table__img-sort"
                src={sortAlphabetically}
                alt="Сортировка по алфавиту."
              />
            </button>
          </th>
          <th className="table__heading">Пол</th>
          <th className="table__heading">E-mail</th>
        </tr>
        {testData.results.map(
          ({ name: { title, first, last }, gender, email, login: { uuid } }, i) => (
            <tr
              tabIndex="0"
              onMouseOver={(event) => lineMouseOverhandler(event, i)}
              onMouseOut={lineMouseOuthandler}
              key={uuid}
              className={`table__line ${i === currentLineHover && 'table__line_hover'}`}
            >
              <td className="table__cell">
                {title} {first} {last}
              </td>
              <td className="table__cell">{gender === 'female' ? 'женский' : 'мужской'}</td>
              <td className="table__cell">{email}</td>
              <td className="table__cell-delete">
                <button className="table__btn table__btn_type_delete">
                  <img className="table__img-delete" src={cross} alt="Удалить запись." />
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

export default Table;
