import './Navigation.css';

function Navigation({ currentPage, maxPages, handlePageNumberButton }) {
  return (
    <div className="navigation">
      {currentPage !== 1 && (
        <button
          onClick={() => handlePageNumberButton(currentPage - 1)}
          className="navigation__btn navigation__btn_back"
        >
          Назад
        </button>
      )}
      {currentPage > 2 && (
        <button onClick={() => handlePageNumberButton(currentPage - 2)} className="navigation__btn">
          {currentPage - 2}
        </button>
      )}
      {currentPage > 1 && (
        <button onClick={() => handlePageNumberButton(currentPage - 1)} className="navigation__btn">
          {currentPage - 1}
        </button>
      )}
      <button className="navigation__btn navigation__btn_active">{currentPage}</button>
      {currentPage < maxPages && (
        <button onClick={() => handlePageNumberButton(currentPage + 1)} className="navigation__btn">
          {currentPage + 1}
        </button>
      )}
      {currentPage < maxPages - 1 && (
        <button onClick={() => handlePageNumberButton(currentPage + 2)} className="navigation__btn">
          {currentPage + 2}
        </button>
      )}
      {currentPage < maxPages && (
        <button
          onClick={() => handlePageNumberButton(currentPage + 1)}
          className="navigation__btn navigation__btn_forward"
        >
          Вперед
        </button>
      )}
    </div>
  );
}

export default Navigation;
