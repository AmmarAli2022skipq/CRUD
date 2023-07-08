const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let data = [
  {
    id: 1,
    name: 'Logitech MX Master 3 Wireless Mouse',
    description: `The Logitech MX Master 3 is a premium wireless mouse designed for productivity and comfort. It features advanced tracking technology, customizable buttons, and a high-precision scroll wheel. The mouse has a sleek design with a rechargeable battery that lasts up to 70 days on a single charge`,
    price: 99,
  },
  {
    id: 2,
    name: 'Samsung 860 EVO 1TB Solid State Drive (SSD)',
    description: `The Samsung 860 EVO is a high-performance solid-state drive that offers blazing-fast read and write speeds. With a capacity of 1TB, it provides ample storage space for your files, applications, and games. It utilizes Samsung's V-NAND technology for enhanced reliability and endurance, making it perfect for both personal and professional use.`,
    price: 129,
  },
  {
    id: 3,
    name: 'Razer BlackWidow Elite Mechanical Gaming Keyboard',
    description: `The Razer BlackWidow Elite is a mechanical gaming keyboard designed for hardcore gamers. It features Razer's proprietary Green switches, providing a tactile and clicky typing experience. The keyboard is equipped with customizable RGB lighting, dedicated macro keys, and a comfortable wrist rest for long gaming sessions.`,
    price: 169,
  },
]

app.get('/api/products', (req, res) => {
  res.json(data)
})

app.post('/api/products', (req, res) => {
  const newId = Math.max(...data.map((item) => item.id)) + 1
  const newProduct = { id: newId, ...req.body }
  data.push(newProduct)
  res.status(201).json(newProduct)
})

app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const updatedProduct = req.body
  data = data.map((item) => {
    item.id === id ? { ...item, ...updatedProduct } : item
  })
  res.json(updatedProduct)
})

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id)
  data = data.filter((item) => item.id !== id)
  res.sendStatus(204)
})

const port = 3001
app.listen(port, () => {
  console.log(`Server is listening to port:${port}`)
})

//
