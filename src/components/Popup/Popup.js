import React from 'react';
import './Popup.css';

function Popup({ isOpen, data: { name, email, gender, location, street, picture }, closePopup }) {
  const popupRef = React.useRef(null);

  React.useEffect(() => {
    popupRef.current.focus();
  }, []);

  return (
    <div
      ref={popupRef}
      className="popup"
      onClick={(e) => {
        if (e.target === popupRef.current) {
          closePopup();
        }
      }}
      onKeyDown={(e) => {
        if (e.code === 'Escape') {
          closePopup();
        }
      }}
      tabIndex="0"
    >
      <div className="popup__container">
        <div className="popup__title-container">
          <h2 className="popup__title">{name}</h2>
          <img src={picture} alt="Аватарка." />
        </div>
        <p className="popup__text">E-mail: {email}</p>
        <p className="popup__text">Пол: {gender}</p>
        <p className="popup__text">Локация: {location}</p>
        <p className="popup__text">Улица: {street}</p>
      </div>
    </div>
  );
}
export default Popup;
