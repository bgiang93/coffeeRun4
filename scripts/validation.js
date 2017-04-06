(function(window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function(email) {
            if (/.+@bignerdranch\.com$/.test(email)) {
                // Chapter 13 Silver Challenge
                // Check the server right here for unique values
                    
                return true;
            } else {
                return false;
            }
            // return /.+@bignerdranch\.com$/.test(email);
        },

        isDecaf: function(order, strength) {
            if (/decaf/.test(order) && strength > 20) {
                return false;
            } else {
                return true;
            }
        },
        // return !(order.includes('decaf') && (strength > 20));
    };

    // This is the thing that connects to the main.js
    App.Validation = Validation;
    window.App = App;

})(window);
