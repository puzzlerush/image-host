import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ImagePostPage from './components/ImagePostPage';
import UploadPage from './components/UploadPage';
import ProfilePage from './components/ProfilePage';
import axios from './axios-config';

const App = ({ isAuthenticated, token }) => {
  if (isAuthenticated) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
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
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/profile/:username">
              <ProfilePage />
            </Route>
            <Route path="/images/:id">
              <ImagePostPage />
            </Route>
          </Switch>
      </Container>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.token,
  token: state.token
});

export default connect(mapStateToProps)(App);
