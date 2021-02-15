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

const useStyles = makeStyles({
  root: {
    width: '23vw',
    maxWidth: 300
  },
  media: {
    height: '23vw',
    maxHeight: 300
  },
});

const GridItem = ({ image }) => {
  const classes = useStyles();

  return (
    <Grid item xs={3}>
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