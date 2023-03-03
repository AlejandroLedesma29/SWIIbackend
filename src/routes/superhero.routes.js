const express = require("express");
const superhero_model = require("../models/superhero.models");
const routes = express.Router();

/* Funcion que permite crear un usuario */
routes.post("/", (req, res) => {
    const new_superhero = superhero_model(req.body);  
    new_superhero.
        save()
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)});
});

/* Funcion que permite listar usuarios existentes */
routes.get("/", (req, res) => {
    superhero_model.find(req.body) 
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)});
});

/* Funcion que permite consultar un usuario especifico*/
routes.get("/:superheroId", (req, res) => {
    const {superheroId} = req.params;
    superhero_model.findById({_id: superheroId})
    .then((data) => {res.json(data)})
    .catch((err) => {res.json(err)});
});

/* Funcion que permite editar un usuario especifico*/
routes.put("/:superheroId", (req, res) => {
    /*const {superheroId} = req.params */
    const superheroId = req.params.superheroId;
    const query = {_id:superheroId};
    const update = {$set:req.body}
    superhero_model.updateOne(query,update)
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)});
 });

/* Funcion que permite editar un usuario especifico*/
routes.delete("/:superheroId", (req, res) => {
    const {superheroId} = req.params
    superhero_model.deleteOne({_id:superheroId})
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)});
});

/* Eliminar todas las coincidencias realizando la busqueda
por una propiedad especifica
metodo deletMany */
routes.delete("/", (req, res) => {
    const query = {superhero: {$regex:"Batman"}};
    superhero_model.deleteMany(query)
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)});
});

/* Consultar por una propiedad los registo¿ros que sean 
diferentes http: GET
mongoose method: distinct */
routes.get("/:superpowers-list/:property", (req, res) => {
    const property = req.params.property;
    superhero_model
        .distinct(property) 
        .then((data) => {res.json(data)})
        .catch((err) => {res.json(err)});
});

/* Consultar por una propiedad ultimos 5 registors que 
sean diferentes http: GET
mongoose method: distinct y slice con parametro limit */
routes.get("/:property/:limit", (req, res) => {
    const property = req.params.property;
    const limit = parseInt(req.params.limit);
    superhero_model
        .distinct(property) 
        .then((data) => {res.json(data.slice(0,limit))})
        .catch((err) => {res.json(err)});
});

module.exports = routes;
