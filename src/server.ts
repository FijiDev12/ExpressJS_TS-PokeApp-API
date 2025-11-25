import dotenv from 'dotenv';
dotenv.config(); // MUST be first

import app from './app';
import fs from 'fs';
import https from 'https';

// Always convert to number
const PORT = Number(process.env.PORT) || 8502;

// Listen on all network interfaces
const HOST = "0.0.0.0";


// OPTIONAL: HTTPS
// const sslOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/archive/api-dev-pmt.com/privkey2.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/archive/api-dev-pmt.com/fullchain2.pem')
// };


app.listen(PORT, HOST, () => {
    console.log(`🚀 API Server running at:`);
    console.log(`➡ Local Network:   http://10.20.10.114:${PORT}`);
    // console.log(`➡ Public (WAN):    http://112.198.178.39:${PORT} (requires port forwarding)`);
});