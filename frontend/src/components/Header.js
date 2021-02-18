import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { logout } from '../actions/auth';
import axios from '../axios-config';
import useWindowDimensions from '../hooks/dimensions';

const Header = ({ isAuthenticated, username, logout }) => {
  let history = useHistory();
  const { width } = useWindowDimensions();
  return (
    <header>
      ImageHub
      <span style={{ marginLeft: 20 }}>
        <Button
          style={{ marginRight: 10 }}
          variant="contained"
          color="default"
          onClick={() => history.push('/')}
        >
          Home
        </Button>
        <Button
          variant="contained"
          color="default"
          onClick={() => history.push('/upload')}
        >
          Upload
        </Button>
      </span>
      <span style={{ float: "right" }}>
        {isAuthenticated ? (
          <>
            <span className="header-username">
              <Link to={`/profile/${username}`}>
                {username}
              </Link>
            </span>
            <Button
              variant="contained"
              color="default"
              onClick={() => {
                axios.post('/users/logout');
                delete axios.defaults.headers.common['Authorization'];
                logout();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
            <>
              <Button
                style={{ marginRight: 10 }}
                variant="contained"
                color="default"
                onClick={() => history.push('/login')}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={() => history.push('/register')}
              >
                Register
              </Button>
            </>
          )}
      </span>

    </header>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.token,
  username: state.user.name
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);