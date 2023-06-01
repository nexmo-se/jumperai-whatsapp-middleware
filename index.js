import { neru, Messages, Queue } from 'neru-alpha';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import templateRouter from './routes/templates.js';

import sendRouter from './routes/send.js';

import sendWAtemplate from './routes/sendTemplate.js';
import { listenMessages } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.NERU_APP_PORT;
const sess = neru.createSession();
const messaging = new Messages(sess);
const instanceState = neru.getInstanceState();
listenMessages(messaging);

app.get('/_/health', async (req, res) => {
  res.sendStatus(200);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/templates', templateRouter());
app.use('/send', sendRouter());
app.use('/send-template', sendWAtemplate(messaging));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
