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

function* get_events(jcal: any): Iterable<any> {
  var comp = new icaljs.Component(jcal);
  console.log(comp);
  for (let vevent of comp.getAllSubcomponents('vevent')) {
    var event = new icaljs.Event(vevent);
    yield event;
  }
}

async function main() {
  let data = await read_string('cal.ics');
  let jcal = icaljs.parse(data);

  // Get all events.
  for (let event of get_events(jcal)) {
    console.log(event);
  }
}

main();
