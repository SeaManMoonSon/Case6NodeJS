import express from "express";
import eventViews from "../views/eventViews.js";
import eventModel from "../models/eventModel.js";
import fs from "fs";
import res from "express/lib/response";


export default {
    getAll: (req,res) => {
        res.render("index", { events: eventModel.getAll() });  
    },
    createEvent: (req, res) => {
        const title = req.body.title;
        const date = req.body.date;
    
        const check = eventModel.addEvent(title, date);

        if (!check) {
            res.render("404", { message: "Could not save" });
            return;
        }

        res.render("index", { events: eventModel.getAll() });
    },
    updateEvent: function(id, newTitle, newDate) {
       const id = Number(req.params.id);
       const title = req.body.title;
       const date = req.body.date;

       if (!title || !date) {
           const check = eventModel.updateEvent(id, title, date);
           return;
       }

       console.log("Event Updated");

       const check = eventModel.updateEvent(id, title, date);

       if (!check) {
           console.log("Event not updated");
           return;
       }

       console.log("Event Updated");

       res.redirect('/');
    }
    // deleteEvent: (req, res) => {
    //     console.log("testing");
    // }
}