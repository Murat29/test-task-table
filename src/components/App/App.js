import Table from '../Table/Table';
import Menu from '../Menu/Menu';
import Navigation from '../Navigation/Navigation';
import Popup from '../Popup/Popup';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1 className="app__title">Рандомные пользователи</h1>
      <main className="app__main">
        <Table />
        <Menu />
        <Navigation />
        <Popup />
      </main>
    </div>
  );
}

export default App;
