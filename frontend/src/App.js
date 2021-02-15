import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
