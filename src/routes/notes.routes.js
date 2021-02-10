// CREAR RUTAS CRUD
const { Router } = require("express")
const router = Router()


const { renderNoteForm,
        createNewNote,
        renderNotes,
        renderEditForm,
        updateNote,
        deleteNote 
}        = require("../controllers/notes.controller");


const {isAuthenticated} = require("../helpers/auth")  //PARA AUTENTICAR LA SESION

//NEW NOTE
router.get("/notes/add", isAuthenticated, renderNoteForm);
router.post("/notes/new-note", isAuthenticated, createNewNote);


//GET ALL NOTE
router.get("/notes", isAuthenticated, renderNotes);


//EDIT NOTES
router.get("/notes/edit/:id", isAuthenticated, renderEditForm); //CUANDO QUIERA ACTUALIZAR UNA NOTA SE USA EL COMANDO ":id" YA QUE BUSCARA EN LA BASE DE DATOS SI ESE DATO EXISTE
router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

//DELETE NOTES

router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

//EL METODO GET ES PARA OBTENER ALGO DEL SERVIDOR
//EL METODO POST ES PARA CREAR
//EL METODO PUT ES PARA ACTUALIZAR ALGO QUE YA EXISTE
//EL METODO DELETE ES PARA ELIMINAR :v
module.exports = router;