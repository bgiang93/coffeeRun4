(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    // Creates an array to store emails in a more global scope
    App.emails = [];

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        // This creates variable, formElement, that selects the entire form
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');

        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data)
            .then(function () {
                this.reset();
                this.elements[0].focus();
            }.bind(this));
        });
    };

    // Do the silver challenge here?
    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            // Event handler
            var emailAddress = event.target.value;
            // console.log(fn(emailAddress));
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addDecafHandler = function(fn) {
        // The function that is being passed is called everytime the input event is being triggered.
        // The .on method is what creates the event function
        this.$formElement.on('input', '[id="coffeeOrder"], [id="strengthLevel"]', function() {
            // Callback function happens asynchronously, you call it back after an event
            // Event handler
            var order = $('[id="coffeeOrder"]').val();
            var strength = $('[id="strengthLevel"]').val();
            //
            // console.log(order, strength);
            // console.log(fn(order, strength));
            var message = '';
            if (fn(order, strength) ) {
                // console.log('hello');
                $('[id="strengthLevel"]').get(0).setCustomValidity('');
            } else {
                message = 'Not actually decaf! Strength must be below 20';
                $('[id="strengthLevel"]').get(0).setCustomValidity(message);
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
