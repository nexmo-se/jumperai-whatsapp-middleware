import express from 'express';
const router = express.Router();
import { getTemplates, getTemplate } from '../services/templates.js';

export default function Router() {
  router.get('/', async (req, res) => {
    try {
      const templates = await getTemplates();
      res.send(templates);
    } catch (e) {
      console.log(e);

      res.status(500);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const template = await getTemplate(id);
      console.log(template);

      res.send(template);
    } catch (e) {
      console.log(e);
    }
  });

  return router;
}
