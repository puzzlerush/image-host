import { Grid } from '@material-ui/core';
import GridItem from './GridItem';

const ImageGrid = ({ images, loading }) => {
  const imagesToDisplay = images.map((image) => <GridItem key={image._id} image={image} />)
  return (
    <>
      {imagesToDisplay.length > 0 ? (
        <Grid container spacing={4}>
          {imagesToDisplay}
        </Grid>
      ) : (
        <>
          {loading ? <p>Loading...</p> : <p>There are no images to display.</p>}
        </>
      )}
    </>
  );
}

export default ImageGrid;