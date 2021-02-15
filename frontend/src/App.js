import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
