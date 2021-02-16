import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { logout } from '../actions/auth';

const Header = ({ isAuthenticated, username, logout }) => {
  let history = useHistory();
  return (
    <header>
      ImageHub
      <span style={{ marginLeft: 20 }}>
        <Button
          variant="contained"
          color="default"
          onClick={() => history.push('/')}
        >
          Home
        </Button>
      </span>
      <span style={{ float: "right" }}>
        {isAuthenticated ? (
          <>
            <span className="header-username">
              {username}
            </span>
            <Button
              variant="contained"
              color="default"
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
            <>
              <Button
                variant="contained"
                color="default"
                onClick={() => history.push('/login')}
              >
                Login
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