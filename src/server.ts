import dotenv from 'dotenv';
dotenv.config(); // MUST be first, before any other imports

import app from './app';
import fs from 'fs';
import https from 'https';

const PORT = process.env.PORT || 8502;

// Optional HTTPS setup
// const sslOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/archive/api-psp-ext.festivalcasino.com/privkey2.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/archive/api-psp-ext.festivalcasino.com/fullchain2.pem')
// }

// https.createServer(sslOptions, app).listen(PORT, () => {
//     console.log(`🚀 Server running on https://0.0.0.0:${PORT}`);
// });

app.listen(PORT, () => {
    console.log(`Server is running on port http://0.0.0.0:${PORT}`);
});
