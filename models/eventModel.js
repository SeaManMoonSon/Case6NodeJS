import fs from "fs";

const database = "./eventsDB.json";

const eventModel = {
    getAll: function() {
        return JSON.parse(fs.readFileSync(database, "utf-8"));
    },
    getEvent: function(id) {
        return this.getAll().find((event) => event.id === id);
    },
    saveEvent: function(events) {
        try {
            fs.writeFileSync(database, JSON.stringify(events));
        } catch (error) {
            console.log("error", error);
        }
    },
    addEvent: function(title, date) {
        const allEvents = this.getAll();
        const lastEvent = allEvents[allEvents.length - 1];
        const newId = (lastEvent?.id || 0) + 1;
        const newEvent = {id: newId, title, date};

        allEvents.push(newEvent);

        this.saveEvent(allEvents);

        return true;
    },
    updateEvent: function(id, newTitle, newDate) {
        const allEvents = this.getAll();

        if(!allEvents) {
            return false;
        }

        const idx = allEvents.findIndex((event) => event.id === id);

        console.log("a");

        if (idx < 0) {
            return false;
        }

        console.log("b");

        allEvents[idx].title = newTitle;
        allEvents[idx].date = newDate;

        console.log(allEvents);

        this.saveEvents(allEvents);

        console.log("c");

        return true;
    }
}

export default eventModel;