const express = require("express");
const chirpStore = require("../../chirpstore");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const chirps = await chirpStore.GetChirps();
        delete chirps.nextid;

        const chirpsWithIDs = Object.keys(chirps).map((id) => {
            const chirp = chirps[id];
            chirp.id = id;
            return chirp;
        });

        res.json(chirpsWithIDs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});

router.get("/:id", async (req, res) => {
    const chirpId = req.params.id;
    try {
        const chirp = await chirpStore.GetChirp(chirpId);
        if (chirp) {
            res.json(chirp);
        } else {
            res.status(404).json({ message: "Chirp not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching chirp", error });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, text } = req.body;

        if (!name || typeof name !== "string" || name.length < 4 || name.length > 20) {
            res.status(400).json({ message: "Name is a required string between 4 and 20 characters" });
            return;
        }

        if (!text || typeof text !== "string" || text.length > 280) {
            res.status(400).json({ message: "Text is a required string no more than 280 characters" });
            return;
        }

        const newChirp = { name, text, timestamp: new Date().toLocaleString() };

        await chirpStore.CreateChirp(newChirp);
        res.send("chirp created");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const chirpId = parseInt(req.params.id, 10);
        const { name, text } = req.body;

        if (!name || typeof name !== "string" || name.length < 4 || name.length > 20) {
            res.status(400).json({ message: "Name is a required string between 4 and 20 characters" });
            return;
        }

        if (!text || typeof text !== "string" || text.length > 280) {
            res.status(400).json({ message: "Text is a required string no more than 280 characters" });
            return;
        }

        const updateChirp = { name, text };
        await chirpStore.UpdateChirp(chirpId, updateChirp);
        res.send("Chirp Updated");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const chirpId = parseInt(req.params.id, 10);
        await chirpStore.DeleteChirp(chirpId);
        res.send("Chirp Deleted");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});

module.exports = router;
