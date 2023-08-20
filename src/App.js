import { Route, Routes } from 'react-router-dom';
// Pages
import GamePage from './pages/GamePage';

function App() {
  return (
    <Routes>
      <Route path='/' index element={<GamePage />} />
    </Routes>
  );
}

export default App;
