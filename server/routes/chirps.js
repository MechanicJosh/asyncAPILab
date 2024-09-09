const express = require('express');
const chirpStore = require('../../chirpstore');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const chirps = await chirpStore.GetChirps();
        res.json(chirps);
    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }
});

router.get('/:id', async (req, res) => {
    const chirpId = req.params.id;
    try {
        const chirp = await chirpStore.GetChirp(chirpId);
        if (chirp) {
            res.json(chirp);
        } else {
            res.status(404).json({ message: 'Chirp not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chirp', error });
    }
});

router.post('/', async (req, res) => {
    try{
        const newChirp = req.body;
        await chirpStore.CreateChirp(newChirp);
        res.send('chirp created');
    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    } 
});

router.put('/:id', async (req, res) =>{
    try{
        const chirpId = parseInt(req.params.id, 10);
        const updateChirp = req.body;
        await chirpStore.UpdateChirp(chirpId, updateChirp);
        res.send('Chirp Updated');
    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const chirpId = parseInt(req.params.id, 10);
        await chirpStore.DeleteChirp(chirpId);
        res.send('Chirp Deleted');
    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    } 
});

module.exports = router;