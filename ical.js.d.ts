export class Component {
    constructor(jCal: any[]|string, parent: Component);

    /**
    * Finds first sub component, optionally filtered by name.
    *
    * @param {String=} name        Optional name to filter by
    * @return {?Component}     The found subcomponent
    */
    getFirstSubcomponent(name?: String): Component;

    /**
    * Finds all sub components, optionally filtering by name.
    *
    * @param {String=} name            Optional name to filter by
    * @return {Component[]}       The found sub components
    */
    getAllSubcomponents(name?: String): Component[];

    /**
    * Returns true when a named property exists.
    *
    * @param {String} name     The property name
    * @return {Boolean}        True, when property is found
    */
    hasProperty(name: String): Boolean;

    /**
    * Finds the first property, optionally with the given name.
    *
    * @param {String=} name        Lowercase property name
    * @return {?Property}     The found property
    */
    getFirstProperty(name?: String): Property;

    /**
    * Returns first property's value, if available.
    *
    * @param {String=} name    Lowercase property name
    * @return {?String}        The found property value.
    */
    getFirstPropertyValue(name?: String): String;

    /**
    * Get all properties in the component, optionally filtered by name.
    *
    * @param {String=} name        Lowercase property name
    * @return {Property[]}    List of properties
    */
    getAllProperties(name?: String): Property[];

    /**
    * Adds a single sub component.
    *
    * @param {Component} component        The component to add
    * @return {Component}                 The passed in component
    */
    addSubcomponent(component: Component): Component;

    /**
    * Removes a single component by name or the instance of a specific
    * component.
    *
    * @param {Component|String} nameOrComp    Name of component, or component
    * @return {Boolean}                            True when comp is removed
    */
    removeSubcomponent(nameOrComp: (Component|String)): Boolean;

    /**
    * Removes all components or (if given) all components by a particular
    * name.
    *
    * @param {String=} name            Lowercase component name
    */
    removeAllSubcomponents(name?: String): void;

    /**
    * Adds an {@link Property} to the component.
    *
    * @param {Property} property      The property to add
    * @return {Property}              The passed in property
    */
    addProperty(property: Property): Property;

    /**
    * Helper method to add a property with a value to the component.
    *
    * @param {String}               name         Property name to add
    * @param {String|Number|Object} value        Property value
    * @return {Property}                    The created property
    */
    addPropertyWithValue(name: String, value: (String|Number|Object)): Property;

    /**
    * Helper method that will update or create a property of the given name
    * and sets its value. If multiple properties with the given name exist,
    * only the first is updated.
    *
    * @param {String}               name         Property name to update
    * @param {String|Number|Object} value        Property value
    * @return {Property}                    The created property
    */
    updatePropertyWithValue(name: String, value: (String|Number|Object)): Property;

    /**
    * Removes a single property by name or the instance of the specific
    * property.
    *
    * @param {String|Property} nameOrProp     Property name or instance to remove
    * @return {Boolean}                            True, when deleted
    */
    removeProperty(nameOrProp: (String|Property)): Boolean;

    /**
    * Removes all properties associated with this component, optionally
    * filtered by name.
    *
    * @param {String=} name        Lowercase property name
    * @return {Boolean}            True, when deleted
    */
    removeAllProperties(name?: String): Boolean;

    /**
    * Returns the Object representation of this component. The returned object
    * is a live jCal object and should be cloned if modified.
    * @return {Object}
    */
    toJSON(): Object;

    /**
    * The string representation of this component.
    * @return {String}
    */
    toString(): String;

    /**
    * Create an {@link Component} by parsing the passed iCalendar string.
    *
    * @param {String} str        The iCalendar string to parse
    */
    static fromString(str: String): void;

}

/**
* @classdesc
* This class represents the "duration" value type, with various calculation
* and manipulation methods.
*
* @class
* @alias Duration
* @param {Object} data               An object with members of the duration
* @param {Number} data.weeks         Duration in weeks
* @param {Number} data.days          Duration in days
* @param {Number} data.hours         Duration in hours
* @param {Number} data.minutes       Duration in minutes
* @param {Number} data.seconds       Duration in seconds
* @param {Boolean} data.isNegative   If true, the duration is negative
*/
export class Duration {
    /**
    * @classdesc
    * This class represents the "duration" value type, with various calculation
    * and manipulation methods.
    *
    * @class
    * @alias Duration
    * @param {Object} data               An object with members of the duration
    * @param {Number} data.weeks         Duration in weeks
    * @param {Number} data.days          Duration in days
    * @param {Number} data.hours         Duration in hours
    * @param {Number} data.minutes       Duration in minutes
    * @param {Number} data.seconds       Duration in seconds
    * @param {Boolean} data.isNegative   If true, the duration is negative
    */
    constructor(data: { weeks: Number, days: Number, hours: Number, minutes: Number, seconds: Number, isNegative: Boolean });

    /**
    * The weeks in this duration
    * @type {Number}
    * @default 0
    */
    weeks: Number;

    /**
    * The days in this duration
    * @type {Number}
    * @default 0
    */
    days: Number;

    /**
    * The days in this duration
    * @type {Number}
    * @default 0
    */
    hours: Number;

    /**
    * The minutes in this duration
    * @type {Number}
    * @default 0
    */
    minutes: Number;

    /**
    * The seconds in this duration
    * @type {Number}
    * @default 0
    */
    seconds: Number;

    /**
    * The seconds in this duration
    * @type {Boolean}
    * @default false
    */
    isNegative: Boolean;

    /**
    * The class identifier.
    * @constant
    * @type {String}
    * @default "icalduration"
    */
    icalclass: String;

    /**
    * The type name, to be used in the jCal object.
    * @constant
    * @type {String}
    * @default "duration"
    */
    icaltype: String;

    /**
    * Returns a clone of the duration object.
    *
    * @return {Duration}      The cloned object
    */
    clone(): Duration;

    /**
    * The duration value expressed as a number of seconds.
    *
    * @return {Number}             The duration value in seconds
    */
    toSeconds(): Number;

    /**
    * Reads the passed seconds value into this duration object. Afterwards,
    * members like {@link Duration#days days} and {@link Duration#weeks weeks} will be set up
    * accordingly.
    *
    * @param {Number} aSeconds     The duration value in seconds
    * @return {Duration}      Returns this instance
    */
    fromSeconds(aSeconds: Number): Duration;

    /**
    * Sets up the current instance using members from the passed data object.
    *
    * @param {Object} aData               An object with members of the duration
    * @param {Number} aData.weeks         Duration in weeks
    * @param {Number} aData.days          Duration in days
    * @param {Number} aData.hours         Duration in hours
    * @param {Number} aData.minutes       Duration in minutes
    * @param {Number} aData.seconds       Duration in seconds
    * @param {Boolean} aData.isNegative   If true, the duration is negative
    */
    fromData(aData: { weeks: Number, days: Number, hours: Number, minutes: Number, seconds: Number, isNegative: Boolean }): void;

    /**
    * Resets the duration instance to the default values, i.e. PT0S
    */
    reset(): void;

    /**
    * Compares the duration instance with another one.
    *
    * @param {Duration} aOther        The instance to compare with
    * @return {Number}                     -1, 0 or 1 for less/equal/greater
    */
    compare(aOther: Duration): Number;

    /**
    * Normalizes the duration instance. For example, a duration with a value
    * of 61 seconds will be normalized to 1 minute and 1 second.
    */
    normalize(): void;

    /**
    * The string representation of this duration.
    * @return {String}
    */
    toString(): String;

    /**
    * The iCalendar string representation of this duration.
    * @return {String}
    */
    toICALString(): String;

    /**
    * Returns a new Duration instance from the passed seconds value.
    *
    * @param {Number} aSeconds       The seconds to create the instance from
    * @return {Duration}        The newly created duration instance
    */
    static fromSeconds(aSeconds: Number): Duration;

    /**
    * Checks if the given string is an iCalendar duration value.
    *
    * @param {String} value      The raw ical value
    * @return {Boolean}          True, if the given value is of the
    *                              duration ical type
    */
    static isValueString(value: String): Boolean;

    /**
    * Creates a new {@link Duration} instance from the passed string.
    *
    * @param {String} aStr       The string to parse
    * @return {Duration}    The created duration instance
    */
    static fromString(aStr: String): Duration;

    /**
    * Creates a new Duration instance from the given data object.
    *
    * @param {Object} aData               An object with members of the duration
    * @param {Number} aData.weeks         Duration in weeks
    * @param {Number} aData.days          Duration in days
    * @param {Number} aData.hours         Duration in hours
    * @param {Number} aData.minutes       Duration in minutes
    * @param {Number} aData.seconds       Duration in seconds
    * @param {Boolean} aData.isNegative   If true, the duration is negative
    * @return {Duration}             The createad duration instance
    */
    static fromData(aData: { weeks: Number, days: Number, hours: Number, minutes: Number, seconds: Number, isNegative: Boolean }): Duration;

}

/**
* js is organized into multiple layers. The bottom layer is a raw jCal
* object, followed by the component/property layer. The highest level is the
* event representation, which this class is part of. See the
* {@tutorial layers} guide for more details.
*
* @class
* @alias Event
* @param {Component=} component         The Component to base this event on
* @param {Object} options                    Options for this event
* @param {Boolean} options.strictExceptions
*          When true, will verify exceptions are related by their UUID
* @param {Array<Component|Event>} options.exceptions
*          Exceptions to this event, either as components or events
*/
export class Event {
    /**
    * @classdesc
    * js is organized into multiple layers. The bottom layer is a raw jCal
    * object, followed by the component/property layer. The highest level is the
    * event representation, which this class is part of. See the
    * {@tutorial layers} guide for more details.
    *
    * @class
    * @alias Event
    * @param {Component=} component         The Component to base this event on
    * @param {Object} options                    Options for this event
    * @param {Boolean} options.strictExceptions
    *          When true, will verify exceptions are related by their UUID
    * @param {Array<Component|Event>} options.exceptions
    *          Exceptions to this event, either as components or events
    */
    constructor(component: Component | null, options: { strictExceptions: Boolean, exceptions: (Component|Event)[] });

    /**
    * List of related event exceptions.
    *
    * @type {Event[]}
    */
    exceptions: Event[];

    /**
    * When true, will verify exceptions are related by their UUID.
    *
    * @type {Boolean}
    */
    strictExceptions: Boolean;

    /**
    * Relates a given event exception to this object.  If the given component
    * does not share the UID of this event it cannot be related and will throw
    * an exception.
    *
    * If this component is an exception it cannot have other exceptions
    * related to it.
    *
    * @param {Component|Event} obj       Component or event
    */
    relateException(obj: (Component|Event)): void;

    /**
    * Checks if this record is an exception and has the RANGE=THISANDFUTURE
    * value.
    *
    * @return {Boolean}        True, when exception is within range
    */
    modifiesFuture(): Boolean;

    /**
    * Finds the range exception nearest to the given date.
    *
    * @param {Time} time usually an occurrence time of an event
    * @return {?Event} the related event/exception or null
    */
    findRangeException(time: Time): Event;


    /**
    * Returns the occurrence details based on its start time.  If the
    * occurrence has an exception will return the details for that exception.
    *
    * NOTE: this method is intend to be used in conjunction
    *       with the {@link Event#iterator iterator} method.
    *
    * @param {Time} occurrence time occurrence
    * @return {Event.occurrenceDetails} Information about the occurrence
    */
    getOccurrenceDetails(occurrence: Time): occurrenceDetails;

    /**
    * Builds a recur expansion instance for a specific point in time (defaults
    * to startDate).
    *
    * @param {Time} startTime     Starting point for expansion
    * @return {RecurExpansion}    Expansion object
    */
    iterator(startTime?: Time): RecurExpansion;

    /**
    * Checks if the event is recurring
    *
    * @return {Boolean}        True, if event is recurring
    */
    isRecurring(): Boolean;

    /**
    * Checks if the event describes a recurrence exception. See
    * {@tutorial terminology} for details.
    *
    * @return {Boolean}    True, if the even describes a recurrence exception
    */
    isRecurrenceException(): Boolean;

    /**
    * Returns the types of recurrences this event may have.
    *
    * Returned as an object with the following possible keys:
    *
    *    - YEARLY
    *    - MONTHLY
    *    - WEEKLY
    *    - DAILY
    *    - MINUTELY
    *    - SECONDLY
    *
    * @return {Object.<Recur.frequencyValues, Boolean>}
    *          Object of recurrence flags
    */
    getRecurrenceTypes(): { [k: string]: Boolean };

    /**
    * The uid of this event
    * @type {String}
    */
    uid: String;

    /**
    * The start date
    * @type {Time}
    */
    startDate: Time;

    /**
    * The end date. This can be the result directly from the property, or the
    * end date calculated from start date and duration.
    * @type {Time}
    */
    endDate: Time;

    /**
    * The duration. This can be the result directly from the property, or the
    * duration calculated from start date and end date.
    * @type {Duration}
    * @readonly
    */
    duration: Duration;

    /**
    * The location of the event.
    * @type {String}
    */
    location: String;

    /**
    * The attendees in the event
    * @type {Property[]}
    * @readonly
    */
    attendees: Property[];

    /**
    * The event summary
    * @type {String}
    */
    summary: String;

    /**
    * The event description.
    * @type {String}
    */
    description: String;

    /**
    * The organizer value as an uri. In most cases this is a mailto: uri, but
    * it can also be something else, like urn:uuid:...
    * @type {String}
    */
    organizer: String;

    /**
    * The sequence value for this event. Used for scheduling
    * see {@tutorial terminology}.
    * @type {Number}
    */
    sequence: Number;

    /**
    * The recurrence id for this event. See {@tutorial terminology} for details.
    * @type {Time}
    */
    recurrenceId: Time;

    /**
    * Set/update a time property's value.
    * This will also update the TZID of the property.
    *
    * TODO: this method handles the case where we are switching
    * from a known timezone to an implied timezone (one without TZID).
    * This does _not_ handle the case of moving between a known
    *  (by TimezoneService) timezone to an unknown timezone...
    *
    * We will not add/remove/update the VTIMEZONE subcomponents
    *  leading to invalid ICAL data...
    * @private
    * @param {String} propName     The property name
    * @param {Time} time      The time to set
    */
    private _setTime(propName: String, time: Time): void;

    /**
    * The string representation of this event.
    * @return {String}
    */
    toString(): String;

}

export interface occurrenceDetails {
    recurrenceId: Time;
    item: Event;
    startDate: Time;
    endDate: Time;
}

/**
* Helper functions used in various places within js
* @namespace
*/
declare module helpers {
    /**
    * Checks if the given type is of the number type and also NaN.
    *
    * @param {Number} number     The number to check
    * @return {Boolean}          True, if the number is strictly NaN
    */
    function isStrictlyNaN(number: Number): Boolean;

    /**
    * Parses a string value that is expected to be an integer, when the valid is
    * not an integer throws a decoration error.
    *
    * @param {String} string     Raw string input
    * @return {Number}           Parsed integer
    */
    function strictParseInt(string: String): Number;

    /**
    * Creates or returns a class instance of a given type with the initialization
    * data if the data is not already an instance of the given type.
    *
    * @example
    * var time = new Time(...);
    * var result = helpers.formatClassType(time, Time);
    *
    * (result instanceof Time)
    * // => true
    *
    * result = helpers.formatClassType({}, Time);
    * (result isntanceof Time)
    * // => true
    *
    *
    * @param {Object} data       object initialization data
    * @param {Object} type       object type (like Time)
    * @return {?}                An instance of the found type.
    */
    function formatClassType(data: Object, type: Object): any;

    /**
    * Identical to indexOf but will only match values when they are not preceded
    * by a backslash character.
    *
    * @param {String} buffer         String to search
    * @param {String} search         Value to look for
    * @param {Number} pos            Start position
    * @return {Number}               The position, or -1 if not found
    */
    function unescapedIndexOf(buffer: String, search: String, pos: Number): Number;

    /**
    * Find the index for insertion using binary search.
    *
    * @param {Array} list            The list to search
    * @param {?} seekVal             The value to insert
    * @param {function(?,?)} cmpfunc The comparison func, that can
    *                                  compare two seekVals
    * @return {Number}               The insert position
    */
    function binsearchInsert<T>(list: T[], seekVal: T, cmpfunc: (() => any)): Number;

    /**
    * Convenience function for debug output
    * @private
    */
    function dumpn(): void;

    /**
    * Clone the passed object or primitive. By default a shallow clone will be
    * executed.
    *
    * @param {*} aSrc            The thing to clone
    * @param {Boolean=} aDeep    If true, a deep clone will be performed
    * @return {*}                The copy of the thing
    */
    function clone(aSrc: any, aDeep?: Boolean): any;

    /**
    * Performs iCalendar line folding. A line ending character is inserted and
    * the next line begins with a whitespace.
    *
    * @example
    * SUMMARY:This line will be fold
    *  ed right in the middle of a word.
    *
    * @param {String} aLine      The line to fold
    * @return {String}           The folded line
    */
    function foldline(aLine: String): String;

    /**
    * Pads the given string or number with zeros so it will have at least two
    * characters.
    *
    * @param {String|Number} data    The string or number to pad
    * @return {String}               The number padded as a string
    */
    function pad2(data: (String|Number)): String;

    /**
    * Truncates the given number, correctly handling negative numbers.
    *
    * @param {Number} number     The number to truncate
    * @return {Number}           The truncated number
    */
    function trunc(number: Number): Number;

    /**
    * Poor-man's cross-browser inheritance for JavaScript. Doesn't support all
    * the features, but enough for our usage.
    *
    * @param {Function} base     The base class constructor function.
    * @param {Function} child    The child class constructor function.
    * @param {Object} extra      Extends the prototype with extra properties
    *                              and methods
    */
    function inherits(base: (() => any), child: (() => any), extra: Object): void;

    /**
    * Poor-man's cross-browser object extension. Doesn't support all the
    * features, but enough for our usage. Note that the target's properties are
    * not overwritten with the source properties.
    *
    * @example
    * var child = helpers.extend(parent, {
    *   "bar": 123
    * });
    *
    * @param {Object} source     The object to extend
    * @param {Object} target     The object to extend with
    * @return {Object}           Returns the target.
    */
    function extend(source: Object, target: Object): Object;

}

/**
* Parses iCalendar or vCard data into a raw jCal object. Consult
* documentation on the {@tutorial layers|layers of parsing} for more
* details.
*
* @function parse
* @variation function
* @todo Fix the API to be more clear on the return type
* @param {String} input      The string data to parse
* @return {Object|Object[]}  A single jCal object, or an array thereof
*/
export function parse(input: String): (Object|Object[]);

/**
* @classdesc
* This class represents the "period" value type, with various calculation
* and manipulation methods.
*
* @description
* The passed data object cannot contain both and end date and a duration.
*
* @class
* @param {Object} aData                  An object with members of the period
* @param {Time=} aData.start        The start of the period
* @param {Time=} aData.end          The end of the period
* @param {Duration=} aData.duration The duration of the period
*/
export class Period {
    /**
    * @classdesc
    * This class represents the "period" value type, with various calculation
    * and manipulation methods.
    *
    * @description
    * The passed data object cannot contain both and end date and a duration.
    *
    * @class
    * @param {Object} aData                  An object with members of the period
    * @param {Time=} aData.start        The start of the period
    * @param {Time=} aData.end          The end of the period
    * @param {Duration=} aData.duration The duration of the period
    */
    constructor(aData: { start: Time, end: Time, duration: Duration });

    /**
    * The start of the period
    * @type {Time}
    */
    start: Time;

    /**
    * The end of the period
    * @type {Time}
    */
    end: Time;

    /**
    * The duration of the period
    * @type {Duration}
    */
    duration: Duration;

    /**
    * The class identifier.
    * @constant
    * @type {String}
    * @default "icalperiod"
    */
    icalclass: String;

    /**
    * The type name, to be used in the jCal object.
    * @constant
    * @type {String}
    * @default "period"
    */
    icaltype: String;

    /**
    * Returns a clone of the duration object.
    *
    * @return {Period}      The cloned object
    */
    clone(): Period;

    /**
    * Calculates the duration of the period, either directly or by subtracting
    * start from end date.
    *
    * @return {Duration}      The calculated duration
    */
    getDuration(): Duration;

    /**
    * Calculates the end date of the period, either directly or by adding
    * duration to start date.
    *
    * @return {Time}          The calculated end date
    */
    getEnd(): Time;

    /**
    * The string representation of this period.
    * @return {String}
    */
    toString(): String;

    /**
    * The jCal representation of this period type.
    * @return {Object}
    */
    toJSON(): Object;

    /**
    * The iCalendar string representation of this period.
    * @return {String}
    */
    toICALString(): String;

    /**
    * Creates a new {@link Period} instance from the passed string.
    *
    * @param {String} str            The string to parse
    * @param {Property} prop    The property this period will be on
    * @return {Period}          The created period instance
    */
    static fromString(str: String, prop: Property): Period;

    /**
    * Creates a new {@link Period} instance from the given data object.
    * The passed data object cannot contain both and end date and a duration.
    *
    * @param {Object} aData                  An object with members of the period
    * @param {Time=} aData.start        The start of the period
    * @param {Time=} aData.end          The end of the period
    * @param {Duration=} aData.duration The duration of the period
    * @return {Period}                  The period instance
    */
    static fromData(aData: { start: Time, end: Time, duration: Duration }): Period;

    /**
    * Returns a new period instance from the given jCal data array. The first
    * member is always the start date string, the second member is either a
    * duration or end date string.
    *
    * @param {Array<String,String>} aData    The jCal data array
    * @param {Property} aProp           The property this jCal data is on
    * @return {Period}                  The period instance
    */
    static fromJSON(aData: [string, string][], aProp: Property): Period;

}

/**
* @classdesc
* Provides a layer on top of the raw jCal object for manipulating a single
* property, with its parameters and value.
*
* @description
* Its important to note that mutations done in the wrapper
* directly mutate the jCal object used to initialize.
*
* Can also be used to create new properties by passing
* the name of the property (as a String).
*
* @class
* @alias Property
* @param {Array|String} jCal         Raw jCal representation OR
*  the new name of the property
*
* @param {Component=} parent    Parent component
*/
export class Property {
    /**
    * @classdesc
    * Provides a layer on top of the raw jCal object for manipulating a single
    * property, with its parameters and value.
    *
    * @description
    * Its important to note that mutations done in the wrapper
    * directly mutate the jCal object used to initialize.
    *
    * Can also be used to create new properties by passing
    * the name of the property (as a String).
    *
    * @class
    * @alias Property
    * @param {Array|String} jCal         Raw jCal representation OR
    *  the new name of the property
    *
    * @param {Component=} parent    Parent component
    */
    constructor(jCal: any[]|string, parent?: Component);

    /**
    * The value type for this property
    * @readonly
    * @type {String}
    */
    type: String;

    /**
    * The name of this property, in lowercase.
    * @readonly
    * @type {String}
    */
    name: String;

    /**
    * The parent component for this property.
    * @type {Component}
    */
    parent: Component;

    /**
    * Gets a parameter on the property.
    *
    * @param {String}        name   Property name (lowercase)
    * @return {Array|String}        Property value
    */
    getParameter(name: String): (any[]|String);

    /**
    * Sets a parameter on the property.
    *
    * @param {String}       name     The parameter name
    * @param {Array|String} value    The parameter value
    */
    setParameter(name: String, value: (any[]|String)): void;

    /**
    * Removes a parameter
    *
    * @param {String} name     The parameter name
    */
    removeParameter(name: String): void;

    /**
    * Get the default type based on this property's name.
    *
    * @return {String}     The default type for this property
    */
    getDefaultType(): String;

    /**
    * Sets type of property and clears out any existing values of the current
    * type.
    *
    * @param {String} type     New iCAL type (see design.*.values)
    */
    resetType(type: String): void;

    /**
    * Finds the first property value.
    *
    * @return {String}         First property value
    */
    getFirstValue(): String;

    /**
    * Gets all values on the property.
    *
    * NOTE: this creates an array during each call.
    *
    * @return {Array}          List of values
    */
    getValues(): any[];

    /**
    * Removes all values from this property
    */
    removeAllValues(): void;

    /**
    * Sets the values of the property.  Will overwrite the existing values.
    * This can only be used for multi-value properties.
    *
    * @param {Array} values    An array of values
    */
    setValues(values: any[]): void;

    /**
    * Sets the current value of the property. If this is a multi-value
    * property, all other values will be removed.
    *
    * @param {String|Object} value     New property value.
    */
    setValue(value: (String|Object)): void;

    /**
    * Returns the Object representation of this component. The returned object
    * is a live jCal object and should be cloned if modified.
    * @return {Object}
    */
    toJSON(): Object;

    /**
    * The string representation of this component.
    * @return {String}
    */
    toICALString(): String;

    /**
    * Create an {@link Property} by parsing the passed iCalendar string.
    *
    * @param {String} str                        The iCalendar string to parse
    * @param {design.designSet=} designSet  The design data to use for this property
    * @return {Property}                    The created iCalendar property
    */
    static fromString(str: String, designSet?: any): Property;

}

/**
* @classdesc
* This class represents the "recur" value type, with various calculation
* and manipulation methods.
*
* @class
* @alias Recur
* @param {Object} data                       An object with members of the recurrence
* @param {frequencyValues} freq   The frequency value
* @param {Number=} data.interval             The INTERVAL value
* @param {weekDay=} data.wkst      The week start value
* @param {Time=} data.until             The end of the recurrence set
* @param {Number=} data.count                The number of occurrences
* @param {Array.<Number>=} data.bysecond     The seconds for the BYSECOND part
* @param {Array.<Number>=} data.byminute     The minutes for the BYMINUTE part
* @param {Array.<Number>=} data.byhour       The hours for the BYHOUR part
* @param {Array.<String>=} data.byday        The BYDAY values
* @param {Array.<Number>=} data.bymonthday   The days for the BYMONTHDAY part
* @param {Array.<Number>=} data.byyearday    The days for the BYYEARDAY part
* @param {Array.<Number>=} data.byweekno     The weeks for the BYWEEKNO part
* @param {Array.<Number>=} data.bymonth      The month for the BYMONTH part
* @param {Array.<Number>=} data.bysetpos     The positionals for the BYSETPOS part
*/
export class Recur {
    /**
    * @classdesc
    * This class represents the "recur" value type, with various calculation
    * and manipulation methods.
    *
    * @class
    * @alias Recur
    * @param {Object} data                       An object with members of the recurrence
    * @param {frequencyValues} freq   The frequency value
    * @param {Number=} data.interval             The INTERVAL value
    * @param {weekDay=} data.wkst      The week start value
    * @param {Time=} data.until             The end of the recurrence set
    * @param {Number=} data.count                The number of occurrences
    * @param {Array.<Number>=} data.bysecond     The seconds for the BYSECOND part
    * @param {Array.<Number>=} data.byminute     The minutes for the BYMINUTE part
    * @param {Array.<Number>=} data.byhour       The hours for the BYHOUR part
    * @param {Array.<String>=} data.byday        The BYDAY values
    * @param {Array.<Number>=} data.bymonthday   The days for the BYMONTHDAY part
    * @param {Array.<Number>=} data.byyearday    The days for the BYYEARDAY part
    * @param {Array.<Number>=} data.byweekno     The weeks for the BYWEEKNO part
    * @param {Array.<Number>=} data.bymonth      The month for the BYMONTH part
    * @param {Array.<Number>=} data.bysetpos     The positionals for the BYSETPOS part
    */
    constructor(data: { interval: Number, wkst: weekDay, until: Time, count: Number, bysecond: Number[], byminute: Number[], byhour: Number[], byday: String[], bymonthday: Number[], byyearday: Number[], byweekno: Number[], bymonth: Number[], bysetpos: Number[] }, freq: frequencyValues);

    /**
    * An object holding the BY-parts of the recurrence rule
    * @type {Object}
    */
    parts: Object;

    /**
    * The interval value for the recurrence rule.
    * @type {Number}
    */
    interval: Number;

    /**
    * The week start day
    *
    * @type {weekDay}
    * @default Time.MONDAY
    */
    wkst: weekDay;

    /**
    * The end of the recurrence
    * @type {?Time}
    */
    until: Time;

    /**
    * The maximum number of occurrences
    * @type {?Number}
    */
    count: Number;

    /**
    * The frequency value.
    * @type {Recur.frequencyValues}
    */
    freq: frequencyValues;

    /**
    * The class identifier.
    * @constant
    * @type {String}
    * @default "icalrecur"
    */
    icalclass: String;

    /**
    * The type name, to be used in the jCal object.
    * @constant
    * @type {String}
    * @default "recur"
    */
    icaltype: String;

    /**
    * Create a new iterator for this recurrence rule. The passed start date
    * must be the start date of the event, not the start of the range to
    * search in.
    *
    * @example
    * var recur = comp.getFirstPropertyValue('rrule');
    * var dtstart = comp.getFirstPropertyValue('dtstart');
    * var iter = recur.iterator(dtstart);
    * for (var next = iter.next(); next; next = iter.next()) {
    *   if (next.compare(rangeStart) < 0) {
    *     continue;
    *   }
    *   console.log(next.toString());
    * }
    *
    * @param {Time} aStart        The item's start date
    * @return {RecurIterator}     The recurrence iterator
    */
    iterator(aStart: Time): RecurIterator;

    /**
    * Returns a clone of the recurrence object.
    *
    * @return {Recur}      The cloned object
    */
    clone(): Recur;

    /**
    * Checks if the current rule is finite, i.e. has a count or until part.
    *
    * @return {Boolean}        True, if the rule is finite
    */
    isFinite(): Boolean;

    /**
    * Checks if the current rule has a count part, and not limited by an until
    * part.
    *
    * @return {Boolean}        True, if the rule is by count
    */
    isByCount(): Boolean;

    /**
    * Adds a component (part) to the recurrence rule. This is not a component
    * in the sense of {@link Component}, but a part of the recurrence
    * rule, i.e. BYMONTH.
    *
    * @param {String} aType            The name of the component part
    * @param {Array|String} aValue     The component value
    */
    addComponent(aType: String, aValue: (any[]|String)): void;

    /**
    * Sets the component value for the given by-part.
    *
    * @param {String} aType        The component part name
    * @param {Array} aValues       The component values
    */
    setComponent(aType: String, aValues: any[]): void;

    /**
    * Gets (a copy) of the requested component value.
    *
    * @param {String} aType        The component part name
    * @return {Array}              The component part value
    */
    getComponent(aType: String): any[];

    /**
    * Retrieves the next occurrence after the given recurrence id. See the
    * guide on {@tutorial terminology} for more details.
    *
    * NOTE: Currently, this method iterates all occurrences from the start
    * date. It should not be called in a loop for performance reasons. If you
    * would like to get more than one occurrence, you can iterate the
    * occurrences manually, see the example on the
    * {@link Recur#iterator iterator} method.
    *
    * @param {Time} aStartTime        The start of the event series
    * @param {Time} aRecurrenceId     The date of the last occurrence
    * @return {Time}                  The next occurrence after
    */
    getNextOccurrence(aStartTime: Time, aRecurrenceId: Time): Time;

    /**
    * Sets up the current instance using members from the passed data object.
    *
    * @param {Object} data                       An object with members of the recurrence
    * @param {Recur.frequencyValues} freq   The frequency value
    * @param {Number=} data.interval             The INTERVAL value
    * @param {weekDay=} data.wkst      The week start value
    * @param {Time=} data.until             The end of the recurrence set
    * @param {Number=} data.count                The number of occurrences
    * @param {Array.<Number>=} data.bysecond     The seconds for the BYSECOND part
    * @param {Array.<Number>=} data.byminute     The minutes for the BYMINUTE part
    * @param {Array.<Number>=} data.byhour       The hours for the BYHOUR part
    * @param {Array.<String>=} data.byday        The BYDAY values
    * @param {Array.<Number>=} data.bymonthday   The days for the BYMONTHDAY part
    * @param {Array.<Number>=} data.byyearday    The days for the BYYEARDAY part
    * @param {Array.<Number>=} data.byweekno     The weeks for the BYWEEKNO part
    * @param {Array.<Number>=} data.bymonth      The month for the BYMONTH part
    * @param {Array.<Number>=} data.bysetpos     The positionals for the BYSETPOS part
    */
    fromData(data: { interval: Number, wkst: weekDay, until: Time, count: Number, bysecond: Number[], byminute: Number[], byhour: Number[], byday: String[], bymonthday: Number[], byyearday: Number[], byweekno: Number[], bymonth: Number[], bysetpos: Number[] }, freq: frequencyValues): void;

    /**
    * The jCal representation of this recurrence type.
    * @return {Object}
    */
    toJSON(): Object;

    /**
    * The string representation of this recurrence rule.
    * @return {String}
    */
    toString(): String;

    /**
    * Convert an ical representation of a day (SU, MO, etc..)
    * into a numeric value of that day.
    *
    * @param {String} string     The iCalendar day name
    * @return {Number}           Numeric value of given day
    */
    static icalDayToNumericDay(string: String): Number;

    /**
    * Convert a numeric day value into its ical representation (SU, MO, etc..)
    *
    * @param {Number} num        Numeric value of given day
    * @return {String}           The ICAL day value, e.g SU,MO,...
    */
    static numericDayToIcalDay(num: Number): String;

    /**
    * Creates a new {@link Recur} instance from the passed string.
    *
    * @param {String} string         The string to parse
    * @return {Recur}           The created recurrence instance
    */
    static fromString(string: String): Recur;

    /**
    * Creates a new {@link Recur} instance using members from the passed
    * data object.
    *
    * @param {Object} aData                      An object with members of the recurrence
    * @param {frequencyValues} freq   The frequency value
    * @param {Number=} aData.interval            The INTERVAL value
    * @param {weekDay=} aData.wkst     The week start value
    * @param {Time=} aData.until            The end of the recurrence set
    * @param {Number=} aData.count               The number of occurrences
    * @param {Array.<Number>=} aData.bysecond    The seconds for the BYSECOND part
    * @param {Array.<Number>=} aData.byminute    The minutes for the BYMINUTE part
    * @param {Array.<Number>=} aData.byhour      The hours for the BYHOUR part
    * @param {Array.<String>=} aData.byday       The BYDAY values
    * @param {Array.<Number>=} aData.bymonthday  The days for the BYMONTHDAY part
    * @param {Array.<Number>=} aData.byyearday   The days for the BYYEARDAY part
    * @param {Array.<Number>=} aData.byweekno    The weeks for the BYWEEKNO part
    * @param {Array.<Number>=} aData.bymonth     The month for the BYMONTH part
    * @param {Array.<Number>=} aData.bysetpos    The positionals for the BYSETPOS part
    */
    static fromData(aData: { interval: Number, wkst: weekDay, until: Time, count: Number, bysecond: Number[], byminute: Number[], byhour: Number[], byday: String[], bymonthday: Number[], byyearday: Number[], byweekno: Number[], bymonth: Number[], bysetpos: Number[] }, freq: frequencyValues): void;

    /**
    * Converts a recurrence string to a data object, suitable for the fromData
    * method.
    *
    * @param {String} string     The string to parse
    * @param {Boolean} fmtIcal   If true, the string is considered to be an
    *                              iCalendar string
    * @return {Recur}       The recurrence instance
    */
    static _stringToData(string: String, fmtIcal: Boolean): Recur;

}

/**
* Possible frequency values for the FREQ part
* (YEARLY, MONTHLY, WEEKLY, DAILY, HOURLY, MINUTELY, SECONDLY)
*
* @typedef {String} frequencyValues
* @memberof Recur
*/
type frequencyValues = string;

/**
* @classdesc
* Primary class for expanding recurring rules.  Can take multiple rrules,
* rdates, exdate(s) and iterate (in order) over each next occurrence.
*
* Once initialized this class can also be serialized saved and continue
* iteration from the last point.
*
* NOTE: it is intended that this class is to be used
*       with Event which handles recurrence exceptions.
*
* @example
* // assuming event is a parsed ical component
* var event;
*
* var expand = new RecurExpansion({
*   component: event,
*   dtstart: event.getFirstPropertyValue('dtstart')
* });
*
* // remember there are infinite rules
* // so its a good idea to limit the scope
* // of the iterations then resume later on.
*
* // next is always an Time or null
* var next;
*
* while (someCondition && (next = expand.next())) {
*   // do something with next
* }
*
* // save instance for later
* var json = JSON.stringify(expand);
*
* //...
*
* // NOTE: if the component's properties have
* //       changed you will need to rebuild the
* //       class and start over. This only works
* //       when the component's recurrence info is the same.
* var expand = new RecurExpansion(JSON.parse(json));
*
* @description
* The options object can be filled with the specified initial values. It can
* also contain additional members, as a result of serializing a previous
* expansion state, as shown in the example.
*
* @class
* @alias RecurExpansion
* @param {Object} options
*        Recurrence expansion options
* @param {Time} options.dtstart
*        Start time of the event
* @param {Component=} options.component
*        Component for expansion, required if not resuming.
*/
export class RecurExpansion {
    /**
    * @classdesc
    * Primary class for expanding recurring rules.  Can take multiple rrules,
    * rdates, exdate(s) and iterate (in order) over each next occurrence.
    *
    * Once initialized this class can also be serialized saved and continue
    * iteration from the last point.
    *
    * NOTE: it is intended that this class is to be used
    *       with Event which handles recurrence exceptions.
    *
    * @example
    * // assuming event is a parsed ical component
    * var event;
    *
    * var expand = new RecurExpansion({
    *   component: event,
    *   dtstart: event.getFirstPropertyValue('dtstart')
    * });
    *
    * // remember there are infinite rules
    * // so its a good idea to limit the scope
    * // of the iterations then resume later on.
    *
    * // next is always an Time or null
    * var next;
    *
    * while (someCondition && (next = expand.next())) {
    *   // do something with next
    * }
    *
    * // save instance for later
    * var json = JSON.stringify(expand);
    *
    * //...
    *
    * // NOTE: if the component's properties have
    * //       changed you will need to rebuild the
    * //       class and start over. This only works
    * //       when the component's recurrence info is the same.
    * var expand = new RecurExpansion(JSON.parse(json));
    *
    * @description
    * The options object can be filled with the specified initial values. It can
    * also contain additional members, as a result of serializing a previous
    * expansion state, as shown in the example.
    *
    * @class
    * @alias RecurExpansion
    * @param {Object} options
    *        Recurrence expansion options
    * @param {Time} options.dtstart
    *        Start time of the event
    * @param {Component=} options.component
    *        Component for expansion, required if not resuming.
    */
    constructor(options: { dtstart: Time, component: Component });

    /**
    * True when iteration is fully completed.
    * @type {Boolean}
    */
    complete: Boolean;

    /**
    * Array of rrule iterators.
    *
    * @type {RecurIterator[]}
    * @private
    */
    private ruleIterators: RecurIterator[];

    /**
    * Array of rdate instances.
    *
    * @type {Time[]}
    * @private
    */
    private ruleDates: Time[];

    /**
    * Array of exdate instances.
    *
    * @type {Time[]}
    * @private
    */
    private exDates: Time[];

    /**
    * Current position in ruleDates array.
    * @type {Number}
    * @private
    */
    private ruleDateInc: Number;

    /**
    * Current position in exDates array
    * @type {Number}
    * @private
    */
    private exDateInc: Number;

    /**
    * Current negative date.
    *
    * @type {Time}
    * @private
    */
    private exDate: Time;

    /**
    * Current additional date.
    *
    * @type {Time}
    * @private
    */
    private ruleDate: Time;

    /**
    * Start date of recurring rules.
    *
    * @type {Time}
    */
    dtstart: Time;

    /**
    * Last expanded time
    *
    * @type {Time}
    */
    last: Time;

    /**
    * Initialize the recurrence expansion from the data object. The options
    * object may also contain additional members, see the
    * {@link RecurExpansion constructor} for more details.
    *
    * @param {Object} options
    *        Recurrence expansion options
    * @param {Time} options.dtstart
    *        Start time of the event
    * @param {Component=} options.component
    *        Component for expansion, required if not resuming.
    */
    fromData(options: { dtstart: Time, component: Component }): void;

    /**
    * Retrieve the next occurrence in the series.
    * @return {Time}
    */
    next(): Time;

    /**
    * Converts object into a serialize-able format. This format can be passed
    * back into the expansion to resume iteration.
    * @return {Object}
    */
    toJSON(): Object;

    /**
    * Extract all dates from the properties in the given component. The
    * properties will be filtered by the property name.
    *
    * @private
    * @param {Component} component        The component to search in
    * @param {String} propertyName             The property name to search for
    * @return {Time[]}                    The extracted dates.
    */
    private _extractDates(component: Component, propertyName: String): Time[];

    /**
    * Initialize the recurrence expansion.
    *
    * @private
    * @param {Component} component    The component to initialize from.
    */
    private _init(component: Component): void;

    /**
    * Advance to the next exdate
    * @private
    */
    private _nextExDay(): void;

    /**
    * Advance to the next rule date
    * @private
    */
    private _nextRuleDay(): void;

    /**
    * Find and return the recurrence rule with the most recent event and
    * return it.
    *
    * @private
    * @return {?RecurIterator}    Found iterator.
    */
    private _nextRecurrenceIter(): RecurIterator;

}

/**
* @classdesc
* An iterator for a single recurrence rule. This class usually doesn't have
* to be instanciated directly, the convenience method
* {@link Recur#iterator} can be used.
*
* @description
* The options object may contain additional members when resuming iteration from a previous run
*
* @description
* The options object may contain additional members when resuming iteration
* from a previous run.
*
* @class
* @alias RecurIterator
* @param {Object} options                The iterator options
* @param {Recur} options.rule       The rule to iterate.
* @param {Time} options.dtstart     The start date of the event.
* @param {Boolean=} options.initialized  When true, assume that options are
*        from a previously constructed iterator. Initialization will not be
*        repeated.
*/
export class RecurIterator {
    /**
    * @classdesc
    * An iterator for a single recurrence rule. This class usually doesn't have
    * to be instanciated directly, the convenience method
    * {@link Recur#iterator} can be used.
    *
    * @description
    * The options object may contain additional members when resuming iteration from a previous run
    *
    * @description
    * The options object may contain additional members when resuming iteration
    * from a previous run.
    *
    * @class
    * @alias RecurIterator
    * @param {Object} options                The iterator options
    * @param {Recur} options.rule       The rule to iterate.
    * @param {Time} options.dtstart     The start date of the event.
    * @param {Boolean=} options.initialized  When true, assume that options are
    *        from a previously constructed iterator. Initialization will not be
    *        repeated.
    */
    constructor(options: { rule: Recur, dtstart: Time, initialized: Boolean });

    /**
    * True when iteration is finished.
    * @type {Boolean}
    */
    completed: Boolean;

    /**
    * The rule that is being iterated
    * @type {Recur}
    */
    rule: Recur;

    /**
    * The start date of the event being iterated.
    * @type {Time}
    */
    dtstart: Time;

    /**
    * The last occurrence that was returned from the
    * {@link RecurIterator#next} method.
    * @type {Time}
    */
    last: Time;

    /**
    * The sequence number from the occurrence
    * @type {Number}
    */
    occurrence_number: Number;

    /**
    * The indices used for the {@link RecurIterator#by_data} object.
    * @type {Object}
    * @private
    */
    private by_indices: Object;

    /**
    * If true, the iterator has already been initialized
    * @type {Boolean}
    * @private
    */
    private initialized: Boolean;

    /**
    * The initializd by-data.
    * @type {Object}
    * @private
    */
    private by_data: Object;

    /**
    * The expanded yeardays
    * @type {Array}
    * @private
    */
    private days: any[];

    /**
    * The index in the {@link RecurIterator#days} array.
    * @type {Number}
    * @private
    */
    private days_index: Number;

    /**
    * Initialize the recurrence iterator from the passed data object. This
    * method is usually not called directly, you can initialize the iterator
    * through the constructor.
    *
    * @param {Object} options                The iterator options
    * @param {Recur} options.rule       The rule to iterate.
    * @param {Time} options.dtstart     The start date of the event.
    * @param {Boolean=} options.initialized  When true, assume that options are
    *        from a previously constructed iterator. Initialization will not be
    *        repeated.
    */
    fromData(options: { rule: Recur, dtstart: Time, initialized: Boolean }): void;

    /**
    * Intialize the iterator
    * @private
    */
    private init(): void;

    /**
    * Retrieve the next occurrence from the iterator.
    * @return {Time}
    */
    next(): Time;

    /**
    * Normalize each by day rule for a given year/month.
    * Takes into account ordering and negative rules
    *
    * @private
    * @param {Number} year         Current year.
    * @param {Number} month        Current month.
    * @param {Array}  rules        Array of rules.
    *
    * @return {Array} sorted and normalized rules.
    *                 Negative rules will be expanded to their
    *                 correct positive values for easier processing.
    */
    private normalizeByMonthDayRules(year: Number, month: Number, rules: any[]): any[];

    /**
    * NOTES:
    * We are given a list of dates in the month (BYMONTHDAY) (23, etc..)
    * Also we are given a list of days (BYDAY) (MO, 2SU, etc..) when
    * both conditions match a given date (this.last.day) iteration stops.
    *
    * @private
    * @param {Boolean=} isInit     When given true will not increment the
    *                                current day (this.last).
    */
    private _byDayAndMonthDay(isInit?: Boolean): void;

    /**
    * Checks if given value is in BYSETPOS.
    *
    * @private
    * @param {Numeric} aPos position to check for.
    * @return {Boolean} false unless BYSETPOS rules exist
    *                   and the given value is present in rules.
    */
    private check_set_position(aPos: number): boolean;

    /**
    * Convert iterator into a serialize-able object.  Will preserve current
    * iteration sequence to ensure the seamless continuation of the recurrence
    * rule.
    * @return {Object}
    */
    toJSON(): Object;

}

/**
* Convert a full jCal/jCard array into a iCalendar/vCard string.
*
* @function stringify
* @variation function
* @param {Array} jCal    The jCal/jCard document
* @return {String}       The stringified iCalendar/vCard document
*/
export function stringify(jCal: any[]): String;

/**
* @classdesc
* iCalendar Time representation (similar to JS Date object).  Fully
* independent of system (OS) timezone / time.  Unlike JS Date, the month
* January is 1, not zero.
*
* @example
* var time = new Time({
*   year: 2012,
*   month: 10,
*   day: 11
*   minute: 0,
*   second: 0,
*   isDate: false
* });
*
*
* @alias Time
* @class
* @param {Object} data           Time initialization
* @param {Number=} data.year     The year for this date
* @param {Number=} data.month    The month for this date
* @param {Number=} data.day      The day for this date
* @param {Number=} data.hour     The hour for this date
* @param {Number=} data.minute   The minute for this date
* @param {Number=} data.second   The second for this date
* @param {Boolean=} data.isDate  If true, the instance represents a date (as
*                                  opposed to a date-time)
* @param {Timezone} zone timezone this position occurs in
*/
export class Time {
    /**
    * @classdesc
    * iCalendar Time representation (similar to JS Date object).  Fully
    * independent of system (OS) timezone / time.  Unlike JS Date, the month
    * January is 1, not zero.
    *
    * @example
    * var time = new Time({
    *   year: 2012,
    *   month: 10,
    *   day: 11
    *   minute: 0,
    *   second: 0,
    *   isDate: false
    * });
    *
    *
    * @alias Time
    * @class
    * @param {Object} data           Time initialization
    * @param {Number=} data.year     The year for this date
    * @param {Number=} data.month    The month for this date
    * @param {Number=} data.day      The day for this date
    * @param {Number=} data.hour     The hour for this date
    * @param {Number=} data.minute   The minute for this date
    * @param {Number=} data.second   The second for this date
    * @param {Boolean=} data.isDate  If true, the instance represents a date (as
    *                                  opposed to a date-time)
    * @param {Timezone} zone timezone this position occurs in
    */
    constructor(data: { year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number, isDate: Boolean }, zone: Timezone);

    /**
    * The class identifier.
    * @constant
    * @type {String}
    * @default "icaltime"
    */
    icalclass: String;

    /**
    * The type name, to be used in the jCal object. This value may change and
    * is strictly defined by the {@link Time#isDate isDate} member.
    * @readonly
    * @type {String}
    * @default "date-time"
    */
    icaltype: String;

    /**
    * The timezone for this time.
    * @type {Timezone}
    */
    zone: Timezone;

    /**
    * Internal uses to indicate that a change has been made and the next read
    * operation must attempt to normalize the value (for example changing the
    * day to 33).
    *
    * @type {Boolean}
    * @private
    */
    private _pendingNormalization: Boolean;

    /**
    * Returns a clone of the time object.
    *
    * @return {Time}              The cloned object
    */
    clone(): Time;

    /**
    * Reset the time instance to epoch time
    */
    reset(): void;

    /**
    * Reset the time instance to the given date/time values.
    *
    * @param {Number} year             The year to set
    * @param {Number} month            The month to set
    * @param {Number} day              The day to set
    * @param {Number} hour             The hour to set
    * @param {Number} minute           The minute to set
    * @param {Number} second           The second to set
    * @param {Timezone} timezone  The timezone to set
    */
    resetTo(year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number, timezone: Timezone): void;

    /**
    * Set up the current instance from the Javascript date value.
    *
    * @param {?Date} aDate     The Javascript Date to read, or null to reset
    * @param {Boolean} useUTC  If true, the UTC values of the date will be used
    */
    fromJSDate(aDate: Date | null, useUTC: Boolean): void;

    /**
    * Sets up the current instance using members from the passed data object.
    *
    * @param {Object} aData            Time initialization
    * @param {Number=} aData.year      The year for this date
    * @param {Number=} aData.month     The month for this date
    * @param {Number=} aData.day       The day for this date
    * @param {Number=} aData.hour      The hour for this date
    * @param {Number=} aData.minute    The minute for this date
    * @param {Number=} aData.second    The second for this date
    * @param {Boolean=} aData.isDate   If true, the instance represents a date
    *                                    (as opposed to a date-time)
    * @param {Timezone=} aZone    Timezone this position occurs in
    */
    fromData(aData: { year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number, isDate: Boolean }, aZone?: Timezone): void;

    /**
    * Calculate the day of week.
    * @return {weekDay}
    */
    dayOfWeek(): weekDay;

    /**
    * Calculate the day of year.
    * @return {Number}
    */
    dayOfYear(): Number;

    /**
    * Returns a copy of the current date/time, rewound to the start of the
    * week. The resulting Time instance is of icaltype date, even if this
    * is a date-time.
    *
    * @param {weekDay=} aWeekStart
    *        The week start weekday, defaults to SUNDAY
    * @return {Time}      The start of the week (cloned)
    */
    startOfWeek(aWeekStart?: weekDay): Time;

    /**
    * Returns a copy of the current date/time, shifted to the end of the week.
    * The resulting Time instance is of icaltype date, even if this is a
    * date-time.
    *
    * @param {weekDay=} aWeekStart
    *        The week start weekday, defaults to SUNDAY
    * @return {Time}      The end of the week (cloned)
    */
    endOfWeek(aWeekStart?: weekDay): Time;

    /**
    * Returns a copy of the current date/time, rewound to the start of the
    * month. The resulting Time instance is of icaltype date, even if
    * this is a date-time.
    *
    * @return {Time}      The start of the month (cloned)
    */
    startOfMonth(): Time;

    /**
    * Returns a copy of the current date/time, shifted to the end of the
    * month.  The resulting Time instance is of icaltype date, even if
    * this is a date-time.
    *
    * @return {Time}      The end of the month (cloned)
    */
    endOfMonth(): Time;

    /**
    * Returns a copy of the current date/time, rewound to the start of the
    * year. The resulting Time instance is of icaltype date, even if
    * this is a date-time.
    *
    * @return {Time}      The start of the year (cloned)
    */
    startOfYear(): Time;

    /**
    * Returns a copy of the current date/time, shifted to the end of the
    * year.  The resulting Time instance is of icaltype date, even if
    * this is a date-time.
    *
    * @return {Time}      The end of the year (cloned)
    */
    endOfYear(): Time;

    /**
    * First calculates the start of the week, then returns the day of year for
    * this date. If the day falls into the previous year, the day is zero or negative.
    *
    * @param {weekDay=} aFirstDayOfWeek
    *        The week start weekday, defaults to SUNDAY
    * @return {Number}     The calculated day of year
    */
    startDoyWeek(aFirstDayOfWeek?: weekDay): Number;

    /**
    * Get the dominical letter for the current year. Letters range from A - G
    * for common years, and AG to GF for leap years.
    *
    * @param {Number} yr           The year to retrieve the letter for
    * @return {String}             The dominical letter.
    */
    getDominicalLetter(yr: Number): String;

    /**
    * Finds the nthWeekDay relative to the current month (not day).  The
    * returned value is a day relative the month that this month belongs to so
    * 1 would indicate the first of the month and 40 would indicate a day in
    * the following month.
    *
    * @param {Number} aDayOfWeek   Day of the week see the day name constants
    * @param {Number} aPos         Nth occurrence of a given week day values
    *        of 1 and 0 both indicate the first weekday of that type. aPos may
    *        be either positive or negative
    *
    * @return {Number} numeric value indicating a day relative
    *                   to the current month of this time object
    */
    nthWeekDay(aDayOfWeek: Number, aPos: Number): Number;

    /**
    * Checks if current time is the nth weekday, relative to the current
    * month.  Will always return false when rule resolves outside of current
    * month.
    *
    * @param {weekDay} aDayOfWeek       Day of week to check
    * @param {Number} aPos                        Relative position
    * @return {Boolean}                           True, if its the nth weekday
    */
    isNthWeekDay(aDayOfWeek: weekDay, aPos: Number): Boolean;

    /**
    * Calculates the ISO 8601 week number. The first week of a year is the
    * week that contains the first Thursday. The year can have 53 weeks, if
    * January 1st is a Friday.
    *
    * Note there are regions where the first week of the year is the one that
    * starts on January 1st, which may offset the week number. Also, if a
    * different week start is specified, this will also affect the week
    * number.
    *
    * @see Time.weekOneStarts
    * @param {weekDay} aWeekStart        The weekday the week starts with
    * @return {Number}                             The ISO week number
    */
    weekNumber(aWeekStart: weekDay): Number;

    /**
    * Adds the duration to the current time. The instance is modified in
    * place.
    *
    * @param {Duration} aDuration         The duration to add
    */
    addDuration(aDuration: Duration): void;

    /**
    * Subtract the date details (_excluding_ timezone).  Useful for finding
    * the relative difference between two time objects excluding their
    * timezone differences.
    *
    * @param {Time} aDate     The date to substract
    * @return {Duration}      The difference as a duration
    */
    subtractDate(aDate: Time): Duration;

    /**
    * Subtract the date details, taking timezones into account.
    *
    * @param {Time} aDate  The date to subtract
    * @return {Duration}  The difference in duration
    */
    subtractDateTz(aDate: Time): Duration;

    /**
    * Compares the Time instance with another one.
    *
    * @param {Time} aOther        The instance to compare with
    * @return {Number}                     -1, 0 or 1 for less/equal/greater
    */
    compare(aOther: Time): Number;

    /**
    * Compares only the date part of this instance with another one.
    *
    * @param {Time} other         The instance to compare with
    * @param {Timezone} tz            The timezone to compare in
    * @return {Number}                     -1, 0 or 1 for less/equal/greater
    */
    compareDateOnlyTz(other: Time, tz: Timezone): Number;

    /**
    * Convert the instance into another timzone. The returned Time
    * instance is always a copy.
    *
    * @param {Timezone} zone      The zone to convert to
    * @return {Time}              The copy, converted to the zone
    */
    convertToZone(zone: Timezone): Time;

    /**
    * Calculates the UTC offset of the current date/time in the timezone it is
    * in.
    *
    * @return {Number}     UTC offset in seconds
    */
    utcOffset(): Number;

    /**
    * Returns an RFC 5545 compliant ical representation of this object.
    *
    * @return {String} ical date/date-time
    */
    toICALString(): String;

    /**
    * The string representation of this date/time, in jCal form
    * (including : and - separators).
    * @return {String}
    */
    toString(): String;

    /**
    * Converts the current instance to a Javascript date
    * @return {Date}
    */
    toJSDate(): Date;

    /**
    * Adjust the date/time by the given offset
    *
    * @param {Number} aExtraDays       The extra amount of days
    * @param {Number} aExtraHours      The extra amount of hours
    * @param {Number} aExtraMinutes    The extra amount of minutes
    * @param {Number} aExtraSeconds    The extra amount of seconds
    * @param {Number=} aTime           The time to adjust, defaults to the
    *                                    current instance.
    */
    adjust(aExtraDays: Number, aExtraHours: Number, aExtraMinutes: Number, aExtraSeconds: Number, aTime?: Number): void;

    /**
    * Sets up the current instance from unix time, the number of seconds since
    * January 1st, 1970.
    *
    * @param {Number} seconds      The seconds to set up with
    */
    fromUnixTime(seconds: Number): void;

    /**
    * Converts the current instance to seconds since January 1st 1970.
    *
    * @return {Number}         Seconds since 1970
    */
    toUnixTime(): Number;

    /**
    * Converts time to into Object which can be serialized then re-created
    * using the constructor.
    *
    * @example
    * // toJSON will automatically be called
    * var json = JSON.stringify(mytime);
    *
    * var deserialized = JSON.parse(json);
    *
    * var time = new Time(deserialized);
    *
    * @return {Object}
    */
    toJSON(): Object;

    /**
    * Returns the days in the given month
    *
    * @param {Number} month      The month to check
    * @param {Number} year       The year to check
    * @return {Number}           The number of days in the month
    */
    static daysInMonth(month: Number, year: Number): Number;

    /**
    * Checks if the year is a leap year
    *
    * @param {Number} year       The year to check
    * @return {Boolean}          True, if the year is a leap year
    */
    static isLeapYear(year: Number): Boolean;

    /**
    * Create a new Time from the day of year and year. The date is returned
    * in floating timezone.
    *
    * @param {Number} aDayOfYear     The day of year
    * @param {Number} aYear          The year to create the instance in
    * @return {Time}            The created instance with the calculated date
    */
    static fromDayOfYear(aDayOfYear: Number, aYear: Number): Time;

    /**
    * Returns a new Time instance from a date string, e.g 2015-01-02.
    *
    * @deprecated                Use {@link Time.fromDateString} instead
    * @param {String} str        The string to create from
    * @return {Time}        The date/time instance
    */
    static fromStringv2(str: String): Time;

    /**
    * Returns a new Time instance from a date string, e.g 2015-01-02.
    *
    * @param {String} aValue     The string to create from
    * @return {Time}        The date/time instance
    */
    static fromDateString(aValue: String): Time;

    /**
    * Returns a new Time instance from a date-time string, e.g
    * 2015-01-02T03:04:05. If a property is specified, the timezone is set up
    * from the property's TZID parameter.
    *
    * @param {String} aValue         The string to create from
    * @param {Property=} prop   The property the date belongs to
    * @return {Time}            The date/time instance
    */
    static fromDateTimeString(aValue: String, prop?: Property): Time;

    /**
    * Returns a new Time instance from a date or date-time string,
    *
    * @param {String} aValue         The string to create from
    * @return {Time}            The date/time instance
    */
    static fromString(aValue: String): Time;

    /**
    * Creates a new Time instance from the given Javascript Date.
    *
    * @param {?Date} aDate     The Javascript Date to read, or null to reset
    * @param {Boolean} useUTC  If true, the UTC values of the date will be used
    */
    static fromJSDate(aDate: Date | null, useUTC: Boolean): void;

    /**
    * Creates a new Time instance from the the passed data object.
    *
    * @param {Object} aData            Time initialization
    * @param {Number=} aData.year      The year for this date
    * @param {Number=} aData.month     The month for this date
    * @param {Number=} aData.day       The day for this date
    * @param {Number=} aData.hour      The hour for this date
    * @param {Number=} aData.minute    The minute for this date
    * @param {Number=} aData.second    The second for this date
    * @param {Boolean=} aData.isDate   If true, the instance represents a date
    *                                    (as opposed to a date-time)
    * @param {Timezone=} aZone    Timezone this position occurs in
    */
    static fromData(aData: { year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number, isDate: Boolean }, aZone?: Timezone): void;

    /**
    * Creates a new Time instance from the current moment.
    * @return {Time}
    */
    static now(): Time;

    /**
    * Returns the date on which ISO week number 1 starts.
    *
    * @see Time#weekNumber
    * @param {Number} aYear                  The year to search in
    * @param {weekDay=} aWeekStart The week start weekday, used for calculation.
    * @return {Time}                    The date on which week number 1 starts
    */
    static weekOneStarts(aYear: Number, aWeekStart?: weekDay): Time;

    /**
    * Get the dominical letter for the given year. Letters range from A - G for
    * common years, and AG to GF for leap years.
    *
    * @param {Number} yr           The year to retrieve the letter for
    * @return {String}             The dominical letter.
    */
    static getDominicalLetter(yr: Number): String;

    /**
    * January 1st, 1970 as an Time.
    * @type {Time}
    * @constant
    * @instance
    */
    static epochTime: Time;

    /**
    * The days that have passed in the year after a given month. The array has
    * two members, one being an array of passed days for non-leap years, the
    * other analog for leap years.
    * @example
    * var isLeapYear = Time.isLeapYear(year);
    * var passedDays = Time.daysInYearPassedMonth[isLeapYear][month];
    * @type {Array.<Array.<Number>>}
    */
    static daysInYearPassedMonth: number[][];

    /**
    * The default weekday for the WKST part.
    * @constant
    * @default Time.MONDAY
    */
    static DEFAULT_WEEK_START: any;

}

/**
* The weekday, 1 = SUNDAY, 7 = SATURDAY. Access via
* Time.MONDAY, Time.TUESDAY, ...
*
* @typedef {Number} weekDay
* @memberof Time
*/
type weekDay = Number;

/**
* @classdesc
* Timezone representation, created by passing in a tzid and component.
*
* @example
* var vcalendar;
* var timezoneComp = vcalendar.getFirstSubcomponent('vtimezone');
* var tzid = timezoneComp.getFirstPropertyValue('tzid');
*
* var timezone = new Timezone({
*   component: timezoneComp,
*   tzid
* });
*
* @class
* @param {Component|Object} data options for class
* @param {String|Component} data.component
*        If data is a simple object, then this member can be set to either a
*        string containing the component data, or an already parsed
*        Component
* @param {String} data.tzid      The timezone identifier
* @param {String} data.location  The timezone locationw
* @param {String} data.tznames   An alternative string representation of the
*                                  timezone
* @param {Number} data.latitude  The latitude of the timezone
* @param {Number} data.longitude The longitude of the timezone
*/
export class Timezone {
    /**
    * @classdesc
    * Timezone representation, created by passing in a tzid and component.
    *
    * @example
    * var vcalendar;
    * var timezoneComp = vcalendar.getFirstSubcomponent('vtimezone');
    * var tzid = timezoneComp.getFirstPropertyValue('tzid');
    *
    * var timezone = new Timezone({
    *   component: timezoneComp,
    *   tzid
    * });
    *
    * @class
    * @param {Component|Object} data options for class
    * @param {String|Component} data.component
    *        If data is a simple object, then this member can be set to either a
    *        string containing the component data, or an already parsed
    *        Component
    * @param {String} data.tzid      The timezone identifier
    * @param {String} data.location  The timezone locationw
    * @param {String} data.tznames   An alternative string representation of the
    *                                  timezone
    * @param {Number} data.latitude  The latitude of the timezone
    * @param {Number} data.longitude The longitude of the timezone
    */
    constructor(data: (Component|{ component: (String|Component), tzid: String, location: String, tznames: String, latitude: Number, longitude: Number }));

    /**
    * Timezone identifier
    * @type {String}
    */
    tzid: String;

    /**
    * Timezone location
    * @type {String}
    */
    location: String;

    /**
    * Alternative timezone name, for the string representation
    * @type {String}
    */
    tznames: String;

    /**
    * The primary latitude for the timezone.
    * @type {Number}
    */
    latitude: Number;

    /**
    * The primary longitude for the timezone.
    * @type {Number}
    */
    longitude: Number;

    /**
    * The vtimezone component for this timezone.
    * @type {Component}
    */
    component: Component;

    /**
    * The year this timezone has been expanded to. All timezone transition
    * dates until this year are known and can be used for calculation
    *
    * @private
    * @type {Number}
    */
    private expandedUntilYear: Number;

    /**
    * The class identifier.
    * @constant
    * @type {String}
    * @default "icaltimezone"
    */
    icalclass: String;

    /**
    * Sets up the current instance using members from the passed data object.
    *
    * @param {Component|Object} aData options for class
    * @param {String|Component} aData.component
    *        If aData is a simple object, then this member can be set to either a
    *        string containing the component data, or an already parsed
    *        Component
    * @param {String} aData.tzid      The timezone identifier
    * @param {String} aData.location  The timezone locationw
    * @param {String} aData.tznames   An alternative string representation of the
    *                                  timezone
    * @param {Number} aData.latitude  The latitude of the timezone
    * @param {Number} aData.longitude The longitude of the timezone
    */
    fromData(aData: (Component|{ component: (String|Component), tzid: String, location: String, tznames: String, latitude: Number, longitude: Number })): void;

    /**
    * Finds the utcOffset the given time would occur in this timezone.
    *
    * @param {Time} tt        The time to check for
    * @return {Number} utc offset in seconds
    */
    utcOffset(tt: Time): Number;

    /**
    * The string representation of this timezone.
    * @return {String}
    */
    toString(): String;

    /**
    * Convert the date/time from one zone to the next.
    *
    * @param {Time} tt                  The time to convert
    * @param {Timezone} from_zone       The source zone to convert from
    * @param {Timezone} to_zone         The target zone to conver to
    * @return {Time}                    The converted date/time object
    */
    static convert_time(tt: Time, from_zone: Timezone, to_zone: Timezone): Time;

    /**
    * Creates a new Timezone instance from the passed data object.
    *
    * @param {Component|Object} aData options for class
    * @param {String|Component} aData.component
    *        If aData is a simple object, then this member can be set to either a
    *        string containing the component data, or an already parsed
    *        Component
    * @param {String} aData.tzid      The timezone identifier
    * @param {String} aData.location  The timezone locationw
    * @param {String} aData.tznames   An alternative string representation of the
    *                                  timezone
    * @param {Number} aData.latitude  The latitude of the timezone
    * @param {Number} aData.longitude The longitude of the timezone
    */
    static fromData(aData: (Component|{ component: (String|Component), tzid: String, location: String, tznames: String, latitude: Number, longitude: Number })): void;

    /**
    * The instance describing the UTC timezone
    * @type {Timezone}
    * @constant
    * @instance
    */
    static utcTimezone: Timezone;

    /**
    * The instance describing the local timezone
    * @type {Timezone}
    * @constant
    * @instance
    */
    static localTimezone: Timezone;

    /**
    * Adjust a timezone change object.
    * @private
    * @param {Object} change     The timezone change object
    * @param {Number} days       The extra amount of days
    * @param {Number} hours      The extra amount of hours
    * @param {Number} minutes    The extra amount of minutes
    * @param {Number} seconds    The extra amount of seconds
    */
    private static adjust_change(change: Object, days: Number, hours: Number, minutes: Number, seconds: Number): void;

}

/**
* @classdesc
* Singleton class to contain timezones.  Right now its all manual registry in
* the future we may use this class to download timezone information or handle
* loading pre-expanded timezones.
*
* @namespace
* @alias TimezoneService
*/
declare module TimezoneService {
    /**
    * Checks if timezone id has been registered.
    *
    * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
    * @return {Boolean}        False, when not present
    */
    function has(tzid: String): Boolean;

    /**
    * Returns a timezone by its tzid if present.
    *
    * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
    * @return {?Timezone} The timezone, or null if not found
    */
    function get(tzid: String): Timezone;

    /**
    * Registers a timezone object or component.
    *
    * @param {String=} name
    *        The name of the timezone. Defaults to the component's TZID if not
    *        passed.
    * @param {Component|Timezone} zone
    *        The initialized zone or vtimezone.
    */
    function register(name: String | null, zone: (Component|Timezone)): void;

    /**
    * Removes a timezone by its tzid from the list.
    *
    * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
    * @return {?Timezone} The removed timezone, or null if not registered
    */
    function remove(tzid: String): Timezone;

}

/**
* @classdesc
* This class represents the "duration" value type, with various calculation
* and manipulation methods.
*
* @class
* @alias UtcOffset
* @param {Object} aData          An object with members of the utc offset
* @param {Number=} aData.hours   The hours for the utc offset
* @param {Number=} aData.minutes The minutes in the utc offset
* @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
*/
export class UtcOffset {
    /**
    * @classdesc
    * This class represents the "duration" value type, with various calculation
    * and manipulation methods.
    *
    * @class
    * @alias UtcOffset
    * @param {Object} aData          An object with members of the utc offset
    * @param {Number=} aData.hours   The hours for the utc offset
    * @param {Number=} aData.minutes The minutes in the utc offset
    * @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
    */
    constructor(aData: { hours: Number, minutes: Number, factor: Number });

    /**
    * The hours in the utc-offset
    * @type {Number}
    */
    hours: Number;

    /**
    * The minutes in the utc-offset
    * @type {Number}
    */
    minutes: Number;

    /**
    * The sign of the utc offset, 1 for positive offset, -1 for negative
    * offsets.
    * @type {Number}
    */
    factor: Number;

    /**
    * The type name, to be used in the jCal object.
    * @constant
    * @type {String}
    * @default "utc-offset"
    */
    icaltype: String;

    /**
    * Returns a clone of the utc offset object.
    *
    * @return {UtcOffset}     The cloned object
    */
    clone(): UtcOffset;

    /**
    * Sets up the current instance using members from the passed data object.
    *
    * @param {Object} aData          An object with members of the utc offset
    * @param {Number=} aData.hours   The hours for the utc offset
    * @param {Number=} aData.minutes The minutes in the utc offset
    * @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
    */
    fromData(aData: { hours: Number, minutes: Number, factor: Number }): void;

    /**
    * Sets up the current instance from the given seconds value. The seconds
    * value is truncated to the minute. Offsets are wrapped when the world
    * ends, the hour after UTC+14:00 is UTC-12:00.
    *
    * @param {Number} aSeconds         The seconds to convert into an offset
    */
    fromSeconds(aSeconds: Number): void;

    /**
    * Convert the current offset to a value in seconds
    *
    * @return {Number}                 The offset in seconds
    */
    toSeconds(): Number;

    /**
    * Compare this utc offset with another one.
    *
    * @param {UtcOffset} other        The other offset to compare with
    * @return {Number}                     -1, 0 or 1 for less/equal/greater
    */
    compare(other: UtcOffset): Number;

    /**
    * The iCalendar string representation of this utc-offset.
    * @return {String}
    */
    toICALString(): String;

    /**
    * The string representation of this utc-offset.
    * @return {String}
    */
    toString(): String;

    /**
    * Creates a new {@link UtcOffset} instance from the passed string.
    *
    * @param {String} aString    The string to parse
    * @return {Duration}    The created utc-offset instance
    */
    static fromString(aString: String): Duration;

    /**
    * Creates a new {@link UtcOffset} instance from the passed seconds
    * value.
    *
    * @param {Number} aSeconds       The number of seconds to convert
    */
    static fromSeconds(aSeconds: Number): void;

}

/**
* Describes a vCard time, which has slight differences to the Time.
* Properties can be null if not specified, for example for dates with
* reduced accuracy or truncation.
*
* Note that currently not all methods are correctly re-implemented for
* VCardTime. For example, comparison will have undefined results when some
* members are null.
*
* Also, normalization is not yet implemented for this class!
*
* @alias VCardTime
* @class
* @extends {Time}
* @param {Object} data                           The data for the time instance
* @param {Number=} data.year                     The year for this date
* @param {Number=} data.month                    The month for this date
* @param {Number=} data.day                      The day for this date
* @param {Number=} data.hour                     The hour for this date
* @param {Number=} data.minute                   The minute for this date
* @param {Number=} data.second                   The second for this date
* @param {Timezone|UtcOffset} zone     The timezone to use
* @param {String} icaltype                       The type for this date/time object
*/
export class VCardTime extends Time {
    /**
    * Describes a vCard time, which has slight differences to the Time.
    * Properties can be null if not specified, for example for dates with
    * reduced accuracy or truncation.
    *
    * Note that currently not all methods are correctly re-implemented for
    * VCardTime. For example, comparison will have undefined results when some
    * members are null.
    *
    * Also, normalization is not yet implemented for this class!
    *
    * @alias VCardTime
    * @class
    * @extends {Time}
    * @param {Object} data                           The data for the time instance
    * @param {Number=} data.year                     The year for this date
    * @param {Number=} data.month                    The month for this date
    * @param {Number=} data.day                      The day for this date
    * @param {Number=} data.hour                     The hour for this date
    * @param {Number=} data.minute                   The minute for this date
    * @param {Number=} data.second                   The second for this date
    * @param {Timezone|UtcOffset} zone     The timezone to use
    * @param {String} icaltype                       The type for this date/time object
    */
    constructor(data: { year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number }, zone: (Timezone|UtcOffset), icaltype: String);

    /**
    * Returns a new VCardTime instance from a date and/or time string.
    *
    * @param {String} aValue     The string to create from
    * @param {String} aIcalType  The type for this instance, e.g. date-and-or-time
    * @return {VCardTime}   The date/time instance
    */
    static fromDateAndOrTimeString(aValue: String, aIcalType: String): VCardTime;

}
