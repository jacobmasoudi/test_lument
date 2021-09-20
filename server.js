const express = require("express");
const CSVToJSON = require("csvtojson");
const cors = require("cors");

const app = express();

// parsing the CSV file and convert it to json using CSVToJSON package
// enabling cors for all origins so it can accept the Api calls from Api client
app.get("/data", cors(), (req, res) => {
  try {
    CSVToJSON()
      .fromFile("properties.csv")
      .then((data) => {
        // data is a JSON array

        // filtering data to get california properties only
        const californiaProprties = data.filter(
          (prop) => prop.STATE_ID === "ca"
        );
        // reformatting the properties
        const filteredProprties = californiaProprties.map((prop) => {
          let missingFieldCount = 0;

          const myArray = Object.values(prop);
          let fillCount = 0;
          let emptyCount = 0;
          let result = "";

          for (let i = 0; i < myArray.length; i++) {
            if (myArray[i] == null || myArray[i] == "") {
              if (fillCount > 0) {
                result += fillCount + ",";
                fillCount = 0;
              }
              emptyCount++;
              missingFieldCount += 1;
            } else {
              if (emptyCount > 0) {
                result += emptyCount + ",";
                emptyCount = 0;
              }
              fillCount++;
            }
          }
          // adding coma's for clarity
          if (emptyCount > 0) {
            result += emptyCount + ",";
          }
          if (fillCount > 0) {
            result += fillCount + ",";
          }

          const filteredProp = {
            PROP_NAME: prop.PROP_NAME,
            ADDRESS: prop.ADDRESS,
            CITY: prop.CITY,
            STATE_ID: prop.STATE_ID,
            ZIP: prop.ZIP,
            MISSING_FIELD_COUNT: missingFieldCount,
            MISSING_DATA_ENCODING: result,
          };
          return filteredProp;
        });
        return res.json(filteredProprties);
      })
      .catch((err) => {
        // log error if any in the conversion
        console.log(err);
        return res
          .status(400)
          .json({ msg: "Error in conversion to json", err });
      });
  } catch (error) {
    // catching any global errors
    return res.json({ msg: "Unknown Error", error });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listen on port ${PORT}`));
