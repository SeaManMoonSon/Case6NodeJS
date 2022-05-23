import fs from "fs";

const database = "./eventsDB.json";

const eventModel = {
    getAll: function () {
        return JSON.parse(fs.readFileSync(database, "utf-8"));
    },
    getEvent: function (id) {
        return this.getAll().find((event) => event.id === id);
    },
    saveEvent: function (events) {
        try {
            fs.writeFileSync(database, JSON.stringify(events));
        } catch (error) {
            console.log("error", error);
        }
    },
    addEvent: function (title, time) {
        const allEvents = this.getAll();
        const lastEvent = allEvents[allEvents.length - 1];
        const newId = (lastEvent?.id || 0) + 1;
        const newEvent = {
            id: newId,
            title,
            time
        };

        allEvents.push(newEvent);

        this.saveEvent(allEvents);

        return true;
    },
    deleteEvent: function (id) {
        const allEvents = this.getAll();

        if(!allEvents) {
            return false;
        }

        const filteredEvents = allEvents.filter((event) => event.id !== id);

        this.saveEvent(filteredEvents);

        return true;
    },
    editEvent: function(id, newTitle, newTime) {
            const allEvents = this.getAll();
            const leg = allEvents.findIndex((event) => event.id === id);

            if(!leg < 0) {
                return false;
            }

            allEvents[leg].title = newTitle;
            allEvents[leg].time = newTime;

            this.saveEvent(allEvents);

            return true;
        }
}

export default eventModel;