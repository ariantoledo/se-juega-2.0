const Usuarios = require('../models/usuarios');

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.getAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuarios.getById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const nuevo = await Usuarios.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const actualizado = await Usuarios.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const eliminado = await Usuarios.delete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado', eliminado });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
