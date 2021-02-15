import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ImagePostPage from './components/ImagePostPage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route path="/" exact>
            <HomePage />
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
