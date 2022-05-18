import express from "express";
import eventViews from "../views/eventViews.js";
import eventModel from "../models/eventModel.js";
import fs from "fs";


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

        res.redirect('/');
        },
    // updateEvent: function(id, newTitle, newDate) {
    //    const id = Number(req.params.id);
    //    const title = req.body.title;
    //    const date = req.body.date;

    //    if (!title || !date) {
    //        const check = eventModel.updateEvent(id, title, date);
    //        return;
    //    }

    //    console.log("Event Updated");

    //    const check = eventModel.updateEvent(id, title, date);

    //    if (!check) {
    //        console.log("Event not updated");
    //        return;
    //    }

    //    console.log("Event Updated");

    //    res.redirect('/');
    // }
    // deleteEvent: (req, res) => {
    //     console.log("testing");
    // }
}