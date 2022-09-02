const core = require("@actions/core");
const github = require("@actions/github");
const data_managment = require("./data_managment");

try {
  // `who-to-greet` input defined in action metadata file
  const PATH = core.getInput("PATH");
  const METHOD = core.getInput("METHOD");
  const EXP_RES = core.getInput("EXP_RES");
  const HEADERS = core.getInput("HEADERS");
  const PAYLOAD = core.getInput("PAYLOAD");

  data_managment.clean_data(PATH);
  data_managment.clean_data(METHOD);
  data_managment.clean_data(EXP_RES);
  data_managment.clean_data(HEADERS);
  data_managment.clean_data(PAYLOAD);

  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  // Obtenga payload webhook del el evento que desencadenó el workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
} catch (error) {
  core.setFailed(error.message);
}
