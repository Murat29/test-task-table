import './Navigation.css';

function Navigation() {
  return (
    <div className="navigation">
      <button className="navigation__btn navigation__btn_back">Назад</button>
      <button className="navigation__btn">1</button>
      <button className="navigation__btn">2</button>
      <button className="navigation__btn navigation__btn_active">3</button>
      <button className="navigation__btn">4</button>
      <button className="navigation__btn">5</button>
      <button className="navigation__btn navigation__btn_forward">Вперед</button>
    </div>
  );
}

export default Navigation;
