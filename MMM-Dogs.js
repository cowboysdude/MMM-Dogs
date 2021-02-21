/* Magic Mirror
 * Module: MMM-Dogs
 *
 * By cowboysdude 
 * 
 */


Module.register("MMM-Dogs", {

    // Module config defaults.
    defaults: {
        updateInterval: 5 * 60 * 1000,
        animationSpeed: 0,
        initialLoadDelay: 1110
    },
   
    getStyles: function() {
        return ["MMM-Dogs.css"];
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.today = "";
        this.dogs = {};
        this.scheduleUpdate();
    },

    getDom: function() {

        var dogs = this.dogs.message; 

        var dogDiv = document.createElement("div"); 
        dogDiv.innerHTML = `<img src="${dogs}" id="pic">`;
        return dogDiv;
    },

    processDogs: function(data) {
        this.today = data.Today;
        this.dogs = data;        
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getDogs();
        }, this.config.updateInterval);

        this.getDogs(this.config.initialLoadDelay);
    },

    getDogs: function() {
        this.sendSocketNotification('GET_DOGS');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "DOGS_RESULT") {
            this.processDogs(payload);
            this.updateDom(this.config.fadeSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
