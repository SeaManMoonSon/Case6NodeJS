import fs from "fs";

const database = "./eventsDB.json";

const eventModel = {
    readEvents: function() {
        return JSON.parse(fs.readFileSync(database, "utf-8"));
    },
    getEvent: function(id) {
        return this.readEvents().find((event) => event.id === id);
    },
    saveEvent: function(events) {
        return fs.writeFileSync(database, JSON.stringify(events));
    },
    addEvent: function(title, desc) {
        const allEvents = this.readEvents();
        const lastEvent = allEvents[allEvents.length - 1];
        const newId = (lastEvent?.id || 0) + 1;

        const newEvent = {id: newId, title, desc};

        allEvents.push(newEvent);

        this.saveEvent(allEvents);

        return true;
    }
}

export default eventModel;