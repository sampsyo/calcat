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
  for (let vevent of comp.getAllSubcomponents('vevent')) {
    var event = new icaljs.Event(vevent);
    yield event;
  }
}

/**
 * `start` and `end` are ICAL.Time instances.
 */
function* get_event_ocurrences(event: any, start: any, end: any) {
  if (event.isrecurring) {
    let it = event.iterator(start);
    let tm: any = null;
    while (tm = it.next()) {
      if (tm.compare(end) === 1) {  // tm > end
        break;
      }
      yield tm;
    }
  }
}

async function main() {
  let data = await read_string('cal.ics');
  let jcal = icaljs.parse(data);

  // Time range.
  let start = icaljs.Time.fromDateString('2016-10-06');
  let end = icaljs.Time.fromDateString('2016-10-10');

  // Get all events.
  for (let event of get_events(jcal)) {
    console.log(event.toString());
    for (let tm of get_event_ocurrences(event, start, end)) {
      console.log(tm.toString());
    }
  }
}

main();
