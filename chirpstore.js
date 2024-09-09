const fs = require('fs');
const path = require('path');
const chirpsFile = path.join(__dirname, 'chirps.json');
let chirps = { nextid: 0 };

//this evaluates to see if 0.25 > Math.random()
//that gives us ~ 1 in 4 chance that an error should happen
const requestShouldBreak = () => {
    return 1/4 > Math.random();
};

if(fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync(chirpsFile, 'utf8'));
}

let getChirps = () => {
    return new Promise( (resolve, reject) => {
        if(requestShouldBreak()){
            reject('Databse Error - could not get all chirps');
        }else{
            resolve(Object.assign({}, chirps));
        }
    });
}

let getChirp = id => {
    return new Promise( (resolve, reject) => {
        if(requestShouldBreak()){
            reject('Databse Error - could not get this chirp');
        }else{
            resolve(Object.assign({}, chirps[id]));
        }
    });
}

let createChirp = (chirp) => {
    return new Promise((resolve,reject) => {
        if (requestShouldBreak()){
            reject('Database error - could not create chirp');
        }else{
            chirps[chirps.nextid++] = chirp;
            writeChirps();
            resolve('Successfully added chirp');
        }
    });
};

let updateChirp = (id, chirp) => {
    return new Promise ((resolve, reject) => {
        if (requestShouldBreak()){
            reject('Database error - could not update chirp');
        }else{
            chirps[id] = chirp;
            writeChirps();
            resolve('Successfully updated chirp');
        }
    });
}

let deleteChirp = id => {
    return new Promise((resolve, reject) => {
        if (requestShouldBreak()){
            reject('Database error - could not delete chirp');
        }else{
            delete chirps[id];
            writeChirps();
            resolve('Successfully deleted chirp');
        }
    });
}

let writeChirps = () => {
    fs.writeFileSync(chirpsFile, JSON.stringify(chirps, null, 2));
};

module.exports = {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}