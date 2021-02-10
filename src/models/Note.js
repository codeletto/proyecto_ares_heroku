// ESTE ARCHIVO SIRVE PARA GUARDAR EL ESQUEMA DE LAS NOTAS DE LA BASE DE DATOS

const { Schema, model } = require("mongoose"); // "SCHEMA" NOS PERMITE DEFINAR UN ESQUEMA O QUE VAMOS A GUARDAR EN NUESTRA BD. "MODEL" A PARTIR DE UN ESQUEMA NOS PERMITE CREAR UNA CLASE. AMBOS NOS PERMITEN DEFINIR UN MODELO DE BASE DE DATOS

const NoteSchema = new Schema({
    tittle: {
        type: String,  //DECLARAMOS EL TIPO DE DATOS PARA EL MODELO 
        required: false,  //DECLARAMOS QUE ESTE MODELO ES NECESARIO PARA LA BASE DE DATOS
    },
    description: {
        type: String,
        required: false,
    },
    quantity: {
        type: String,
        required: false,
    },
    user: {
        type: String,
        required: true,
    },
    roundId: {
        type: String,
        required: true,
    },
    roundedNumber: {
        type: String,
        required: true,
    },
    qMembers: {
        type: String,
        required: false,
    },
    startDate: {
        type: String,
        required: false,
    },
    endDate: {
        type: String,
        required: false,
    },
    qDues: {
        type: String,
        required: false,
    },
    amount: {
        type: String,
        required: false,
    },
    total: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
}, {
    timestamps: true  // ESTA PROPIEDAD HARA QUE SE AGREGUE, POR DEFECTO, QUIEN Y CUANDO CREO EL DATO
})

module.exports = model("Note", NoteSchema);