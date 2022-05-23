import eventModel from "../models/eventModel.js";


export default {
    getAll: (req,res) => {
        res.render("index", { events: eventModel.getAll() });  
    },
    createEvent: (req, res) => {
        const title = req.body.title;
        const time = req.body.time;
    
        const check = eventModel.addEvent(title, time);

        if (!check) {
            res.render("404", { message: "Could not save" });
            return;
        }

        res.render("index", { events: eventModel.getAll() });
    },
    deleteEvent: (req, res) => {
        const id = Number(req.params.id);

        if (id < 0) {
            console.log("error");
            return;
        }

        const toBeRemoved = eventModel.getEvent(id);
        const check = eventModel.deleteEvent(id);

        console.log(toBeRemoved);

        res.redirect('/index');
        },
    editEvent: (req, res) => {
        const id = Number(req.params.id);
        const title = req.body.title;
        const time = req.body.time;

        const check = eventModel.editEvent(id, title, time);

        res.render('/index');
    }
}