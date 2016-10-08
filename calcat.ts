import fs = require('fs');
const ICAL = require('ical.js');

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
  var comp = new ICAL.Component(jcal);
  for (let vevent of comp.getAllSubcomponents('vevent')) {
    var event = new ICAL.Event(vevent);
    yield event;
  }
}

/**
 * `start` and `end` are ICAL.Time instances.
 */
function* get_event_ocurrences(event: any, start: any, end: any) {
  if (event.isrecurring) {
    // Multiple occurrences.
    let it = event.iterator(start);
    let tm: any = null;
    while (tm = it.next()) {
      if (tm.compare(end) === 1) {  // tm > end
        break;
      }
      yield tm;
    }

  } else {
    // Just one "occurrence".
    if (event.endDate.compare(start) !== -1  // endDate >= start
        && event.startDate.compare(end) !== 1) {  // startDate <= end
      yield event.startDate;
    }
  }
}

async function main() {
  let data = await read_string('cal.ics');
  let jcal = ICAL.parse(data);

  // Time range.
  let now = ICAL.Time.fromJSDate(new Date());
  let start = now.startOfWeek();
  let end = now.endOfWeek();

  // Get all events.
  for (let event of get_events(jcal)) {
    for (let tm of get_event_ocurrences(event, start, end)) {
      console.log(event.summary);
      console.log(tm.toString());
    }
  }
}

main();
