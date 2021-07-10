import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { columnsData } from '../../utils/constants';
import './Menu.css';

function Menu({ checkedCheckbox, handleChangeCheckbox }) {
  const [isOpenCheckboxes, setIsOpenCheckboxes] = React.useState(false);
  const [searchCheckboxValue, setSearchCheckboxValue] = React.useState('');

  return (
    <aside className="menu">
      <p className="menu__text">Количество отображаемых пользователей:</p>
      <input className="menu__input" type="text" />
      <p className="menu__text">Отображаеме поля:</p>
      <div
        onFocus={() => setIsOpenCheckboxes(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsOpenCheckboxes(false);
          }
        }}
        className="menu__multiselect"
      >
        <input
          onChange={(e) => setSearchCheckboxValue(e.target.value)}
          className="menu__input"
          type="text"
        />
        <div className={`menu__checkboxes ${isOpenCheckboxes && 'menu__checkboxes_is-open'}`}>
          {columnsData.map((data) => {
            const isDisplayed = data.title
              .toLowerCase()
              .includes(searchCheckboxValue.toLowerCase());
            return (
              isDisplayed && (
                <label
                  key={data.name}
                  className="menu__checkbox-container"
                  tabIndex="0"
                  htmlFor={data.name}
                >
                  <Checkbox
                    checked={checkedCheckbox[data.name]}
                    handleChange={handleChangeCheckbox}
                    id={data.name}
                  />
                  {data.title}
                </label>
              )
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default Menu;
