import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ImagePostPage from './components/ImagePostPage';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <div className="content-wrapper">
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/images/:id">
              <ImagePostPage />
            </Route>
          </Switch>
        </div>
      </Container>
    </BrowserRouter>
  );
};

export default App;
