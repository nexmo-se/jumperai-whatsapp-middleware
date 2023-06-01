import express from 'express';
const router = express.Router();

import { isEmpty, getHeaderUrl, getButtonObject } from '../utils.js';
import { sendWa } from '../services/wa.js';

export default function Router(messaging) {
  router.post('/', async (req, res) => {
    try {
      const { params: parameters, to, name, urlObject, buttonsParamArray, id, docName } = req.body;

      console.log(req.body);
      if (!to || !name || !id) {
        return res.sendStatus(500);
      }
      let components = {};
      const parametersFormated = [];
      for (let parameter in parameters) {
        const emptyParam = {};
        emptyParam[parameters[parameter]] = 'text';
        parametersFormated.push(emptyParam);
      }
      if (!isEmpty(urlObject)) {
        const headerObject = getHeaderUrl(urlObject);
        console.log(headerObject);
        components['HEADER'] = headerObject;
        if (docName) {
          components['filename'] = docName;
        }
        // if(components['HEADER'])
      }
      if (buttonsParamArray.length) {
        console.log('buttonsParmArray');
        const buttonsObj = getButtonObject(buttonsParamArray);
        components['BUTTONS'] = buttonsObj;
      }

      components['BODY'] = parametersFormated;

      console.log(JSON.stringify(components));

      const resp = sendWa(to, JSON.stringify(components), id);
      res.json({ res: 'okay' });
    } catch (e) {
      console.log('error sending template');
      console.log(e.message);
    }
  });

  return router;
}
