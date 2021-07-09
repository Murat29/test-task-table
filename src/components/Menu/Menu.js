import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './Menu.css';

function Menu() {
  const [isOpenCheckboxes, setIsOpenCheckboxes] = React.useState(false);

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
        <input className="menu__input" type="text" />
        <div className={`menu__checkboxes ${isOpenCheckboxes && 'menu__checkboxes_is-open'}`}>
          <label className="menu__checkbox-container" tabIndex="0" htmlFor="name">
            <Checkbox id="name" />
            Имя
          </label>
          <label className="menu__checkbox-container" tabIndex="0" htmlFor="gender">
            <Checkbox id="gender" />
            Пол
          </label>
          <label className="menu__checkbox-container" tabIndex="0" htmlFor="email">
            <Checkbox id="email" />
            E-mail
          </label>
        </div>
      </div>
    </aside>
  );
}

export default Menu;
