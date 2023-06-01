import { formatNumber } from '../utils.js';
import axios from 'axios';
import FormData from 'form-data';
export const sendWa = async (to, componentsString, id) => {
  const vonageNumber = { type: 'whatsapp', number: process.env.number };

  try {
    const data = new FormData();
    data.append('pageid', '4885823201869824');
    data.append('conversationid', to);
    data.append('channel', 'whatsapp');
    data.append('message', `s3ndt3mpl4te_${id}`);
    data.append('messagetype', 'template');
    data.append('message_params', componentsString);

    var config = {
      method: 'post',
      url: 'https://api.jumper.ai/chat/send-message',
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ6OHJlQ0ZZdENQWTJCTFpkOE9IQWlPVFR3QXM0IiwiYXVkIjoieGhtSnBSWHlWa2ZHYnUwSmNkRXBiblM1ODlKc2tBU0dVM3hHRTJPYWFGV1dEV2htIiwiaXNzIjoidXJuOlwvXC9hcGlnZWUtZWRnZS1KV1QtcG9saWN5LXRlc3QiLCJtZXJjaGFudF9pZCI6IjYyMjQ2Nzc0MTg2OTY3MDQiLCJleHAiOjE2OTI3ODIxODksImlhdCI6MTY4NTAwNjE4OSwianRpIjoiY2MwMmZkNjUtMTIyYi00NjFjLThkMTctMWZiNmQzMzVlZTlhIn0.afkCe8pc9PutYvnFw2Bg2mA8ec6hOtTvvSROF6VsAMSU7cwAIz9s3B1wf1HOrxGl0lNhKTZnw5ISgLKHBcML-gi0dwXhPTE6mNfTnGU0nwX8fAClQTT9lNWL_FyFBxhDLs2bDnjTvaYQVzePOiqVRZY2ussdnmDiujdwYoegqHgacRQgTkqfnZ5QGns9w_p3kmdh1I2kyzERQrGtTgAAxx9mlVB_k8EKq82AHq70NiatHRpTyo2HJ7PPWTZymWy5gHCwcs0_lrtElG5uzC9FUWTLkwCFSEhe7X0ocjfGWhqATPC8dmhUSW-87ST1w_k7oV_bh-NPtnxsk9vKwP34QQ',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
    // return new Error(e.response.data.detail);
  }
};
