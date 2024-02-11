import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Random = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [link, setLink] = useState('');

    useEffect(() => {
        const handleRandom = async () => {
            const randomValue = Math.floor(Math.random() * 3) + 1;  //1 song 2 band 3 album

            switch (randomValue) {
                case 1:
                    try {
                        const songReq = await axios.get('http://localhost:8000/api/random/song');
                        setLink(`http://localhost:3000/song/${songReq.data.id}`);
                        setIsSelected(true);
                    } catch (error) {
                        console.error('Error fetching song:', error);
                    }
                    break;
                case 2:
                    try {
                        const bandReq = await axios.get('http://localhost:8000/api/random/band');
                        setLink(`http://localhost:3000/band/${bandReq.data.id}`);
                        setIsSelected(true);
                    } catch (error) {
                        console.error('Error fetching band:', error);
                    }
                    break;
                case 3:
                    try {
                        const albumReq = await axios.get('http://localhost:8000/api/random/album');
                        setLink(`http://localhost:3000/album/${albumReq.data.id}`);
                        setIsSelected(true);
                    } catch (error) {
                        console.error('Error fetching album:', error);
                    }
                    break;
                default:
                    break;
            }
        };

        handleRandom();
    }, []); 

    return isSelected ? <Navigate to={link} /> : null;
};

export default Random;
