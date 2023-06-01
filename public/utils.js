const buildHeader = (headerType, headerParams, headerText, urlNeeded) => {
  // if (!headerText) return;
  headerParamsString = ``;
  // if (headerText) {
  headerParamsString += `<div class="mb-2" id="headerText"> ${headerText ? `Header Text: ${headerText}` : ''}</div>`;
  // }
  headerParamsString += `<div id="inputHeaderParams">`;
  if (headerParams) {
    for (let i = 1; i <= headerParams; i++) {
      headerParamsString += `<ul>
            <input placeholder="parameter ${i}"   style="max-width: 30vw" class="form-control" id="headerParam${i}" type="text" />
          </ul>`;
    }
  }
  if (headerType === 'DOCUMENT') {
    headerParamsString += `
    <div class=" p-1 mb-2" style="max-width: 30vw" id="documentContainer"> Document Name
            <input placeholder="mydocument"  style="max-width: 30vw" class="p-1 m-1 form-control" id="documentname" type="text" />
            </div> `;
  }

  if (urlNeeded) {
    headerParamsString += `<div class="mb-2 p-1" style="max-width: 30vw" id="urlContainer">${headerType} URL <input required id="${headerType}Url" class="p-1 m-1 form-control" placeholder="https://mymedia.url" type="text" /></div>`;
  }
  headerParamsString += `</div>`;

  document.getElementById('templates').insertAdjacentHTML('afterbegin', headerParamsString);
};

const buildButtons = (buttonsArray) => {
  if (!buttonsArray?.length || !buttonsArray?.find((e) => e.example)) return;

  let bodyString = `<div class="mb-2" id="buttons"><label> Buttons</label></div>
                    <div class="mb-2" id="inputButtonDiv">`;
  for (let i = 0; i < buttonsArray.length; i++) {
    if (buttonsArray[i].type === 'QUICK_REPLY') {
      console.log(buttonsArray[i]?.payload);
      bodyString += `<ul>
      <input style="max-width: 30vw" name="${buttonsArray[i]?.type}:${buttonsArray[i]?.payload}" placeholder= "button ${i}" class="form-control" id="button${i}" type="text" />
      </ul>`;
    } else if (buttonsArray[i].type === 'URL' && buttonsArray[i].example) {
      bodyString += `<ul>
        <input style="max-width: 30vw" name="${buttonsArray[i]?.type}" placeholder= "${buttonsArray[i]?.url}" class="form-control" id="button${i}" type="text" />
        </ul>`;
    }
  }

  document.getElementById('templates').insertAdjacentHTML('beforeend', bodyString);
};

const buildOptions = (data) => {
  let options = `<div class="input-group mb-3">
                <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Templates</label>
                </div>
                <select class="custom-select" id="inputGroupSelect01">`;
  options += `<option value=Select>Select template</option>`;
  data.forEach((template) => {
    options += `<option value=${template.template_name}>${template.template_name}</option>`;
  });
  options += `</select></div>`;
  document.getElementById('templates').insertAdjacentHTML('beforebegin', options);
};

const buildParamsBody = (text, numberParams, headerText) => {
  let bodyString = `<div class="mb-2" id="bodyText"><label> Body Text : ${text}</label></div>
                <div class="mb-2" id="inputParamdiv">`;
  if (numberParams) {
    for (let i = 1; i <= numberParams; i++) {
      bodyString += `<ul>
               
                <input style="max-width: 30vw" placeholder= "parameter ${i}" class="form-control" id="parameter${i}" type="text" />
                </ul>`;
    }
  }
  bodyString += `<textarea
    style="max-width: 50vw"
    maxlength="4096"
    placeholder= "${headerText || ''}\n${text}"
    class="form-control"
    disabled
    id="preview"
    name="text"
    readonly
    aria-describedby="textHelp"
    rows="3" ></textarea> </div>`;

  //   bodyString += `  <text rows="3" style="max-width: 60vw" placeholder= "${text}" class="form-control" id="preview" type="text" />  </div>`;
  document.getElementById('templates').insertAdjacentHTML('beforeend', bodyString);
};

const buildTemplateSettings = (name, id) => {
  const settingsString = `<div class="mb-2" id="settings"><label>Template Name: <span id="templateName">${name}</span></label>
 <label>Template id: <span id="templateLanguage">${id}</span></label></div>`;
  document.getElementById('templates').insertAdjacentHTML('afterbegin', settingsString);
};

const clearSettings = () => {
  const settings = document.getElementById('settings');
  if (settings) settings.remove();
};

// const setUpEventListeners = (numberParams) => {
//   for (let i = 1; i <= numberParams; i++) {
//     document.getElementById(`parameter${i}`).addEventListener('keyup', (e) => {
//       console.log('changed input');

//       let preview = document.getElementById('preview');
//       let newString = preview.placeholder.replace(`{{${i}}}`, e.target.value);
//       preview.placeholder = newString;
//     });
//   }
// };

const clearBody = () => {
  if (document.getElementById('bodyText')) {
    document.getElementById('bodyText').remove();
  }
  if (document.getElementById('inputParamdiv')) {
    document.getElementById('inputParamdiv').remove();
  }
};

const clearHeader = () => {
  if (document.getElementById('inputHeaderParams')) {
    document.getElementById('inputHeaderParams').remove();
  }

  if (document.getElementById('headerText')) {
    document.getElementById('headerText').remove();
  }
  if (document.getElementById('urlContainer')) {
    document.getElementById('urlContainer').remove();
  }
};

const clearButtons = () => {
  if (document.getElementById('buttons') && document.getElementById('inputButtonDiv')) {
    document.getElementById('buttons').remove();
    document.getElementById('inputButtonDiv').remove();
  }
};

const getNumberParams = (text) => {
  return text.match(/[{{]/gi)?.length / 2 || undefined;
};

const formatTemplateJumper = (templ) => {
  let urlNeeded;
  const bodyParams = templ.message_params?.BODY.length;
  const headerType = templ.message?.HEADER?.format;
  if (headerType === 'TEXT' || !headerType) {
    urlNeeded = false;
  } else urlNeeded = true;
  const buttonsArray = templ.message?.BUTTONS;
  const quickReplies = templ.message?.BUTTONS?.filter((button) => button.type === 'QUICK_REPLY').length;
  const urlButtons = templ.message?.BUTTONS?.filter((button) => button.type === 'URL').length;
  return {
    bodyParams: bodyParams,
    header: headerType,
    urlNeeded: urlNeeded,
    buttons: buttonsArray?.length,
    quickReplies: quickReplies,
    urlButtons,
    buttonsArray,
  };
};
