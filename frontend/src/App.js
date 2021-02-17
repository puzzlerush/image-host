import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ImagePostPage from './components/ImagePostPage';
import UploadPage from './components/UploadPage';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container>

          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/upload">
              <UploadPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/images/:id">
              <ImagePostPage />
            </Route>
          </Switch>

      </Container>
    </BrowserRouter>
  );
};

export default App;
