(() => {

    let __messaging = {
        debug: true,
        verbose: true,
        throw: true
    };

    function advancedInterval(f, o, o2) {
        "use strict";


        function __tosser(_em) {
            console.log(_em);
            if (__messaging.throw) throw new Error(__em);
        }

        function __debugger(_em) {
            if (__messaging.debug) console.log(_em);
        }

        function __verbose(_em) {
            if (__messaging.debug && __messaging.verbose) console.log(_em);
        }

        let __interval, __elapsed = 0, __counter = 0;

        let icnf = (typeof o === 'object') ? o : (() => {
            if (typeof o === 'number' && typeof o2 === 'number') {
                return {
                    duration: o2,
                    every: o
                }
            } else if (typeof o === 'number' && typeof o2 === 'undefined') {
                return {
                    every: o
                }
            } else {
                return {}
            }
        })();

        let api = {
            start: () => {
                if (typeof icnf.step === 'undefined') {
                    __tosser("you must declare the interval step function as the first parameter");
                    return
                }

                if (typeof icnf.every !== 'number') {
                    __tosser("the interval length must be passed as the second parameter, or as the 'every' property of the second parameter, if using an object for advanced configuration.");
                    return
                }

                let __res = false;

                let has_while = (typeof icnf.while === 'function');
                if (has_while) __verbose("interval has a while condition");

                console.info(__messaging.debug, __messaging.verbose);

                if (typeof icnf.duration === 'undefined') {
                    console.info("started an interval of", icnf.every);
                } else {
                    console.info("started an interval every ", icnf.every, "for", icnf.duration);
                }

                __interval = setInterval(() => {
                    let while_result = !has_while || icnf.while();
                    if (while_result) {
                        __res = icnf.step();
                        __elapsed += icnf.every;
                        __counter++;

                        __verbose("interval step " + __counter + ", elapsed: " + __elapsed);
                    }

                    if (__res === true || !while_result || (typeof icnf.duration != 'undefined' && __elapsed >= icnf.duration)) {
                        if (__res === true) {
                            __debugger("interval ending because step function returned true");
                        } else if (!while_result) {
                            __debugger("interval ending because while condition returned false");
                        } else {
                            __debugger("interval ending because duration has been exceeded");
                        }
                        clearInterval(__interval);
                        __interval = undefined;
                        if (typeof icnf.then != 'undefined') {

                            __debugger("interval executing then");
                            icnf.then();
                        }
                    }
                }, icnf.every);

            },

            stop: () => {
                if (typeof __interval !== 'undefined') {
                    clearInterval(__interval);
                }
            },

            get elapsed() {
                return __elapsed;
            },

            get count() {
                return __counter;
            },
        };

        function stub(__prop, __typed) {
            api[__prop] = (_v) => {
                if (typeof _v === __typed) {
                    icnf[__prop] = _v;
                    return api;
                } else {
                    __tosser("advancedInterval: property", __prop, "should be a", __typed);
                }
            }
        }

        stub('while', 'function');
        stub('duration', 'number');
        stub('every', 'number');
        stub('auto', 'boolean');
        stub('then', 'function');
        stub('step', 'function');

        let fis;
        if (fis = (typeof f === 'function')) {
            icnf.step = f;
        }

        icnf.auto = (() => {
            if (typeof icnf.auto !== 'undefined') {
                return icnf.auto;
            } else {
                return (fis && (icnf.duration !== undefined || icnf.every !== undefined));
            }
        })();

        if (icnf.auto) {
            setTimeout(api.start, 1);
        }

        return api;
    }

    const IntervalBot = advancedInterval;

    function mapProperty(__o, __p) {
        (Object.defineProperty(__o, __p, {
            get: function () {
                return __messaging[__p];
            },
            set: function (__v) {
                __messaging[__p] = __v;
                console.log(__p, __v);
            }
        }));
    }

    mapProperty(IntervalBot, "debug");
    mapProperty(IntervalBot, "verbose");
    mapProperty(IntervalBot, "throw");

    if (typeof module !== 'undefined') {
        module.exports = IntervalBot;
    }
})();