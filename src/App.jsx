import React, { useState, useEffect } from 'react';
import './styles.css'
import moment from 'moment';

const App = () => {

    const [input,setInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [chirps, setChirps] = useState([
        {name: 'fordBro', text: 'WranglerStar is getting a little craaazy', timestamp: 'Friday, August 9, 2024 9:00 AM'},
        {name: 'tacoBell_Official', text: 'Josh is our #1 Customer!', timestamp: 'Saturday, August 10, 2024 6:30 PM'}, 
        {name: 'yourFriendDuane', text: 'keep your head down on that golf swing!', timestamp: 'Monday, August 12, 2024 5:00 PM'}
    ]);

    useEffect(() => {
        const fetchChirps = async () => {
            try{
                const response = await fetch('http://localhost:5173/api/chirps');
                if (!response.ok) throw new Error('Newtwork response was not ok');
                const data = await response.json();
                setChirps(data);
            }catch(error){
                console.error('Error fetching chirps', error);
            }
        };
        fetchChirps();
    }, []);

    const addChirp = async (e) => {
        e.preventDefault();
        const newChirp = {name: nameInput, text: input, timestamp: moment().format('LLLL')};
        try{
            const response = await fetch('/api/chirps', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newChirp)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data  = await response.json();
            setChirps([...chirps,newChirp]);
            setInput('');
            setNameInput('');
        }catch(error){
            console.error('Error creating chirp', error);
            alert('Failed to create chirp. Please try again');
        };
    };

    return(
        <>
        <div className='appContainer'> 
            <form className='inputForm' onSubmit={addChirp} action="">
                <input placeholder='UserName' value={nameInput} className='usernameInput' onChange={(e) => setNameInput(e.target.value)} type="text" />
                <input placeholder='What are you thinking..?' value={input} onChange={(e) => setInput(e.target.value)} className='chirpInput' type="text" />
                <button type='submit' className='chirpBtn'>Chirp!</button>
            </form>
            <div className='chirpList'>
                {chirps.map((chirp, index) => (
                    <div key={index} className='chirp'>
                        <p className='chirpName'>@{chirp.name}</p>
                        <p className='chirpText'>{chirp.text}</p>
                        <p className='chirpTimeStamp'>{chirp.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default App;