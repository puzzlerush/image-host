import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from '../axios-config';

const UploadPage = ({ isAuthenticated }) => {
    const [title, setTitle] = useState('');
    const [privacy, setPrivacy] = useState(false)
    const [file, setFile] = useState(null);

    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage('');
    }, [title, file])

    let history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            setMessage('Please enter a title');
        } else if (!file) {
            setMessage('Please upload an image');
        } else if (!file.name.match(/\.(png|jpg|jpeg)$/i)) {
            setMessage('File must be of type .png, .jpg, or .jpeg');
        }

        let data = new FormData();
        data.append('title', title);
        data.append('privacy', privacy);
        data.append('image', file);

        axios.post('/images', data).then((response) => {
            history.push(`/images/${response.data._id}`);
        }).catch((error) => {
            setMessage(error.message);
        });
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                {isAuthenticated && (
                    <label>
                        <input
                            type="checkbox"
                            checked={privacy}
                            onChange={(e) => setPrivacy(!privacy)}
                        />
                        {' Private'}
                    </label>
                )}

                <Button type="submit" variant="contained">
                    Upload
                </Button>
                {message && <div className="error alert">{message}</div>}
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.token
});

export default connect(mapStateToProps)(UploadPage);