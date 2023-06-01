import { getAuth } from '../utils.js';
import axios from 'axios';
export const getTemplates = () => {
  var config = {
    method: 'get',
    url: `https://api.jumper.ai/chat/fetch-whatsapp-templates?limit=30`,
    headers: {
      Authorization: `Bearer ${process.env.jwt}`,
    },
  };
  return new Promise((res, rej) => {
    axios(config)
      .then(function (response) {
        // res(response.data.filter((e) => e.templates.status === 'APPROVED'));
        res(response.data);
      })
      .catch(function (error) {
        console.log(error);
        rej(error);
      });
  });
};

export const getTemplate = (id) => {
  if (!id) return;
  var config = {
    method: 'get',
    url: `https://api.jumper.ai/chat/get-whatsapp-template?id=${id}`,
    headers: {
      Authorization: `Bearer ${process.env.jwt}`,
    },
  };
  return new Promise((res, rej) => {
    axios(config)
      .then(function (response) {
        // res(response.data.filter((e) => e.templates.status === 'APPROVED'));
        res(response.data);
      })
      .catch(function (error) {
        console.log(error);
        rej(error);
      });
  });
};
