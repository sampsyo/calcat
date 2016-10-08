import * as fs from 'fs';
import * as ICAL from 'ical.js';

/**
 * Async function to read a string from a file given its name.
 */
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

/**
 * Generate all the Events in a calendar.
 */
function* get_events(jcal: any): Iterable<ICAL.Event> {
  let comp = new ICAL.Component(jcal);
  for (let vevent of comp.getAllSubcomponents('vevent')) {
    yield new ICAL.Event(vevent);
  }
}

/**
 * Get all the occurrences of a given Event in a time range. This works on
 * both repeating and non-repeating events: non-repeating events just have
 * a single "occurrence."
 */
function* get_event_ocurrences(event: ICAL.Event, start: ICAL.Time, end: ICAL.Time) {
  if (event.isRecurring()) {
    // Multiple occurrences.
    let it = event.iterator();
    let tm: ICAL.Time | null = null;
    while (tm = it.next()) {
      if (tm.compare(end) === 1) {  // tm > end
        break;
      }
      if (tm.compare(start) !== -1) {  // tm >= start
        yield tm;
      }
    }

  } else {
    // Just one "occurrence".
    if (event.endDate.compare(start) !== -1  // endDate >= start
        && event.startDate.compare(end) !== 1) {  // startDate <= end
      yield event.startDate;
    }
  }
}

/**
 * Generate event/start-time pairs for all the occurrenes of all the events
 * in a calendar in a given range.
 */
function* get_occurrences(jcal: any, start: ICAL.Time, end: ICAL.Time):
  Iterable<[ICAL.Event, ICAL.Time]>
{
  for (let event of get_events(jcal)) {
    for (let tm of get_event_ocurrences(event, start, end)) {
      yield [event, tm];
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
  for (let [event, time] of get_occurrences(jcal, start, end)) {
    let details = event.getOccurrenceDetails(time);
    console.log(details.startDate.toString() + " " + event.summary);
  }
}

main();
