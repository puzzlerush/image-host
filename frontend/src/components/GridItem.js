import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';
import useWindowDimensions from '../hooks/dimensions';

const GridItem = ({ image }) => {
  const { width } = useWindowDimensions();
  const numColumns = width > 750 ? 4 : (width > 350 ? 2 : 1); 
  
  const useStyles = makeStyles({
    root: {
      width: `${80 / numColumns}vw`, 
      maxWidth: 275
    },
    media: {
      height: `${80 / numColumns}vw`,
      maxHeight: 275
    },
  });

  const classes = useStyles();
  
  return (
    <Grid item xs={12 / numColumns}>
      <Link to={`/images/${image._id}`} style={{ textDecoration: 'none' }}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`/images/${image._id}/file`}
              title={image.title}
            />
            <CardContent>
              <Typography component="p">
                {image.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export default GridItem;