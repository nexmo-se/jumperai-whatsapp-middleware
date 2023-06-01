import express from 'express';
const router = express.Router();

export default function Router() {
  router.get('/', async (req, res) => {
    try {
      let phone = req.query?.phone;
      console.log('phone before assignment' + phone);
      console.log('phone: ' + phone);
      res.render('index.ejs', {
        to: phone || 'UNDEFINED',
        channels: process.env.channels.split(','),
        // channels: 'whatsapp',
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
  return router;
}
