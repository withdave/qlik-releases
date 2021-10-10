const fs = require("fs");
const json = require("csvtojson");
const xml = require("xml-js");

const csvData = fs.readFileSync("./qlik-releases.csv").toString();

(async function () {
  const jsonData = await json().fromString(csvData);
  const xmlData = await xml.json2xml(
    { release: jsonData },
    {
      compact: true,
      spaces: 4,
    }
  );

  fs.writeFileSync("./qlik-releases.json", JSON.stringify(jsonData, null, 4));
  fs.writeFileSync("./qlik-releases.xml", xmlData);
})();
