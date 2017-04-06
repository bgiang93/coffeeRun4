(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }

        this.serverUrl = url;
    }

    RemoteDataStore.prototype.add = function(key, val) {
        // $.post knows three things: who to talk to, what to say,
        // and what to do with the information it gets back in the response.
        return $.post(this.serverUrl, val, function(serverResponse) {
            console.log(serverResponse);
        });
    };

    RemoteDataStore.prototype.getAll = function(cb) {
        // remoteDS.get('test@bignerdranch.com', function () {});
        return $.get(this.serverUrl, function(serverResponse) {
            if (cb) {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    RemoteDataStore.prototype.get = function(key, cb) {
        return $.get(this.serverUrl + '/' + key, function(serverResponse) {
            if (cb) {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    RemoteDataStore.prototype.remove = function(key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);
