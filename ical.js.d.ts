/** @namespace ICAL */
declare module ICAL {
   /**
    * @classdesc
    * Represents the BINARY value type, which contains extra methods for
    * encoding and decoding.
    *
    * @class
    * @alias ICAL.Binary
    * @param {String} aValue     The binary data for this value
    */
   class Binary {
       /**
        * @classdesc
        * Represents the BINARY value type, which contains extra methods for
        * encoding and decoding.
        *
        * @class
        * @alias ICAL.Binary
        * @param {String} aValue     The binary data for this value
        */
       constructor(aValue: String);

       /**
        * The type name, to be used in the jCal object.
        * @default "binary"
        * @constant
        */
       icaltype: any;

       /**
        * Base64 decode the current value
        *
        * @return {String}         The base64-decoded value
        */
       decodeValue(): String;

       /**
        * Encodes the passed parameter with base64 and sets the internal
        * value to the result.
        *
        * @param {String} aValue      The raw binary value to encode
        */
       setEncodedValue(aValue: String): void;

       /**
        * The string representation of this value
        * @return {String}
        */
       toString(): String;

       /**
        * Creates a binary value from the given string.
        *
        * @param {String} aString        The binary value string
        * @return {ICAL.Binary}          The binary value instance
        */
       static fromString(aString: String): ICAL.Binary;

   }

   /**
    * @classdesc
    * Wraps a jCal component, adding convenience methods to add, remove and
    * update subcomponents and properties.
    *
    * @class
    * @alias ICAL.Component
    * @param {Array|String} jCal         Raw jCal component data OR name of new
    *                                      component
    * @param {ICAL.Component} parent     Parent component to associate
    */
   class Component {
       /**
        * @classdesc
        * Wraps a jCal component, adding convenience methods to add, remove and
        * update subcomponents and properties.
        *
        * @class
        * @alias ICAL.Component
        * @param {Array|String} jCal         Raw jCal component data OR name of new
        *                                      component
        * @param {ICAL.Component} parent     Parent component to associate
        */
       constructor(jCal: (Array|String), parent: ICAL.Component);

       /**
        * Hydrated properties are inserted into the _properties array at the same
        * position as in the jCal array, so its possible the array contains
        * undefined values for unhydrdated properties. To avoid iterating the
        * array when checking if all properties have been hydrated, we save the
        * count here.
        *
        * @type {Number}
        * @private
        */
       private _hydratedPropertyCount: Number;

       /**
        * The same count as for _hydratedPropertyCount, but for subcomponents
        *
        * @type {Number}
        * @private
        */
       private _hydratedComponentCount: Number;

       /**
        * The name of this component
        * @readonly
        */
       name: any;

       /**
        * The design set for this component, e.g. icalendar vs vcard
        *
        * @type {ICAL.design.designSet}
        * @private
        */
       private _designSet: ICAL.design.designSet;

       /**
        * Finds first sub component, optionally filtered by name.
        *
        * @param {String=} name        Optional name to filter by
        * @return {?ICAL.Component}     The found subcomponent
        */
       getFirstSubcomponent(name?: String): ICAL.Component;

       /**
        * Finds all sub components, optionally filtering by name.
        *
        * @param {String=} name            Optional name to filter by
        * @return {ICAL.Component[]}       The found sub components
        */
       getAllSubcomponents(name?: String): ICAL.Component[];

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
        * @return {?ICAL.Property}     The found property
        */
       getFirstProperty(name?: String): ICAL.Property;

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
        * @return {ICAL.Property[]}    List of properties
        */
       getAllProperties(name?: String): ICAL.Property[];

       /**
        * Adds a single sub component.
        *
        * @param {ICAL.Component} component        The component to add
        * @return {ICAL.Component}                 The passed in component
        */
       addSubcomponent(component: ICAL.Component): ICAL.Component;

       /**
        * Removes a single component by name or the instance of a specific
        * component.
        *
        * @param {ICAL.Component|String} nameOrComp    Name of component, or component
        * @return {Boolean}                            True when comp is removed
        */
       removeSubcomponent(nameOrComp: (ICAL.Component|String)): Boolean;

       /**
        * Removes all components or (if given) all components by a particular
        * name.
        *
        * @param {String=} name            Lowercase component name
        */
       removeAllSubcomponents(name?: String): void;

       /**
        * Adds an {@link ICAL.Property} to the component.
        *
        * @param {ICAL.Property} property      The property to add
        * @return {ICAL.Property}              The passed in property
        */
       addProperty(property: ICAL.Property): ICAL.Property;

       /**
        * Helper method to add a property with a value to the component.
        *
        * @param {String}               name         Property name to add
        * @param {String|Number|Object} value        Property value
        * @return {ICAL.Property}                    The created property
        */
       addPropertyWithValue(name: String, value: (String|Number|Object)): ICAL.Property;

       /**
        * Helper method that will update or create a property of the given name
        * and sets its value. If multiple properties with the given name exist,
        * only the first is updated.
        *
        * @param {String}               name         Property name to update
        * @param {String|Number|Object} value        Property value
        * @return {ICAL.Property}                    The created property
        */
       updatePropertyWithValue(name: String, value: (String|Number|Object)): ICAL.Property;

       /**
        * Removes a single property by name or the instance of the specific
        * property.
        *
        * @param {String|ICAL.Property} nameOrProp     Property name or instance to remove
        * @return {Boolean}                            True, when deleted
        */
       removeProperty(nameOrProp: (String|ICAL.Property)): Boolean;

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
        * Create an {@link ICAL.Component} by parsing the passed iCalendar string.
        *
        * @param {String} str        The iCalendar string to parse
        */
       static fromString(str: String): void;

   }

   /**
    * @classdesc
    * The ComponentParser is used to process a String or jCal Object,
    * firing callbacks for various found components, as well as completion.
    *
    * @example
    * var options = {
    *   // when false no events will be emitted for type
    *   parseEvent: true,
    *   parseTimezone: true
    * };
    *
    * var parser = new ICAL.ComponentParser(options);
    *
    * parser.onevent(eventComponent) {
    *   //...
    * }
    *
    * // ontimezone, etc...
    *
    * parser.oncomplete = function() {
    *
    * };
    *
    * parser.process(stringOrComponent);
    *
    * @class
    * @alias ICAL.ComponentParser
    * @param {Object=} options        Component parser options
    * @param {Boolean} options.parseEvent        Whether events should be parsed
    * @param {Boolean} options.parseTimezeone    Whether timezones should be parsed
    */
   class ComponentParser {
       /**
        * @classdesc
        * The ComponentParser is used to process a String or jCal Object,
        * firing callbacks for various found components, as well as completion.
        *
        * @example
        * var options = {
        *   // when false no events will be emitted for type
        *   parseEvent: true,
        *   parseTimezone: true
        * };
        *
        * var parser = new ICAL.ComponentParser(options);
        *
        * parser.onevent(eventComponent) {
        *   //...
        * }
        *
        * // ontimezone, etc...
        *
        * parser.oncomplete = function() {
        *
        * };
        *
        * parser.process(stringOrComponent);
        *
        * @class
        * @alias ICAL.ComponentParser
        * @param {Object=} options        Component parser options
        * @param {Boolean} options.parseEvent        Whether events should be parsed
        * @param {Boolean} options.parseTimezeone    Whether timezones should be parsed
        */
       constructor(options?: { parseEvent: Boolean, parseTimezeone: Boolean });

       /**
        * When true, parse events
        *
        * @type {Boolean}
        */
       parseEvent: Boolean;

       /**
        * When true, parse timezones
        *
        * @type {Boolean}
        */
       parseTimezone: Boolean;

       /**
        * Fired when parsing is complete
        * @callback
        */
       type oncomplete = any;

       /**
        * Fired if an error occurs during parsing.
        *
        * @callback
        * @param {Error} err details of error
        */
       type onerror = any;

       /**
        * Fired when a top level component (VTIMEZONE) is found
        *
        * @callback
        * @param {ICAL.Timezone} component     Timezone object
        */
       type ontimezone = any;

       /**
        * Fired when a top level component (VEVENT) is found.
        *
        * @callback
        * @param {ICAL.Event} component    Top level component
        */
       type onevent = any;

       /**
        * Process a string or parse ical object.  This function itself will return
        * nothing but will start the parsing process.
        *
        * Events must be registered prior to calling this method.
        *
        * @param {ICAL.Component|String|Object} ical      The component to process,
        *        either in its final form, as a jCal Object, or string representation
        */
       process(ical: (ICAL.Component|String|Object)): void;

   }

   /**
    * The design data, used by the parser to determine types for properties and
    * other metadata needed to produce correct jCard/jCal data.
    *
    * @alias ICAL.design
    * @namespace
    */
   module design {
       /**
        * A designSet describes value, parameter and property data. It is used by
        * ther parser and stringifier in components and properties to determine they
        * should be represented.
        *
        * @typedef {Object} designSet
        * @memberOf ICAL.design
        * @property {Object} value       Definitions for value types, keys are type names
        * @property {Object} param       Definitions for params, keys are param names
        * @property {Object} property    Defintions for properties, keys are property names
        */
       interface IdesignSet {
           value: Object;
           param: Object;
           property: Object;
       }


       /**
        * The default set for new properties and components if none is specified.
        * @type {ICAL.design.designSet}
        */
       var defaultSet: ICAL.design.designSet;

       /**
        * The default type for unknown properties
        * @type {String}
        */
       var defaultType: String;

       interface Icomponents {
           vcard: ICAL.design.designSet;
           vevent: ICAL.design.designSet;
           vtodo: ICAL.design.designSet;
           vjournal: ICAL.design.designSet;
           valarm: ICAL.design.designSet;
           vtimezone: ICAL.design.designSet;
           daylight: ICAL.design.designSet;
           standard: ICAL.design.designSet;
       }

       /**
        * Holds the design set for known top-level components
        *
        * @type {Object}
        * @property {ICAL.design.designSet} vcard       vCard VCARD
        * @property {ICAL.design.designSet} vevent      iCalendar VEVENT
        * @property {ICAL.design.designSet} vtodo       iCalendar VTODO
        * @property {ICAL.design.designSet} vjournal    iCalendar VJOURNAL
        * @property {ICAL.design.designSet} valarm      iCalendar VALARM
        * @property {ICAL.design.designSet} vtimezone   iCalendar VTIMEZONE
        * @property {ICAL.design.designSet} daylight    iCalendar DAYLIGHT
        * @property {ICAL.design.designSet} standard    iCalendar STANDARD
        *
        * @example
        * var propertyName = 'fn';
        * var componentDesign = ICAL.design.components.vcard;
        * var propertyDetails = componentDesign.property[propertyName];
        * if (propertyDetails.defaultType == 'text') {
        *   // Yep, sure is...
        * }
        */
       var components: Icomponents;

       /**
        * The design set for iCalendar (rfc5545/rfc7265) components.
        * @type {ICAL.design.designSet}
        */
       var icalendar: ICAL.design.designSet;

       /**
        * The design set for vCard (rfc6350/rfc7095) components.
        * @type {ICAL.design.designSet}
        */
       var vcard: ICAL.design.designSet;

       /**
        * The design set for vCard (rfc2425/rfc2426/rfc7095) components.
        * @type {ICAL.design.designSet}
        */
       var vcard3: ICAL.design.designSet;

       /**
        * Gets the design set for the given component name.
        *
        * @param {String} componentName        The name of the component
        * @return {ICAL.design.designSet}      The design set for the component
        */
       function getDesignSet(componentName: String): ICAL.design.designSet;

   }

   /**
    * @classdesc
    * This class represents the "duration" value type, with various calculation
    * and manipulation methods.
    *
    * @class
    * @alias ICAL.Duration
    * @param {Object} data               An object with members of the duration
    * @param {Number} data.weeks         Duration in weeks
    * @param {Number} data.days          Duration in days
    * @param {Number} data.hours         Duration in hours
    * @param {Number} data.minutes       Duration in minutes
    * @param {Number} data.seconds       Duration in seconds
    * @param {Boolean} data.isNegative   If true, the duration is negative
    */
   class Duration {
       /**
        * @classdesc
        * This class represents the "duration" value type, with various calculation
        * and manipulation methods.
        *
        * @class
        * @alias ICAL.Duration
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
        * @return {ICAL.Duration}      The cloned object
        */
       clone(): ICAL.Duration;

       /**
        * The duration value expressed as a number of seconds.
        *
        * @return {Number}             The duration value in seconds
        */
       toSeconds(): Number;

       /**
        * Reads the passed seconds value into this duration object. Afterwards,
        * members like {@link ICAL.Duration#days days} and {@link ICAL.Duration#weeks weeks} will be set up
        * accordingly.
        *
        * @param {Number} aSeconds     The duration value in seconds
        * @return {ICAL.Duration}      Returns this instance
        */
       fromSeconds(aSeconds: Number): ICAL.Duration;

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
        * @param {ICAL.Duration} aOther        The instance to compare with
        * @return {Number}                     -1, 0 or 1 for less/equal/greater
        */
       compare(aOther: ICAL.Duration): Number;

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
        * Returns a new ICAL.Duration instance from the passed seconds value.
        *
        * @param {Number} aSeconds       The seconds to create the instance from
        * @return {ICAL.Duration}        The newly created duration instance
        */
       static fromSeconds(aSeconds: Number): ICAL.Duration;

       /**
        * Checks if the given string is an iCalendar duration value.
        *
        * @param {String} value      The raw ical value
        * @return {Boolean}          True, if the given value is of the
        *                              duration ical type
        */
       static isValueString(value: String): Boolean;

       /**
        * Creates a new {@link ICAL.Duration} instance from the passed string.
        *
        * @param {String} aStr       The string to parse
        * @return {ICAL.Duration}    The created duration instance
        */
       static fromString(aStr: String): ICAL.Duration;

       /**
        * Creates a new ICAL.Duration instance from the given data object.
        *
        * @param {Object} aData               An object with members of the duration
        * @param {Number} aData.weeks         Duration in weeks
        * @param {Number} aData.days          Duration in days
        * @param {Number} aData.hours         Duration in hours
        * @param {Number} aData.minutes       Duration in minutes
        * @param {Number} aData.seconds       Duration in seconds
        * @param {Boolean} aData.isNegative   If true, the duration is negative
        * @return {ICAL.Duration}             The createad duration instance
        */
       static fromData(aData: { weeks: Number, days: Number, hours: Number, minutes: Number, seconds: Number, isNegative: Boolean }): ICAL.Duration;

   }

   /**
    * @classdesc
    * ICAL.js is organized into multiple layers. The bottom layer is a raw jCal
    * object, followed by the component/property layer. The highest level is the
    * event representation, which this class is part of. See the
    * {@tutorial layers} guide for more details.
    *
    * @class
    * @alias ICAL.Event
    * @param {ICAL.Component=} component         The ICAL.Component to base this event on
    * @param {Object} options                    Options for this event
    * @param {Boolean} options.strictExceptions
    *          When true, will verify exceptions are related by their UUID
    * @param {Array<ICAL.Component|ICAL.Event>} options.exceptions
    *          Exceptions to this event, either as components or events
    */
   class Event {
       /**
        * @classdesc
        * ICAL.js is organized into multiple layers. The bottom layer is a raw jCal
        * object, followed by the component/property layer. The highest level is the
        * event representation, which this class is part of. See the
        * {@tutorial layers} guide for more details.
        *
        * @class
        * @alias ICAL.Event
        * @param {ICAL.Component=} component         The ICAL.Component to base this event on
        * @param {Object} options                    Options for this event
        * @param {Boolean} options.strictExceptions
        *          When true, will verify exceptions are related by their UUID
        * @param {Array<ICAL.Component|ICAL.Event>} options.exceptions
        *          Exceptions to this event, either as components or events
        */
       constructor(component?: ICAL.Component, options: { strictExceptions: Boolean, exceptions: (ICAL.Component|ICAL.Event)[] });

       /**
        * List of related event exceptions.
        *
        * @type {ICAL.Event[]}
        */
       exceptions: ICAL.Event[];

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
        * @param {ICAL.Component|ICAL.Event} obj       Component or event
        */
       relateException(obj: (ICAL.Component|ICAL.Event)): void;

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
        * @param {ICAL.Time} time usually an occurrence time of an event
        * @return {?ICAL.Event} the related event/exception or null
        */
       findRangeException(time: ICAL.Time): ICAL.Event;


       /**
        * Returns the occurrence details based on its start time.  If the
        * occurrence has an exception will return the details for that exception.
        *
        * NOTE: this method is intend to be used in conjunction
        *       with the {@link ICAL.Event#iterator iterator} method.
        *
        * @param {ICAL.Time} occurrence time occurrence
        * @return {ICAL.Event.occurrenceDetails} Information about the occurrence
        */
       getOccurrenceDetails(occurrence: ICAL.Time): ICAL.Event.occurrenceDetails;

       /**
        * Builds a recur expansion instance for a specific point in time (defaults
        * to startDate).
        *
        * @param {ICAL.Time} startTime     Starting point for expansion
        * @return {ICAL.RecurExpansion}    Expansion object
        */
       iterator(startTime: ICAL.Time): ICAL.RecurExpansion;

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
        * @return {Object.<ICAL.Recur.frequencyValues, Boolean>}
        *          Object of recurrence flags
        */
       getRecurrenceTypes(): { [k: ICAL.Recur.frequencyValues]: Boolean };

       /**
        * The uid of this event
        * @type {String}
        */
       uid: String;

       /**
        * The start date
        * @type {ICAL.Time}
        */
       startDate: ICAL.Time;

       /**
        * The end date. This can be the result directly from the property, or the
        * end date calculated from start date and duration.
        * @type {ICAL.Time}
        */
       endDate: ICAL.Time;

       /**
        * The duration. This can be the result directly from the property, or the
        * duration calculated from start date and end date.
        * @type {ICAL.Duration}
        * @readonly
        */
       duration: ICAL.Duration;

       /**
        * The location of the event.
        * @type {String}
        */
       location: String;

       /**
        * The attendees in the event
        * @type {ICAL.Property[]}
        * @readonly
        */
       attendees: ICAL.Property[];

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
        * @type {ICAL.Time}
        */
       recurrenceId: ICAL.Time;

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
        * @param {ICAL.Time} time      The time to set
        */
       private _setTime(propName: String, time: ICAL.Time): void;

       /**
        * The string representation of this event.
        * @return {String}
        */
       toString(): String;

   }

   /**
    * The number of characters before iCalendar line folding should occur
    * @type {Number}
    * @default 75
    */
   var foldLength: Number;

   /**
    * The character(s) to be used for a newline. The default value is provided by
    * rfc5545.
    * @type {String}
    * @default "\r\n"
    */
   var newLineChar: String;

   /**
    * Helper functions used in various places within ical.js
    * @namespace
    */
   module helpers {
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
        * var time = new ICAL.Time(...);
        * var result = ICAL.helpers.formatClassType(time, ICAL.Time);
        *
        * (result instanceof ICAL.Time)
        * // => true
        *
        * result = ICAL.helpers.formatClassType({}, ICAL.Time);
        * (result isntanceof ICAL.Time)
        * // => true
        *
        *
        * @param {Object} data       object initialization data
        * @param {Object} type       object type (like ICAL.Time)
        * @return {?}                An instance of the found type.
        */
       function formatClassType(data: Object, type: Object): ?;

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
       function binsearchInsert(list: Array, seekVal: ?, cmpfunc: (() => any)): Number;

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
        * var child = ICAL.helpers.extend(parent, {
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
    * Contains various functions to parse iCalendar and vCard data.
    * @namespace
    */
   module parse {
       /**
        * An error that occurred during parsing.
        *
        * @param {String} message        The error message
        * @memberof ICAL.parse
        * @extends {Error}
        * @class
        */
       class ParserError extends Error {
           /**
            * An error that occurred during parsing.
            *
            * @param {String} message        The error message
            * @memberof ICAL.parse
            * @extends {Error}
            * @class
            */
           constructor(message: String);

       }

       /**
        * Parse an iCalendar property value into the jCal for a single property
        *
        * @function ICAL.parse.property
        * @param {String} str
        *   The iCalendar property string to parse
        * @param {ICAL.design.designSet=} designSet
        *   The design data to use for this property
        * @return {Object}
        *   The jCal Object containing the property
        */
       function property(str: String, designSet?: ICAL.design.designSet): Object;

       /**
        * Convenience method to parse a component. You can use ICAL.parse() directly
        * instead.
        *
        * @function ICAL.parse.component
        * @see ICAL.parse(function)
        * @param {String} str    The iCalendar component string to parse
        * @return {Object}       The jCal Object containing the component
        */
       function component(str: String): Object;

       /**
        * The state for parsing content lines from an iCalendar/vCard string.
        *
        * @private
        * @memberof ICAL.parse
        * @typedef {Object} parserState
        * @property {ICAL.design.designSet} designSet    The design set to use for parsing
        * @property {ICAL.Component[]} stack             The stack of components being processed
        * @property {ICAL.Component} component           The currently active component
        */
       interface IparserState {
           designSet: ICAL.design.designSet;
           stack: ICAL.Component[];
           component: ICAL.Component;
       }


       /**
        * Handles a single line of iCalendar/vCard, updating the state.
        *
        * @private
        * @function ICAL.parse._handleContentLine
        * @param {String} line               The content line to process
        * @param {ICAL.parse.parserState}    The current state of the line parsing
        */
       function _handleContentLine(line: String, The: ICAL.parse.parserState): void;

       /**
        * Parse a value from the raw value into the jCard/jCal value.
        *
        * @private
        * @function ICAL.parse._parseValue
        * @param {String} value          Original value
        * @param {String} type           Type of value
        * @param {Object} designSet      The design data to use for this value
        * @return {Object} varies on type
        */
       function _parseValue(value: String, type: String, designSet: Object): Object;

       /**
        * Parse parameters from a string to object.
        *
        * @function ICAL.parse._parseParameters
        * @private
        * @param {String} line           A single unfolded line
        * @param {Numeric} start         Position to start looking for properties
        * @param {Object} designSet      The design data to use for this property
        * @return {Object} key/value pairs
        */
       function _parseParameters(line: String, start: Numeric, designSet: Object): Object;

       /**
        * Internal helper for rfc6868. Exposing this on ICAL.parse so that
        * hackers can disable the rfc6868 parsing if the really need to.
        *
        * @function ICAL.parse._rfc6868Escape
        * @param {String} val        The value to escape
        * @return {String}           The escaped value
        */
       function _rfc6868Escape(val: String): String;

       /**
        * Parse a multi value string. This function is used either for parsing
        * actual multi-value property's values, or for handling parameter values. It
        * can be used for both multi-value properties and structured value properties.
        *
        * @private
        * @function ICAL.parse._parseMultiValue
        * @param {String} buffer     The buffer containing the full value
        * @param {String} delim      The multi-value delimiter
        * @param {String} type       The value type to be parsed
        * @param {Array.<?>} result        The array to append results to, varies on value type
        * @param {String} innerMulti The inner delimiter to split each value with
        * @param {ICAL.design.designSet} designSet   The design data for this value
        * @return {?|Array.<?>}            Either an array of results, or the first result
        */
       function _parseMultiValue(buffer: String, delim: String, type: String, result: ?[], innerMulti: String, designSet: ICAL.design.designSet): (?|?[]);

       /**
        * Process a complete buffer of iCalendar/vCard data line by line, correctly
        * unfolding content. Each line will be processed with the given callback
        *
        * @private
        * @function ICAL.parse._eachLine
        * @param {String} buffer                         The buffer to process
        * @param {function(?String, String)} callback    The callback for each line
        */
       function _eachLine(buffer: String, callback: (() => any)): void;

   }

   /**
    * Parses iCalendar or vCard data into a raw jCal object. Consult
    * documentation on the {@tutorial layers|layers of parsing} for more
    * details.
    *
    * @function ICAL.parse
    * @variation function
    * @todo Fix the API to be more clear on the return type
    * @param {String} input      The string data to parse
    * @return {Object|Object[]}  A single jCal object, or an array thereof
    */
   function parse(input: String): (Object|Object[]);

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
    * @param {ICAL.Time=} aData.start        The start of the period
    * @param {ICAL.Time=} aData.end          The end of the period
    * @param {ICAL.Duration=} aData.duration The duration of the period
    */
   class Period {
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
        * @param {ICAL.Time=} aData.start        The start of the period
        * @param {ICAL.Time=} aData.end          The end of the period
        * @param {ICAL.Duration=} aData.duration The duration of the period
        */
       constructor(aData: { start: ICAL.Time, end: ICAL.Time, duration: ICAL.Duration });

       /**
        * The start of the period
        * @type {ICAL.Time}
        */
       start: ICAL.Time;

       /**
        * The end of the period
        * @type {ICAL.Time}
        */
       end: ICAL.Time;

       /**
        * The duration of the period
        * @type {ICAL.Duration}
        */
       duration: ICAL.Duration;

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
        * @return {ICAL.Period}      The cloned object
        */
       clone(): ICAL.Period;

       /**
        * Calculates the duration of the period, either directly or by subtracting
        * start from end date.
        *
        * @return {ICAL.Duration}      The calculated duration
        */
       getDuration(): ICAL.Duration;

       /**
        * Calculates the end date of the period, either directly or by adding
        * duration to start date.
        *
        * @return {ICAL.Time}          The calculated end date
        */
       getEnd(): ICAL.Time;

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
        * Creates a new {@link ICAL.Period} instance from the passed string.
        *
        * @param {String} str            The string to parse
        * @param {ICAL.Property} prop    The property this period will be on
        * @return {ICAL.Period}          The created period instance
        */
       static fromString(str: String, prop: ICAL.Property): ICAL.Period;

       /**
        * Creates a new {@link ICAL.Period} instance from the given data object.
        * The passed data object cannot contain both and end date and a duration.
        *
        * @param {Object} aData                  An object with members of the period
        * @param {ICAL.Time=} aData.start        The start of the period
        * @param {ICAL.Time=} aData.end          The end of the period
        * @param {ICAL.Duration=} aData.duration The duration of the period
        * @return {ICAL.Period}                  The period instance
        */
       static fromData(aData: { start: ICAL.Time, end: ICAL.Time, duration: ICAL.Duration }): ICAL.Period;

       /**
        * Returns a new period instance from the given jCal data array. The first
        * member is always the start date string, the second member is either a
        * duration or end date string.
        *
        * @param {Array<String,String>} aData    The jCal data array
        * @param {ICAL.Property} aProp           The property this jCal data is on
        * @return {ICAL.Period}                  The period instance
        */
       static fromJSON(aData: String, String[], aProp: ICAL.Property): ICAL.Period;

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
    * @alias ICAL.Property
    * @param {Array|String} jCal         Raw jCal representation OR
    *  the new name of the property
    *
    * @param {ICAL.Component=} parent    Parent component
    */
   class Property {
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
        * @alias ICAL.Property
        * @param {Array|String} jCal         Raw jCal representation OR
        *  the new name of the property
        *
        * @param {ICAL.Component=} parent    Parent component
        */
       constructor(jCal: (Array|String), parent?: ICAL.Component);

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
        * @type {ICAL.Component}
        */
       parent: ICAL.Component;

       /**
        * The design set for this property, e.g. icalendar vs vcard
        *
        * @type {ICAL.design.designSet}
        * @private
        */
       private _designSet: ICAL.design.designSet;

       /**
        * Updates the type metadata from the current jCal type and design set.
        *
        * @private
        */
       private _updateType(): void;

       /**
        * Hydrate a single value. The act of hydrating means turning the raw jCal
        * value into a potentially wrapped object, for example {@link ICAL.Time}.
        *
        * @private
        * @param {Number} index        The index of the value to hydrate
        * @return {Object}             The decorated value.
        */
       private _hydrateValue(index: Number): Object;

       /**
        * Decorate a single value, returning its wrapped object. This is used by
        * the hydrate function to actually wrap the value.
        *
        * @private
        * @param {?} value         The value to decorate
        * @return {Object}         The decorated value
        */
       private _decorate(value: ?): Object;

       /**
        * Undecorate a single value, returning its raw jCal data.
        *
        * @private
        * @param {Object} value         The value to undecorate
        * @return {?}                   The undecorated value
        */
       private _undecorate(value: Object): ?;

       /**
        * Sets the value at the given index while also hydrating it. The passed
        * value can either be a decorated or undecorated value.
        *
        * @private
        * @param {?} value             The value to set
        * @param {Number} index        The index to set it at
        */
       private _setDecoratedValue(value: ?, index: Number): void;

       /**
        * Gets a parameter on the property.
        *
        * @param {String}        name   Property name (lowercase)
        * @return {Array|String}        Property value
        */
       getParameter(name: String): (Array|String);

       /**
        * Sets a parameter on the property.
        *
        * @param {String}       name     The parameter name
        * @param {Array|String} value    The parameter value
        */
       setParameter(name: String, value: (Array|String)): void;

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
       getValues(): Array;

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
       setValues(values: Array): void;

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
        * Create an {@link ICAL.Property} by parsing the passed iCalendar string.
        *
        * @param {String} str                        The iCalendar string to parse
        * @param {ICAL.design.designSet=} designSet  The design data to use for this property
        * @return {ICAL.Property}                    The created iCalendar property
        */
       static fromString(str: String, designSet?: ICAL.design.designSet): ICAL.Property;

   }

   /**
    * @classdesc
    * This class represents the "recur" value type, with various calculation
    * and manipulation methods.
    *
    * @class
    * @alias ICAL.Recur
    * @param {Object} data                       An object with members of the recurrence
    * @param {ICAL.Recur.frequencyValues} freq   The frequency value
    * @param {Number=} data.interval             The INTERVAL value
    * @param {ICAL.Time.weekDay=} data.wkst      The week start value
    * @param {ICAL.Time=} data.until             The end of the recurrence set
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
   class Recur {
       /**
        * @classdesc
        * This class represents the "recur" value type, with various calculation
        * and manipulation methods.
        *
        * @class
        * @alias ICAL.Recur
        * @param {Object} data                       An object with members of the recurrence
        * @param {ICAL.Recur.frequencyValues} freq   The frequency value
        * @param {Number=} data.interval             The INTERVAL value
        * @param {ICAL.Time.weekDay=} data.wkst      The week start value
        * @param {ICAL.Time=} data.until             The end of the recurrence set
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
       constructor(data: { interval: Number, wkst: ICAL.Time.weekDay, until: ICAL.Time, count: Number, bysecond: Number[], byminute: Number[], byhour: Number[], byday: String[], bymonthday: Number[], byyearday: Number[], byweekno: Number[], bymonth: Number[], bysetpos: Number[] }, freq: ICAL.Recur.frequencyValues);

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
        * @type {ICAL.Time.weekDay}
        * @default ICAL.Time.MONDAY
        */
       wkst: ICAL.Time.weekDay;

       /**
        * The end of the recurrence
        * @type {?ICAL.Time}
        */
       until: ICAL.Time;

       /**
        * The maximum number of occurrences
        * @type {?Number}
        */
       count: Number;

       /**
        * The frequency value.
        * @type {ICAL.Recur.frequencyValues}
        */
       freq: ICAL.Recur.frequencyValues;

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
        * @param {ICAL.Time} aStart        The item's start date
        * @return {ICAL.RecurIterator}     The recurrence iterator
        */
       iterator(aStart: ICAL.Time): ICAL.RecurIterator;

       /**
        * Returns a clone of the recurrence object.
        *
        * @return {ICAL.Recur}      The cloned object
        */
       clone(): ICAL.Recur;

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
        * in the sense of {@link ICAL.Component}, but a part of the recurrence
        * rule, i.e. BYMONTH.
        *
        * @param {String} aType            The name of the component part
        * @param {Array|String} aValue     The component value
        */
       addComponent(aType: String, aValue: (Array|String)): void;

       /**
        * Sets the component value for the given by-part.
        *
        * @param {String} aType        The component part name
        * @param {Array} aValues       The component values
        */
       setComponent(aType: String, aValues: Array): void;

       /**
        * Gets (a copy) of the requested component value.
        *
        * @param {String} aType        The component part name
        * @return {Array}              The component part value
        */
       getComponent(aType: String): Array;

       /**
        * Retrieves the next occurrence after the given recurrence id. See the
        * guide on {@tutorial terminology} for more details.
        *
        * NOTE: Currently, this method iterates all occurrences from the start
        * date. It should not be called in a loop for performance reasons. If you
        * would like to get more than one occurrence, you can iterate the
        * occurrences manually, see the example on the
        * {@link ICAL.Recur#iterator iterator} method.
        *
        * @param {ICAL.Time} aStartTime        The start of the event series
        * @param {ICAL.Time} aRecurrenceId     The date of the last occurrence
        * @return {ICAL.Time}                  The next occurrence after
        */
       getNextOccurrence(aStartTime: ICAL.Time, aRecurrenceId: ICAL.Time): ICAL.Time;

       /**
        * Sets up the current instance using members from the passed data object.
        *
        * @param {Object} data                       An object with members of the recurrence
        * @param {ICAL.Recur.frequencyValues} freq   The frequency value
        * @param {Number=} data.interval             The INTERVAL value
        * @param {ICAL.Time.weekDay=} data.wkst      The week start value
        * @param {ICAL.Time=} data.until             The end of the recurrence set
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
       fromData(data: { interval: Number, wkst: ICAL.Time.weekDay, until: ICAL.Time, count: Number, bysecond: Number[], byminute: Number[], byhour: Number[], byday: String[], bymonthday: Number[], byyearday: Number[], byweekno: Number[], bymonth: Number[], bysetpos: Number[] }, freq: ICAL.Recur.frequencyValues): void;

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
        * Possible frequency values for the FREQ part
        * (YEARLY, MONTHLY, WEEKLY, DAILY, HOURLY, MINUTELY, SECONDLY)
        *
        * @typedef {String} frequencyValues
        * @memberof ICAL.Recur
        */
       type frequencyValues = String;

       /**
        * Creates a new {@link ICAL.Recur} instance from the passed string.
        *
        * @param {String} string         The string to parse
        * @return {ICAL.Recur}           The created recurrence instance
        */
       static fromString(string: String): ICAL.Recur;

       /**
        * Creates a new {@link ICAL.Recur} instance using members from the passed
        * data object.
        *
        * @param {Object} aData                      An object with members of the recurrence
        * @param {ICAL.Recur.frequencyValues} freq   The frequency value
        * @param {Number=} aData.interval            The INTERVAL value
        * @param {ICAL.Time.weekDay=} aData.wkst     The week start value
        * @param {ICAL.Time=} aData.until            The end of the recurrence set
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
       static fromData(aData: { interval: Number, wkst: ICAL.Time.weekDay, until: ICAL.Time, count: Number, bysecond: Number[], byminute: Number[], byhour: Number[], byday: String[], bymonthday: Number[], byyearday: Number[], byweekno: Number[], bymonth: Number[], bysetpos: Number[] }, freq: ICAL.Recur.frequencyValues): void;

       /**
        * Converts a recurrence string to a data object, suitable for the fromData
        * method.
        *
        * @param {String} string     The string to parse
        * @param {Boolean} fmtIcal   If true, the string is considered to be an
        *                              iCalendar string
        * @return {ICAL.Recur}       The recurrence instance
        */
       static _stringToData(string: String, fmtIcal: Boolean): ICAL.Recur;

   }

   /**
    * @classdesc
    * Primary class for expanding recurring rules.  Can take multiple rrules,
    * rdates, exdate(s) and iterate (in order) over each next occurrence.
    *
    * Once initialized this class can also be serialized saved and continue
    * iteration from the last point.
    *
    * NOTE: it is intended that this class is to be used
    *       with ICAL.Event which handles recurrence exceptions.
    *
    * @example
    * // assuming event is a parsed ical component
    * var event;
    *
    * var expand = new ICAL.RecurExpansion({
    *   component: event,
    *   dtstart: event.getFirstPropertyValue('dtstart')
    * });
    *
    * // remember there are infinite rules
    * // so its a good idea to limit the scope
    * // of the iterations then resume later on.
    *
    * // next is always an ICAL.Time or null
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
    * var expand = new ICAL.RecurExpansion(JSON.parse(json));
    *
    * @description
    * The options object can be filled with the specified initial values. It can
    * also contain additional members, as a result of serializing a previous
    * expansion state, as shown in the example.
    *
    * @class
    * @alias ICAL.RecurExpansion
    * @param {Object} options
    *        Recurrence expansion options
    * @param {ICAL.Time} options.dtstart
    *        Start time of the event
    * @param {ICAL.Component=} options.component
    *        Component for expansion, required if not resuming.
    */
   class RecurExpansion {
       /**
        * @classdesc
        * Primary class for expanding recurring rules.  Can take multiple rrules,
        * rdates, exdate(s) and iterate (in order) over each next occurrence.
        *
        * Once initialized this class can also be serialized saved and continue
        * iteration from the last point.
        *
        * NOTE: it is intended that this class is to be used
        *       with ICAL.Event which handles recurrence exceptions.
        *
        * @example
        * // assuming event is a parsed ical component
        * var event;
        *
        * var expand = new ICAL.RecurExpansion({
        *   component: event,
        *   dtstart: event.getFirstPropertyValue('dtstart')
        * });
        *
        * // remember there are infinite rules
        * // so its a good idea to limit the scope
        * // of the iterations then resume later on.
        *
        * // next is always an ICAL.Time or null
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
        * var expand = new ICAL.RecurExpansion(JSON.parse(json));
        *
        * @description
        * The options object can be filled with the specified initial values. It can
        * also contain additional members, as a result of serializing a previous
        * expansion state, as shown in the example.
        *
        * @class
        * @alias ICAL.RecurExpansion
        * @param {Object} options
        *        Recurrence expansion options
        * @param {ICAL.Time} options.dtstart
        *        Start time of the event
        * @param {ICAL.Component=} options.component
        *        Component for expansion, required if not resuming.
        */
       constructor(options: { dtstart: ICAL.Time, component: ICAL.Component });

       /**
        * True when iteration is fully completed.
        * @type {Boolean}
        */
       complete: Boolean;

       /**
        * Array of rrule iterators.
        *
        * @type {ICAL.RecurIterator[]}
        * @private
        */
       private ruleIterators: ICAL.RecurIterator[];

       /**
        * Array of rdate instances.
        *
        * @type {ICAL.Time[]}
        * @private
        */
       private ruleDates: ICAL.Time[];

       /**
        * Array of exdate instances.
        *
        * @type {ICAL.Time[]}
        * @private
        */
       private exDates: ICAL.Time[];

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
        * @type {ICAL.Time}
        * @private
        */
       private exDate: ICAL.Time;

       /**
        * Current additional date.
        *
        * @type {ICAL.Time}
        * @private
        */
       private ruleDate: ICAL.Time;

       /**
        * Start date of recurring rules.
        *
        * @type {ICAL.Time}
        */
       dtstart: ICAL.Time;

       /**
        * Last expanded time
        *
        * @type {ICAL.Time}
        */
       last: ICAL.Time;

       /**
        * Initialize the recurrence expansion from the data object. The options
        * object may also contain additional members, see the
        * {@link ICAL.RecurExpansion constructor} for more details.
        *
        * @param {Object} options
        *        Recurrence expansion options
        * @param {ICAL.Time} options.dtstart
        *        Start time of the event
        * @param {ICAL.Component=} options.component
        *        Component for expansion, required if not resuming.
        */
       fromData(options: { dtstart: ICAL.Time, component: ICAL.Component }): void;

       /**
        * Retrieve the next occurrence in the series.
        * @return {ICAL.Time}
        */
       next(): ICAL.Time;

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
        * @param {ICAL.Component} component        The component to search in
        * @param {String} propertyName             The property name to search for
        * @return {ICAL.Time[]}                    The extracted dates.
        */
       private _extractDates(component: ICAL.Component, propertyName: String): ICAL.Time[];

       /**
        * Initialize the recurrence expansion.
        *
        * @private
        * @param {ICAL.Component} component    The component to initialize from.
        */
       private _init(component: ICAL.Component): void;

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
        * @return {?ICAL.RecurIterator}    Found iterator.
        */
       private _nextRecurrenceIter(): ICAL.RecurIterator;

   }

   /**
    * @classdesc
    * An iterator for a single recurrence rule. This class usually doesn't have
    * to be instanciated directly, the convenience method
    * {@link ICAL.Recur#iterator} can be used.
    *
    * @description
    * The options object may contain additional members when resuming iteration from a previous run
    *
    * @description
    * The options object may contain additional members when resuming iteration
    * from a previous run.
    *
    * @class
    * @alias ICAL.RecurIterator
    * @param {Object} options                The iterator options
    * @param {ICAL.Recur} options.rule       The rule to iterate.
    * @param {ICAL.Time} options.dtstart     The start date of the event.
    * @param {Boolean=} options.initialized  When true, assume that options are
    *        from a previously constructed iterator. Initialization will not be
    *        repeated.
    */
   class RecurIterator {
       /**
        * @classdesc
        * An iterator for a single recurrence rule. This class usually doesn't have
        * to be instanciated directly, the convenience method
        * {@link ICAL.Recur#iterator} can be used.
        *
        * @description
        * The options object may contain additional members when resuming iteration from a previous run
        *
        * @description
        * The options object may contain additional members when resuming iteration
        * from a previous run.
        *
        * @class
        * @alias ICAL.RecurIterator
        * @param {Object} options                The iterator options
        * @param {ICAL.Recur} options.rule       The rule to iterate.
        * @param {ICAL.Time} options.dtstart     The start date of the event.
        * @param {Boolean=} options.initialized  When true, assume that options are
        *        from a previously constructed iterator. Initialization will not be
        *        repeated.
        */
       constructor(options: { rule: ICAL.Recur, dtstart: ICAL.Time, initialized: Boolean });

       /**
        * True when iteration is finished.
        * @type {Boolean}
        */
       completed: Boolean;

       /**
        * The rule that is being iterated
        * @type {ICAL.Recur}
        */
       rule: ICAL.Recur;

       /**
        * The start date of the event being iterated.
        * @type {ICAL.Time}
        */
       dtstart: ICAL.Time;

       /**
        * The last occurrence that was returned from the
        * {@link ICAL.RecurIterator#next} method.
        * @type {ICAL.Time}
        */
       last: ICAL.Time;

       /**
        * The sequence number from the occurrence
        * @type {Number}
        */
       occurrence_number: Number;

       /**
        * The indices used for the {@link ICAL.RecurIterator#by_data} object.
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
       private days: Array;

       /**
        * The index in the {@link ICAL.RecurIterator#days} array.
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
        * @param {ICAL.Recur} options.rule       The rule to iterate.
        * @param {ICAL.Time} options.dtstart     The start date of the event.
        * @param {Boolean=} options.initialized  When true, assume that options are
        *        from a previously constructed iterator. Initialization will not be
        *        repeated.
        */
       fromData(options: { rule: ICAL.Recur, dtstart: ICAL.Time, initialized: Boolean }): void;

       /**
        * Intialize the iterator
        * @private
        */
       private init(): void;

       /**
        * Retrieve the next occurrence from the iterator.
        * @return {ICAL.Time}
        */
       next(): ICAL.Time;

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
       private normalizeByMonthDayRules(year: Number, month: Number, rules: Array): Array;

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
       private check_set_position(aPos: Numeric): Boolean;

       /**
        * Convert iterator into a serialize-able object.  Will preserve current
        * iteration sequence to ensure the seamless continuation of the recurrence
        * rule.
        * @return {Object}
        */
       toJSON(): Object;

   }

   /**
    * Contains various functions to convert jCal and jCard data back into
    * iCalendar and vCard.
    * @namespace
    */
   module stringify {
       /**
        * Converts an jCal component array into a ICAL string.
        * Recursive will resolve sub-components.
        *
        * Exact component/property order is not saved all
        * properties will come before subcomponents.
        *
        * @function ICAL.stringify.component
        * @param {Array} component
        *        jCal/jCard fragment of a component
        * @param {ICAL.design.designSet} designSet
        *        The design data to use for this component
        * @return {String}       The iCalendar/vCard string
        */
       function component(component: Array, designSet: ICAL.design.designSet): String;

       /**
        * Converts a single jCal/jCard property to a iCalendar/vCard string.
        *
        * @function ICAL.stringify.property
        * @param {Array} property
        *        jCal/jCard property array
        * @param {ICAL.design.designSet} designSet
        *        The design data to use for this property
        * @param {Boolean} noFold
        *        If true, the line is not folded
        * @return {String}       The iCalendar/vCard string
        */
       function property(property: Array, designSet: ICAL.design.designSet, noFold: Boolean): String;

       /**
        * Handles escaping of property values that may contain:
        *
        *    COLON (:), SEMICOLON (;), or COMMA (,)
        *
        * If any of the above are present the result is wrapped
        * in double quotes.
        *
        * @function ICAL.stringify.propertyValue
        * @param {String} value      Raw property value
        * @return {String}           Given or escaped value when needed
        */
       function propertyValue(value: String): String;

       /**
        * Converts an array of ical values into a single
        * string based on a type and a delimiter value (like ",").
        *
        * @function ICAL.stringify.multiValue
        * @param {Array} values      List of values to convert
        * @param {String} delim      Used to join the values (",", ";", ":")
        * @param {String} type       Lowecase ical value type
        *        (like boolean, date-time, etc..)
        * @param {?String} innerMulti If set, each value will again be processed
        *        Used for structured values
        * @param {ICAL.design.designSet} designSet
        *        The design data to use for this property
        *
        * @return {String}           iCalendar/vCard string for value
        */
       function multiValue(values: Array, delim: String, type: String, innerMulti?: String, designSet: ICAL.design.designSet): String;

       /**
        * Processes a single ical value runs the associated "toICAL" method from the
        * design value type if available to convert the value.
        *
        * @function ICAL.stringify.value
        * @param {String|Number} value       A formatted value
        * @param {String} type               Lowercase iCalendar/vCard value type
        *  (like boolean, date-time, etc..)
        * @return {String}                   iCalendar/vCard value for single value
        */
       function value(value: (String|Number), type: String): String;

   }

   /**
    * Convert a full jCal/jCard array into a iCalendar/vCard string.
    *
    * @function ICAL.stringify
    * @variation function
    * @param {Array} jCal    The jCal/jCard document
    * @return {String}       The stringified iCalendar/vCard document
    */
   function stringify(jCal: Array): String;

   /**
    * @classdesc
    * iCalendar Time representation (similar to JS Date object).  Fully
    * independent of system (OS) timezone / time.  Unlike JS Date, the month
    * January is 1, not zero.
    *
    * @example
    * var time = new ICAL.Time({
    *   year: 2012,
    *   month: 10,
    *   day: 11
    *   minute: 0,
    *   second: 0,
    *   isDate: false
    * });
    *
    *
    * @alias ICAL.Time
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
    * @param {ICAL.Timezone} zone timezone this position occurs in
    */
   class Time {
       /**
        * @classdesc
        * iCalendar Time representation (similar to JS Date object).  Fully
        * independent of system (OS) timezone / time.  Unlike JS Date, the month
        * January is 1, not zero.
        *
        * @example
        * var time = new ICAL.Time({
        *   year: 2012,
        *   month: 10,
        *   day: 11
        *   minute: 0,
        *   second: 0,
        *   isDate: false
        * });
        *
        *
        * @alias ICAL.Time
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
        * @param {ICAL.Timezone} zone timezone this position occurs in
        */
       constructor(data: { year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number, isDate: Boolean }, zone: ICAL.Timezone);

       /**
        * The class identifier.
        * @constant
        * @type {String}
        * @default "icaltime"
        */
       icalclass: String;

       /**
        * The type name, to be used in the jCal object. This value may change and
        * is strictly defined by the {@link ICAL.Time#isDate isDate} member.
        * @readonly
        * @type {String}
        * @default "date-time"
        */
       icaltype: String;

       /**
        * The timezone for this time.
        * @type {ICAL.Timezone}
        */
       zone: ICAL.Timezone;

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
        * @return {ICAL.Time}              The cloned object
        */
       clone(): ICAL.Time;

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
        * @param {ICAL.Timezone} timezone  The timezone to set
        */
       resetTo(year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number, timezone: ICAL.Timezone): void;

       /**
        * Set up the current instance from the Javascript date value.
        *
        * @param {?Date} aDate     The Javascript Date to read, or null to reset
        * @param {Boolean} useUTC  If true, the UTC values of the date will be used
        */
       fromJSDate(aDate?: Date, useUTC: Boolean): void;

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
        * @param {ICAL.Timezone=} aZone    Timezone this position occurs in
        */
       fromData(aData: { year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number, isDate: Boolean }, aZone?: ICAL.Timezone): void;

       /**
        * Calculate the day of week.
        * @return {ICAL.Time.weekDay}
        */
       dayOfWeek(): ICAL.Time.weekDay;

       /**
        * Calculate the day of year.
        * @return {Number}
        */
       dayOfYear(): Number;

       /**
        * Returns a copy of the current date/time, rewound to the start of the
        * week. The resulting ICAL.Time instance is of icaltype date, even if this
        * is a date-time.
        *
        * @param {ICAL.Time.weekDay=} aWeekStart
        *        The week start weekday, defaults to SUNDAY
        * @return {ICAL.Time}      The start of the week (cloned)
        */
       startOfWeek(aWeekStart?: ICAL.Time.weekDay): ICAL.Time;

       /**
        * Returns a copy of the current date/time, shifted to the end of the week.
        * The resulting ICAL.Time instance is of icaltype date, even if this is a
        * date-time.
        *
        * @param {ICAL.Time.weekDay=} aWeekStart
        *        The week start weekday, defaults to SUNDAY
        * @return {ICAL.Time}      The end of the week (cloned)
        */
       endOfWeek(aWeekStart?: ICAL.Time.weekDay): ICAL.Time;

       /**
        * Returns a copy of the current date/time, rewound to the start of the
        * month. The resulting ICAL.Time instance is of icaltype date, even if
        * this is a date-time.
        *
        * @return {ICAL.Time}      The start of the month (cloned)
        */
       startOfMonth(): ICAL.Time;

       /**
        * Returns a copy of the current date/time, shifted to the end of the
        * month.  The resulting ICAL.Time instance is of icaltype date, even if
        * this is a date-time.
        *
        * @return {ICAL.Time}      The end of the month (cloned)
        */
       endOfMonth(): ICAL.Time;

       /**
        * Returns a copy of the current date/time, rewound to the start of the
        * year. The resulting ICAL.Time instance is of icaltype date, even if
        * this is a date-time.
        *
        * @return {ICAL.Time}      The start of the year (cloned)
        */
       startOfYear(): ICAL.Time;

       /**
        * Returns a copy of the current date/time, shifted to the end of the
        * year.  The resulting ICAL.Time instance is of icaltype date, even if
        * this is a date-time.
        *
        * @return {ICAL.Time}      The end of the year (cloned)
        */
       endOfYear(): ICAL.Time;

       /**
        * First calculates the start of the week, then returns the day of year for
        * this date. If the day falls into the previous year, the day is zero or negative.
        *
        * @param {ICAL.Time.weekDay=} aFirstDayOfWeek
        *        The week start weekday, defaults to SUNDAY
        * @return {Number}     The calculated day of year
        */
       startDoyWeek(aFirstDayOfWeek?: ICAL.Time.weekDay): Number;

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
        * @param {ICAL.Time.weekDay} aDayOfWeek       Day of week to check
        * @param {Number} aPos                        Relative position
        * @return {Boolean}                           True, if its the nth weekday
        */
       isNthWeekDay(aDayOfWeek: ICAL.Time.weekDay, aPos: Number): Boolean;

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
        * @see ICAL.Time.weekOneStarts
        * @param {ICAL.Time.weekDay} aWeekStart        The weekday the week starts with
        * @return {Number}                             The ISO week number
        */
       weekNumber(aWeekStart: ICAL.Time.weekDay): Number;

       /**
        * Adds the duration to the current time. The instance is modified in
        * place.
        *
        * @param {ICAL.Duration} aDuration         The duration to add
        */
       addDuration(aDuration: ICAL.Duration): void;

       /**
        * Subtract the date details (_excluding_ timezone).  Useful for finding
        * the relative difference between two time objects excluding their
        * timezone differences.
        *
        * @param {ICAL.Time} aDate     The date to substract
        * @return {ICAL.Duration}      The difference as a duration
        */
       subtractDate(aDate: ICAL.Time): ICAL.Duration;

       /**
        * Subtract the date details, taking timezones into account.
        *
        * @param {ICAL.Time} aDate  The date to subtract
        * @return {ICAL.Duration}  The difference in duration
        */
       subtractDateTz(aDate: ICAL.Time): ICAL.Duration;

       /**
        * Compares the ICAL.Time instance with another one.
        *
        * @param {ICAL.Duration} aOther        The instance to compare with
        * @return {Number}                     -1, 0 or 1 for less/equal/greater
        */
       compare(aOther: ICAL.Duration): Number;

       /**
        * Compares only the date part of this instance with another one.
        *
        * @param {ICAL.Duration} other         The instance to compare with
        * @param {ICAL.Timezone} tz            The timezone to compare in
        * @return {Number}                     -1, 0 or 1 for less/equal/greater
        */
       compareDateOnlyTz(other: ICAL.Duration, tz: ICAL.Timezone): Number;

       /**
        * Convert the instance into another timzone. The returned ICAL.Time
        * instance is always a copy.
        *
        * @param {ICAL.Timezone} zone      The zone to convert to
        * @return {ICAL.Time}              The copy, converted to the zone
        */
       convertToZone(zone: ICAL.Timezone): ICAL.Time;

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
        * var time = new ICAL.Time(deserialized);
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
        * Create a new ICAL.Time from the day of year and year. The date is returned
        * in floating timezone.
        *
        * @param {Number} aDayOfYear     The day of year
        * @param {Number} aYear          The year to create the instance in
        * @return {ICAL.Time}            The created instance with the calculated date
        */
       static fromDayOfYear(aDayOfYear: Number, aYear: Number): ICAL.Time;

       /**
        * Returns a new ICAL.Time instance from a date string, e.g 2015-01-02.
        *
        * @deprecated                Use {@link ICAL.Time.fromDateString} instead
        * @param {String} str        The string to create from
        * @return {ICAL.Time}        The date/time instance
        */
       static fromStringv2(str: String): ICAL.Time;

       /**
        * Returns a new ICAL.Time instance from a date string, e.g 2015-01-02.
        *
        * @param {String} aValue     The string to create from
        * @return {ICAL.Time}        The date/time instance
        */
       static fromDateString(aValue: String): ICAL.Time;

       /**
        * Returns a new ICAL.Time instance from a date-time string, e.g
        * 2015-01-02T03:04:05. If a property is specified, the timezone is set up
        * from the property's TZID parameter.
        *
        * @param {String} aValue         The string to create from
        * @param {ICAL.Property=} prop   The property the date belongs to
        * @return {ICAL.Time}            The date/time instance
        */
       static fromDateTimeString(aValue: String, prop?: ICAL.Property): ICAL.Time;

       /**
        * Returns a new ICAL.Time instance from a date or date-time string,
        *
        * @param {String} aValue         The string to create from
        * @return {ICAL.Time}            The date/time instance
        */
       static fromString(aValue: String): ICAL.Time;

       /**
        * Creates a new ICAL.Time instance from the given Javascript Date.
        *
        * @param {?Date} aDate     The Javascript Date to read, or null to reset
        * @param {Boolean} useUTC  If true, the UTC values of the date will be used
        */
       static fromJSDate(aDate?: Date, useUTC: Boolean): void;

       /**
        * Creates a new ICAL.Time instance from the the passed data object.
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
        * @param {ICAL.Timezone=} aZone    Timezone this position occurs in
        */
       static fromData(aData: { year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number, isDate: Boolean }, aZone?: ICAL.Timezone): void;

       /**
        * Creates a new ICAL.Time instance from the current moment.
        * @return {ICAL.Time}
        */
       static now(): ICAL.Time;

       /**
        * Returns the date on which ISO week number 1 starts.
        *
        * @see ICAL.Time#weekNumber
        * @param {Number} aYear                  The year to search in
        * @param {ICAL.Time.weekDay=} aWeekStart The week start weekday, used for calculation.
        * @return {ICAL.Time}                    The date on which week number 1 starts
        */
       static weekOneStarts(aYear: Number, aWeekStart?: ICAL.Time.weekDay): ICAL.Time;

       /**
        * Get the dominical letter for the given year. Letters range from A - G for
        * common years, and AG to GF for leap years.
        *
        * @param {Number} yr           The year to retrieve the letter for
        * @return {String}             The dominical letter.
        */
       static getDominicalLetter(yr: Number): String;

       /**
        * January 1st, 1970 as an ICAL.Time.
        * @type {ICAL.Time}
        * @constant
        * @instance
        */
       static epochTime: ICAL.Time;

       /**
        * The days that have passed in the year after a given month. The array has
        * two members, one being an array of passed days for non-leap years, the
        * other analog for leap years.
        * @example
        * var isLeapYear = ICAL.Time.isLeapYear(year);
        * var passedDays = ICAL.Time.daysInYearPassedMonth[isLeapYear][month];
        * @type {Array.<Array.<Number>>}
        */
       static daysInYearPassedMonth: Array.<Number[]>;

       /**
        * The weekday, 1 = SUNDAY, 7 = SATURDAY. Access via
        * ICAL.Time.MONDAY, ICAL.Time.TUESDAY, ...
        *
        * @typedef {Number} weekDay
        * @memberof ICAL.Time
        */
       type weekDay = Number;

       /**
        * The default weekday for the WKST part.
        * @constant
        * @default ICAL.Time.MONDAY
        */
       static DEFAULT_WEEK_START: any;

   }

   /**
    * @classdesc
    * Timezone representation, created by passing in a tzid and component.
    *
    * @example
    * var vcalendar;
    * var timezoneComp = vcalendar.getFirstSubcomponent('vtimezone');
    * var tzid = timezoneComp.getFirstPropertyValue('tzid');
    *
    * var timezone = new ICAL.Timezone({
    *   component: timezoneComp,
    *   tzid
    * });
    *
    * @class
    * @param {ICAL.Component|Object} data options for class
    * @param {String|ICAL.Component} data.component
    *        If data is a simple object, then this member can be set to either a
    *        string containing the component data, or an already parsed
    *        ICAL.Component
    * @param {String} data.tzid      The timezone identifier
    * @param {String} data.location  The timezone locationw
    * @param {String} data.tznames   An alternative string representation of the
    *                                  timezone
    * @param {Number} data.latitude  The latitude of the timezone
    * @param {Number} data.longitude The longitude of the timezone
    */
   class Timezone {
       /**
        * @classdesc
        * Timezone representation, created by passing in a tzid and component.
        *
        * @example
        * var vcalendar;
        * var timezoneComp = vcalendar.getFirstSubcomponent('vtimezone');
        * var tzid = timezoneComp.getFirstPropertyValue('tzid');
        *
        * var timezone = new ICAL.Timezone({
        *   component: timezoneComp,
        *   tzid
        * });
        *
        * @class
        * @param {ICAL.Component|Object} data options for class
        * @param {String|ICAL.Component} data.component
        *        If data is a simple object, then this member can be set to either a
        *        string containing the component data, or an already parsed
        *        ICAL.Component
        * @param {String} data.tzid      The timezone identifier
        * @param {String} data.location  The timezone locationw
        * @param {String} data.tznames   An alternative string representation of the
        *                                  timezone
        * @param {Number} data.latitude  The latitude of the timezone
        * @param {Number} data.longitude The longitude of the timezone
        */
       constructor(data: (ICAL.Component|{ component: (String|ICAL.Component), tzid: String, location: String, tznames: String, latitude: Number, longitude: Number }));

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
        * @type {ICAL.Component}
        */
       component: ICAL.Component;

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
        * @param {ICAL.Component|Object} aData options for class
        * @param {String|ICAL.Component} aData.component
        *        If aData is a simple object, then this member can be set to either a
        *        string containing the component data, or an already parsed
        *        ICAL.Component
        * @param {String} aData.tzid      The timezone identifier
        * @param {String} aData.location  The timezone locationw
        * @param {String} aData.tznames   An alternative string representation of the
        *                                  timezone
        * @param {Number} aData.latitude  The latitude of the timezone
        * @param {Number} aData.longitude The longitude of the timezone
        */
       fromData(aData: (ICAL.Component|{ component: (String|ICAL.Component), tzid: String, location: String, tznames: String, latitude: Number, longitude: Number })): void;

       /**
        * Finds the utcOffset the given time would occur in this timezone.
        *
        * @param {ICAL.Time} tt        The time to check for
        * @return {Number} utc offset in seconds
        */
       utcOffset(tt: ICAL.Time): Number;

       /**
        * The string representation of this timezone.
        * @return {String}
        */
       toString(): String;

       /**
        * Convert the date/time from one zone to the next.
        *
        * @param {ICAL.Time} tt                  The time to convert
        * @param {ICAL.Timezone} from_zone       The source zone to convert from
        * @param {ICAL.Timezone} to_zone         The target zone to conver to
        * @return {ICAL.Time}                    The converted date/time object
        */
       static convert_time(tt: ICAL.Time, from_zone: ICAL.Timezone, to_zone: ICAL.Timezone): ICAL.Time;

       /**
        * Creates a new ICAL.Timezone instance from the passed data object.
        *
        * @param {ICAL.Component|Object} aData options for class
        * @param {String|ICAL.Component} aData.component
        *        If aData is a simple object, then this member can be set to either a
        *        string containing the component data, or an already parsed
        *        ICAL.Component
        * @param {String} aData.tzid      The timezone identifier
        * @param {String} aData.location  The timezone locationw
        * @param {String} aData.tznames   An alternative string representation of the
        *                                  timezone
        * @param {Number} aData.latitude  The latitude of the timezone
        * @param {Number} aData.longitude The longitude of the timezone
        */
       static fromData(aData: (ICAL.Component|{ component: (String|ICAL.Component), tzid: String, location: String, tznames: String, latitude: Number, longitude: Number })): void;

       /**
        * The instance describing the UTC timezone
        * @type {ICAL.Timezone}
        * @constant
        * @instance
        */
       static utcTimezone: ICAL.Timezone;

       /**
        * The instance describing the local timezone
        * @type {ICAL.Timezone}
        * @constant
        * @instance
        */
       static localTimezone: ICAL.Timezone;

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
    * @alias ICAL.TimezoneService
    */
   module TimezoneService {
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
        * @return {?ICAL.Timezone} The timezone, or null if not found
        */
       function get(tzid: String): ICAL.Timezone;

       /**
        * Registers a timezone object or component.
        *
        * @param {String=} name
        *        The name of the timezone. Defaults to the component's TZID if not
        *        passed.
        * @param {ICAL.Component|ICAL.Timezone} zone
        *        The initialized zone or vtimezone.
        */
       function register(name?: String, zone: (ICAL.Component|ICAL.Timezone)): void;

       /**
        * Removes a timezone by its tzid from the list.
        *
        * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
        * @return {?ICAL.Timezone} The removed timezone, or null if not registered
        */
       function remove(tzid: String): ICAL.Timezone;

   }

   /**
    * @classdesc
    * This class represents the "duration" value type, with various calculation
    * and manipulation methods.
    *
    * @class
    * @alias ICAL.UtcOffset
    * @param {Object} aData          An object with members of the utc offset
    * @param {Number=} aData.hours   The hours for the utc offset
    * @param {Number=} aData.minutes The minutes in the utc offset
    * @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
    */
   class UtcOffset {
       /**
        * @classdesc
        * This class represents the "duration" value type, with various calculation
        * and manipulation methods.
        *
        * @class
        * @alias ICAL.UtcOffset
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
        * @return {ICAL.UtcOffset}     The cloned object
        */
       clone(): ICAL.UtcOffset;

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
        * @param {ICAL.UtcOffset} other        The other offset to compare with
        * @return {Number}                     -1, 0 or 1 for less/equal/greater
        */
       compare(other: ICAL.UtcOffset): Number;

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
        * Creates a new {@link ICAL.UtcOffset} instance from the passed string.
        *
        * @param {String} aString    The string to parse
        * @return {ICAL.Duration}    The created utc-offset instance
        */
       static fromString(aString: String): ICAL.Duration;

       /**
        * Creates a new {@link ICAL.UtcOffset} instance from the passed seconds
        * value.
        *
        * @param {Number} aSeconds       The number of seconds to convert
        */
       static fromSeconds(aSeconds: Number): void;

   }

   /**
    * Describes a vCard time, which has slight differences to the ICAL.Time.
    * Properties can be null if not specified, for example for dates with
    * reduced accuracy or truncation.
    *
    * Note that currently not all methods are correctly re-implemented for
    * VCardTime. For example, comparison will have undefined results when some
    * members are null.
    *
    * Also, normalization is not yet implemented for this class!
    *
    * @alias ICAL.VCardTime
    * @class
    * @extends {ICAL.Time}
    * @param {Object} data                           The data for the time instance
    * @param {Number=} data.year                     The year for this date
    * @param {Number=} data.month                    The month for this date
    * @param {Number=} data.day                      The day for this date
    * @param {Number=} data.hour                     The hour for this date
    * @param {Number=} data.minute                   The minute for this date
    * @param {Number=} data.second                   The second for this date
    * @param {ICAL.Timezone|ICAL.UtcOffset} zone     The timezone to use
    * @param {String} icaltype                       The type for this date/time object
    */
   class VCardTime extends ICAL.Time {
       /**
        * Describes a vCard time, which has slight differences to the ICAL.Time.
        * Properties can be null if not specified, for example for dates with
        * reduced accuracy or truncation.
        *
        * Note that currently not all methods are correctly re-implemented for
        * VCardTime. For example, comparison will have undefined results when some
        * members are null.
        *
        * Also, normalization is not yet implemented for this class!
        *
        * @alias ICAL.VCardTime
        * @class
        * @extends {ICAL.Time}
        * @param {Object} data                           The data for the time instance
        * @param {Number=} data.year                     The year for this date
        * @param {Number=} data.month                    The month for this date
        * @param {Number=} data.day                      The day for this date
        * @param {Number=} data.hour                     The hour for this date
        * @param {Number=} data.minute                   The minute for this date
        * @param {Number=} data.second                   The second for this date
        * @param {ICAL.Timezone|ICAL.UtcOffset} zone     The timezone to use
        * @param {String} icaltype                       The type for this date/time object
        */
       constructor(data: { year: Number, month: Number, day: Number, hour: Number, minute: Number, second: Number }, zone: (ICAL.Timezone|ICAL.UtcOffset), icaltype: String);

       /**
        * Returns a new ICAL.VCardTime instance from a date and/or time string.
        *
        * @param {String} aValue     The string to create from
        * @param {String} aIcalType  The type for this instance, e.g. date-and-or-time
        * @return {ICAL.VCardTime}   The date/time instance
        */
       static fromDateAndOrTimeString(aValue: String, aIcalType: String): ICAL.VCardTime;

   }

}

/**
 * This object is returned by {@link ICAL.Event#getOccurrenceDetails getOccurrenceDetails}
 *
 * @typedef {Object} occurrenceDetails
 * @memberof ICAL.Event
 * @property {ICAL.Time} recurrenceId       The passed in recurrence id
 * @property {ICAL.Event} item              The occurrence
 * @property {ICAL.Time} startDate          The start of the occurrence
 * @property {ICAL.Time} endDate            The end of the occurrence
 */
interface IoccurrenceDetails {
   recurrenceId: ICAL.Time;
   item: ICAL.Event;
   startDate: ICAL.Time;
   endDate: ICAL.Time;
}

