import express from 'express'

const app = express()

/**
 * GET    => Buscar
 * POST   => Criar
 * PUT    => Alterar
 * DELETE => Remover
 * PATCH  => Alterar uma informação específica
 */

app.get('/', (req, res) => {
  return res.send('Hello World')
})

app.post('/post', (req, res) => {
  return res.send('Hello World POST')
})

app.listen(3000, () => console.log('Server started'))
