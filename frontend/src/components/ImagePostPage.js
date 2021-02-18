import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from '../axios-config';

const ImagePostPage = ({ authenticatedUsername }) => {
  const { id } = useParams();
  const [imageInfo, setImageInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const fetchImage = async () => {
    const response = await axios.get(`/images/${id}`);
    setImageInfo(response.data);
    setNewTitle(response.data.title);
  };

  useEffect(() => {
    fetchImage();
  }, [])

  let history = useHistory();
  
  const handleEditImage = async () => {
    if (editing) {
      const response = await axios.put(`/images/${id}`, {
        title: newTitle
      });
      setEditing(false);
      window.location.reload();
    } else {
      setEditing(true);
    }
    
  }
  
  const handleDeleteImage = async () => {
    const response = await axios.delete(`/images/${id}`);
    history.push('/');
  }

  return (
    <div className="content-wrapper">
      {imageInfo ? (
        <>
          {editing ? (
            <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          ) : <div className="post-title">{imageInfo.title}</div>}
          { imageInfo.author && authenticatedUsername === imageInfo.author.name && (
            <div style={{ float: 'right' }}>
              <a href="#" style={{ marginRight: 10 }} onClick={handleEditImage}>{editing ? 'Save' : 'Edit'}</a>
              <a href="#" onClick={handleDeleteImage}>Delete</a>
            </div>
          )}
          <p>Posted by {imageInfo.author ? (
            <Link to={`/profile/${imageInfo.author.name}`}>
              {imageInfo.author.name}
            </Link>
            ) : 'Anonymous'} on {moment(imageInfo.createdAt).format('LL')}</p>

          <img src={`${process.env.REACT_APP_BACKEND_URL}/images/${id}/file`} />
        </>
      ) : (
          <p>Loading...</p>
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authenticatedUsername: state.user.name
});

export default connect(mapStateToProps)(ImagePostPage);