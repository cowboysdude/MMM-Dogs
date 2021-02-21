/* Magic Mirror
 * Module: MMM-Dogs
 *
 * By Cowboysdude
 * 
 */
const NodeHelper = require('node_helper');
const request = require('request');

module.exports = NodeHelper.create({

    start: function() {
         console.log("Starting module: " + this.name);
    },

    getDogs: function(url) {
        request({
            url: "https://dog.ceo/api/breeds/image/random",
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
console.log(result);
                this.sendSocketNotification('DOGS_RESULT', result);
            }
        });
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_DOGS') { 
            this.getDogs(payload);
        }
    }
});
