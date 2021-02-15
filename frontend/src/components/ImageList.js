const ImageList = ({ images }) => {
  const imagesToDisplay = images.map((image) => (
    <div key={image._id}>
      <p>{image.title}</p>
      <p>Posted on {image.createdAt} by {image.author.name}</p>
      <a href={`http://localhost:5000/images/${image._id}/file`}>View</a>
    </div>
  ))
  return (
    <>
      {imagesToDisplay}
    </>
  );
}

export default ImageList;