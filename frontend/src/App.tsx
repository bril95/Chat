import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/pages/LoginPage';
import NotFound from './Components/pages/NotFoundPage';
import SignUpPage from './Components/pages/SignUpPage';
import ChatMainPage from './Components/pages/ChatMainPage'
import routes from './routes';

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
