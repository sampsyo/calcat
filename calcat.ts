import fs = require('fs');
const icaljs = require('ical.js');

function read_string(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, function (err: any, data: any) {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
}

async function main() {
  let data = await read_string('cal.ics');
  let jcal = icaljs.parse(data);

  // Get all events.
  var comp = new icaljs.Component(jcal[1]);
  for (let vevent of comp.getAllSubcomponents('vevent')) {
    var event = new icaljs.Event(vevent);
    console.log(event);
  }
}

main();
