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
 * Get the date on which a time falls.
 */
function dateOfTime(time: ICAL.Time): ICAL.Time {
  let timeJSON = time.toJSON();
  return new ICAL.Time({
      year: timeJSON['year'],
      month: timeJSON['month'],
      day: timeJSON['day'],
      isDate: true,
  }, time.zone);
}

/**
 * Yield strings that depict the agenda for a specific day.
 * 
 * @param when   Some time on the day of interest.
 */
function* show_agenda(info: Iterable<[ICAL.Event, ICAL.Time]>, when: ICAL.Time) {
  let date = dateOfTime(when);
  let nextDate = date.clone();
  nextDate.adjust(1, 0, 0, 0);

  yield date.toString();
  for (let [event, time] of info) {
    let details = event.getOccurrenceDetails(time);
    if (details.startDate.compare(date) !== -1 &&
        details.startDate.compare(nextDate) !== 1) {
      yield "  " + details.startDate.toString() + " " + event.summary;
    }
  }
}

/**
 * Iterate over the times in a range.
 */
function* iter_time(
  begin: ICAL.Time,
  end: ICAL.Time,
  increment: ICAL.Duration
): Iterable<ICAL.Time> {
  let t = begin.clone();
  while (t.compare(end) !== 1) {
    yield t;
    t.addDuration(increment);
  }
}

/**
 * Draw an ASCII depiction of availability.
 */
function* draw_avail(
  info: Iterable<[ICAL.Event, ICAL.Time]>,
  when: ICAL.Time,
  start_hour: number = 9,
  end_hour: number = 17,
  increment_minutes: number = 15
) {
  let date = dateOfTime(when);

  // Ranges for iteration.
  let begin = date.clone();
  (begin as any).isDate = false;  // TODO
  begin.adjust(0, start_hour, 0, 0);
  let end = date.clone();
  (end as any).isDate = false;  // TODO
  end.adjust(0, end_hour, 0, 0);
  let incr = new ICAL.Duration({ minutes: increment_minutes });

  // Build an array of availablility flags.
  let avail: boolean[] = [];
  for (let t of iter_time(begin, end, incr)) {
    avail.push(true);
  }

  // For each event, set the availability.
  for (let [event, time] of info) {
    let details = event.getOccurrenceDetails(time);
    // TODO
  }

  // Print out the availability.
  let i = 0;
  let line = date.toString() + ' ';
  for (let t of iter_time(begin, end, incr)) {
    if (t.toJSON()['minute'] === 0) {
      line += '|';
    }
    if (avail[i]) {
      line += '-';
    } else {
      line += '*';
    }
    ++i;
  }
  yield line;
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
  let now = ICAL.Time.now();
  let start = now.startOfWeek();
  let end = now.endOfWeek();
  end.adjust(7, 0, 0, 0);

  // Get all events.
  let instances = get_occurrences(jcal, start, end);
  for (let line of draw_avail(instances, now)) {
    console.log(line);
  }
}

main();
