const core = require("@actions/core");
const github = require("@actions/github");
const data_managment = require("./data_managment");

async function main() {
  try {
    let PATH = core.getInput("PATH");
    let METHOD = core.getInput("METHOD");
    let EXP_RES = core.getInput("EXP_RES");
    let HEADERS = core.getInput("HEADERS");
    let PAYLOAD = core.getInput("PAYLOAD");

    // let PATH = "```\nhttps://jsonplaceholder.typicode.com/todos/1\n";
    // let METHOD = "GET\n";
    // let EXP_RES =
    //   '\n{\n    "userId": 1,\n    "id": 1,\n    "title": "delectus aut autem",\n    "completed": false\n}\n';
    // let HEADERS =
    //   '\n{\n  "Content-type": "application/json; charset=UTF-8"\n}\n```';
    // let PAYLOAD =
    //   '\n{\n    "title": "foo",\n    "body": "bar",\n    "userId": 1\n}\n';

    PATH = data_managment.clean_data(PATH).toLowerCase();
    METHOD = data_managment.clean_data(METHOD).toLowerCase();
    EXP_RES = JSON.parse(data_managment.clean_data(EXP_RES));
    HEADERS = JSON.parse(data_managment.clean_data(HEADERS));
    PAYLOAD = JSON.parse(data_managment.clean_data(PAYLOAD));

    let datos = await data_managment.getDataApi(PATH, METHOD, HEADERS, PAYLOAD);

    let comparation;

    console.log("DATOS       => ", datos.data);
    console.log("EXP_RES     => ", EXP_RES);
    console.log(
      "COMPARATION => ",
      JSON.stringify(datos.data) == JSON.stringify(EXP_RES)
    );

    let status_code = datos.status;
    let api_response = datos.data;
    api_response = data_managment.format_JSON(api_response);
    comparation = JSON.stringify(datos.data) == JSON.stringify(EXP_RES);

    core.setOutput("status_code", status_code);
    core.setOutput("api_response", api_response);
    core.setOutput("comparation", comparation);

    // Get the JSON webhook payload for the event that triggered the workflow
    // Obtenga payload webhook del el evento que desencadenó el workflow
    // let payload = JSON.stringify(github.context.payload, undefined, 2);
  } catch (error) {
    core.setFailed(error.message);
    core.setOutput("status_code", "-");
    core.setOutput("api_response", "-");
    core.setOutput("comparation", false);
  }
}

main();
