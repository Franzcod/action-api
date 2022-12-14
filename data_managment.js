const axios = require("axios");

function clean_data(data) {
  let dato = data.split("");
  let resp = "";

  dato.forEach((element) => {
    if (element !== "\n" && element !== "`") {
      resp += element;
    }
  });

  return resp;
}

function format_JSON(data) {
  let dato = JSON.stringify(data);
  dato = dato.split("");
  let resp = "";

  dato.forEach((element) => {
    if (element == "{" || element == ",") {
      resp += element + "\n" + "\t";
    } else if (element == "}") {
      resp += "\n" + element;
    } else {
      resp += element;
    }
  });

  return resp;
}

async function getDataApi(path, method, header, payload) {
  try {
    const config = {
      method,
      url: path,
      header,
      payload,
    };

    let res = await axios(config);
    return res;
  } catch (err) {
    return {
      err,
      msg: "Ocurrio un error en la peticion",
    };
  }
}

module.exports = {
  clean_data,
  getDataApi,
  format_JSON,
};
