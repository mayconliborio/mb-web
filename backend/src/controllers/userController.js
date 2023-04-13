const User = require('../models/user')

exports.registerUser = async (req, res) => {
  try {
    const {
      email,
      telefone,
      senha,
      nome,
      identificacaoFiscal,
      dataRegistro,
      tipoPessoa,
    } = req.body

    if (
      !email ||
      !telefone ||
      !senha ||
      !nome ||
      !identificacaoFiscal ||
      !dataRegistro ||
      !tipoPessoa
    ) {
      return res.status(400).json({
        message: 'Todos os campos devem ser preenchidos.',
        status: 'warning',
      })
    }

    await User.create({
      email,
      telefone,
      senha,
      nome,
      identificacaoFiscal,
      dataRegistro,
      tipoPessoa,
    })
    res
      .status(202)
      .json({ message: 'Usuário criado com sucesso', status: 'success' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao salvar o usuário', status: 'error' })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao obter lista de usuários', status: 'error' })
  }
}
