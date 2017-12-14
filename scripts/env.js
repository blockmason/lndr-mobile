var _ = require('underscore');
var fs = require('fs');
var dotenv = require('dotenv');

dotenv.load();

function puts(error, stdout, stderr) { console.log(stdout) }

function configureFile(configurableFile, keys) {
  file = fs.readFileSync(configurableFile, 'utf8', puts);
  template = _.template(file);
  return template(keys)
}

var settings = JSON.parse(fs.readFileSync("./config/settings.json", 'utf8', puts));

for(var config of settings.paths) {
  content = configureFile(config.origin, process.env, puts);
  fs.writeFile(config.dest, content, puts);
}
