import './Popup.css';

function Popup(props) {
  return (
    <div className={`popup ${false ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">Подробная информация</h2>
        <p className="popup__text">Город: Санкт-Петербург</p>
        <p className="popup__text">Город: Санкт-Петербург</p>
        <p className="popup__text">Город: Санкт-Петербург</p>
      </div>
    </div>
  );
}
export default Popup;
