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
      return res
        .status(400)
        .json({ message: 'Todos os campos devem ser preenchidos.' })
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
    res.status(201).json({ message: 'Usuário criado com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar o usuário' })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter lista de usuários' })
  }
}
