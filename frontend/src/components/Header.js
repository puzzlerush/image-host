import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Header = () => {
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
    </header>
  );
}

export default Header;