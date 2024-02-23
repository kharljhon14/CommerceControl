import express from 'express';
import 'dotenv/config';
const app = express();

const PORT = 8000;

app.listen(PORT, () => console.log(`Listening for port: ${PORT}`));
