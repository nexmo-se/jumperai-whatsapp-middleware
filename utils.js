import { DateTime } from 'luxon';

export const OneWeekAgo = () => {
  return `${DateTime.now().minus({ weeks: 1 }).toISO().split('.')[0]}Z`;
};

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const listenMessages = async (messaging) => {
  try {
    await messaging
      .listenMessages(
        { type: null, number: null },
        {
          type: null,
          number: process.env.number,
        },
        '/onMessage'
      )
      .execute();
  } catch (e) {
    console.log('error listening inbound messages');
  }
};

export const formatNumber = (number) => {
  if (!number?.startsWith('+')) {
    return `34${number}`;
  } else {
    return number;
  }
};

export const getAuth = () => {
  return Buffer.from(`${process.env.apiKey}:${process.env.apiSecret}`).toString('base64');
};

export const getNumberParams = (text) => {
  return text.match(/[{{]/gi)?.length / 2 || undefined;
};

export const getHeaderUrl = (urlObject) => {
  const url = urlObject?.headerUrl;
  if (urlObject?.type === 'IMAGE') {
    const urlEmpty = {};
    urlEmpty[url] = 'image';
    return [urlEmpty];
  }
  if (urlObject?.type === 'DOCUMENT') {
    const urlEmpty = {};
    urlEmpty[url] = 'document';
    return [urlEmpty];
  }
  if (urlObject?.type === 'VIDEO') {
    const urlEmpty = {};
    urlEmpty[url] = 'video';
    return [urlEmpty];
  }
};

export const getButtonObject = (buttonsArray) => {
  console.log('inside getbutton object');
  const buttons = [];
  for (let button = 0; button < buttonsArray.length; button++) {
    console.log('button' + buttonsArray[button]);
    const type = buttonsArray[button]?.type.toLowerCase();
    const buttonPayload = buttonsArray[button][`button${button}`];
    if (type === 'url') {
      console.log('sending button payload' + buttonPayload);

      buttons.push({
        type: 'button',
        sub_type: 'url',
        index: button,
        parameters: [
          {
            type: 'text',
            text: buttonPayload,
          },
        ],
      });
    }
    if (type === 'quick_reply') {
      buttons.push({
        type: 'button',
        sub_type: 'quick_reply',
        index: button,
        parameters: [
          {
            type: 'payload',
            payload: buttonsArray[button]?.payload,
          },
        ],
      });
    }
  }
  return buttons;
};
