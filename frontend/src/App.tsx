import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import NotFound from './Components/Pages/NotFoundPage';
import SignUpPage from './Components/Pages/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="NotFound" element={<NotFound />} />
        <Route path="SignUpPage" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
