import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import ImageGrid from './ImageGrid';
import axios from '../axios-config';

const ProfilePage = () => {
    const { username } = useParams();

    const [user, setUser] = useState(null);
    const [userImages, setUserImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data: userData } = await axios.get(`/users/${username}`);
                setUser(userData);
                const { data: userImagesData } = await axios.get(`/users/${username}/images`);
                
                setUserImages(userImagesData);
                
            } catch (e) {}
            setLoading(false);
        };
        fetchUserData();
    }, [])
    return (
        <div className="content-wrapper">
            { loading ? <p>Loading...</p> : (
                user ? (
                    <>
                        <h1>{user.name}'s profile</h1>
                        <p>Joined on {moment(user.createdAt).format('LL')}</p>
                        <ImageGrid images={userImages} loading={loading} />
                    </>
                ) : (
                    <>
                        <p>No user with that name exists</p>
                    </>
                )
            ) }
        </div>
    );
};

export default ProfilePage;