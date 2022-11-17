import Tarea from './../models/Tarea.js';

export const tareaResolver = (root, args) => {
  return Tarea.findById(args._id).exec()
}

export const allTareasResolver = (root, args) => {
  return Tarea.find().exec()
}

export const addTareaResolver = (root, args) => {
    const tarea = new Tarea({...args})
    return tarea.save()
}
