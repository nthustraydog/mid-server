const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(dogID = '') {
  return new Promise((resolve, reject) => {
      if (!fs.existsSync('dogs-data.json')) {
          fs.writeFileSync('dogs-data.json', '');
      }

      fs.readFile('dogs-data.json', 'utf8', (err, data) => {
          if (err) reject(err);

          let dogs = data ? JSON.parse(data) : [];
          if (dogs.length > 0 && dogID) {
              dogs = dogs.filter(d => {
                  return (d.id.toLowerCase()===dogID.toLowerCase())
              });
          }
          else
            dogs = [];
          resolve(dogs);
      });
  });
}
module.exports = {
    list,
};
