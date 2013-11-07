angular.module('fl.wizard', [])

    .service('wizard', function() {
        /* [{step_name: 0}, {step_name: 1}, ... ] for easy handling in html */
        this.steps         = {};

        /* [step_name, step_name, ...] for easy handling in js */
        this.steps_indexed = [];

        /* current step index */
        this.index         = 0;

        /* [{step_name: 0}, {step_name: 1}, ... ] where 1 means completed */
        this.completed     = {};

        /* 
        * by default we restrict users from going to the next step until
        * the current step has been completed. Set this at runtime in init().
        */
        this.unrestrict      = false;

        /*
        * @Object steps - list of steps in format [{step_name: 0}, {step_name: 1}]
        * where 0 indicates non active step, and 1 indicates current (selected) step
        * - if you make the initial active step something other than the actual first
        *   step, the wizard will mark as completed all the steps before it.
        *   This enables you to resume a previous wizard session.
        *
        * @function callback - (optional) a function to callback on each step change.
        *
        * @bool unrestrict - (optional) set to true if you want to free linear navigation;
        * the user will be able to go to a step that hasn't been completed.
        * 
        * A step is marked completed when you call wizard.next() or wizard.finish()
        */
        this.init = function(steps, callback, unrestrict) {
            if (typeof(steps) != 'object') steps = {'undefined': 1};
            this.steps = steps;
            this.index = 0;
            var counter = 0;
            this.callback = typeof(callback) == 'undefined' ? function(){ return true; } : callback;
            this.unrestrict = typeof(unrestrict) == 'undefined' ? false : true;
			this.steps_indexed = [];
            for (s in this.steps) {
                this.steps_indexed.push(s);
                if (this.steps[s]) {
                    this.index = counter;
                    /* mark all previous steps completed */
                    for (var i=0; i<counter; i++) this.completed[this.steps_indexed[i]] = 1;
                }
                counter++;
            }

            return this;
        };

        this.hasPrev = function() {
            return this.index > 0;
        };

        this.hasNext = function() {
            return this.index < this.steps_indexed.length -1;
        };

        this.setStep = function(i) {
            this.index = i;
            for (var s in this.steps) this.steps[s] = 0;
            this.steps[this.steps_indexed[i]] = 1;
        };

        this.markCompleted = function() {
            this.completed[this.steps_indexed[this.index]] = 1;
        };

        this.markIncomplete = function() {
            this.completed[this.steps_indexed[this.index]] = 0;
        };

        this.next = function() {
            if (!this.hasNext())
                return false;

            this.completed[this.steps_indexed[this.index]] = 1;
            this.setStep(++this.index);

            return this.callback(this.steps);
        };

        this.back = function() {
            if (!this.hasPrev())
                return false;

            this.setStep(--this.index);
            this.callback(this.steps);
        };

        /*
        * @string step_name
        *
        * - does not mark the current step as completed !
        */
        this.goto = function(step) {
            var prev_step = '',
                current_step = '',
                c = 0;

            for (var s in this.steps) {
                if (s == step) {
                    if (this.unrestrict || c == 0 || this.completed[prev_step]) {
                        this.setStep(c);

                        return this.callback(this.steps);
                    } else {
                        this.steps[current_step] = 1;

                        return this.callback(this.steps);
                    }
                } else {
                    if (this.steps[s]) current_step = s;
                    prev_step = s;
                }
                c++;
            }

            // if not found, return first step instead
            this.index = 0;
            this.steps[0] = 1;

            return this.callback(this.steps);
        };
    })

    ;
