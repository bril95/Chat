import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import NotFound from './Components/Pages/NotFoundPage';
import SignUpPage from './Components/Pages/SignUpPage';
import ChatMainPage from './Components/Pages/ChatMainPage'
import routes from './api/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.pages.loginPage()} element={<LoginPage />} />
        <Route path={routes.pages.notFoundPage()} element={<NotFound />} />
        <Route path={routes.pages.signUpPage()} element={<SignUpPage />} />
        <Route path={routes.pages.chatMainPage()} element={<ChatMainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
