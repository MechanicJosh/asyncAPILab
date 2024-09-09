const express = require('express');
const path = require('path');
const chirpsRouter = require('./routes/chirps');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api/chirps', chirpsRouter);

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`server started at ${new Date().toLocaleTimeString()} on port ${PORT}`));