import express from "express";
import eventViews from "../views/eventViews.js";
import eventModel from "../models/eventModel.js";

export default {
    createEvent: (req, res) => {
        const title = req.body.title;
        const desc = req.body.desc;

        console.log(title, desc);

        res.render("events", { events: eventModel.readEvents() });
    },
    getAllEvents: (req,res) => {
        res.render("events", { events: eventModel.readEvents() });
    }
}