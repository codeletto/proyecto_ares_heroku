const notesCtrl = {};

const note = require("../models/Note");
const Note = require("../models/Note");

notesCtrl.renderNoteForm = (req, res) => {
    res.render("notes/new-note")
};

notesCtrl.createNewNote = async (req, res) => {
    const {tittle, description, state,  roundId, roundedNumber, qMembers, startDate, endDate, qDues, amount, total} = req.body;
    const newNote = new Note({tittle, description, state, roundId, roundedNumber, qMembers, startDate, endDate, qDues, amount, total})
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Ronda registrada");
    res.redirect("/notes/")
};

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).lean(); //EL "user: req.user.id" BUSCARA TODAS LAS NOTAS CON EL MISMO ID DE LA SESIÓN
    res.render("notes/all-notes", { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {    //SI LA NOTA EN SU PROPIEDAD USER ES DISTINTA AL USUARIO ACTUAL ENTONCES REDIRECCIONA A SUS PROPIAS NOTAS
        req.flash("error_msg", "No estás autorizado para esta operación")
        return res.redirect("/notes"); 
    }
    res.render("notes/edit-note", { note });
};

notesCtrl.updateNote = async (req, res) => {
    const {tittle, description, state,  roundId, roundedNumber, qMembers, startDate, endDate, qDues, amount, total} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {tittle, description, state, roundId, roundedNumber, qMembers, startDate, endDate, qDues, amount, total});
    req.flash("success_msg", "Ronda editada");
    res.redirect("/notes")
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id) //ESTA ES UNA FORMA DE PODER ELIMINAR
    req.flash("success_msg", "Ronda eliminada");
    res.redirect("/notes/") //PARA PODER REDIRECCIONAR A LA DIRECCION COLACADA UNA VEZ ELIMINADO EL FORMATO
};

module.exports = notesCtrl; 