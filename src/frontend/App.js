import { useState, useEffect } from 'react'
import axios from 'axios'

import CreateForm from './CreateForm'
import ReadForm from './ReadForm'
import UpdateForm from './UpdateForm'
import '../index.css'

function App() {
  const [data, setData] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('http://localhost:3001/api/products')
      const data = await response.data
      setData(data)

      setIsLoading(false)
    } catch (error) {
      console.error(`Error fetching data:${error}`)
      setIsLoading(false)
    }
  }

  const handleCreate = async (product) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/products',
        product
      )
      setData([...data, response.data])
    } catch (error) {
      console.error(`Error creating product:${error}`)
    }
  }

  const handleUpdate = async (product) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/products/${product.id}`,
        product
      )
      const updatedData = data.map((item) =>
        item.id === product.id ? response.data : item
      )
      setData(updatedData)
      setSelectedProduct(null)
    } catch (error) {
      console.error(`Error updating product:${error}`)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`)
      const filteredProducts = data.filter((item) => item.id !== id)
      setData(filteredProducts)
    } catch (error) {
      console.error(`Error deleting product:${error}`)
    }
  }

  const handleEdit = (product) => {
    setSelectedProduct(product)
  }

  return (
    <div>
      <h1>Create Product</h1>
      <CreateForm onSubmit={handleCreate} />

      <h1>Product List</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ReadForm data={data} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {selectedProduct && (
        <div>
          <h1>Update Product</h1>
          <UpdateForm product={selectedProduct} onSubmit={handleUpdate} />
        </div>
      )}
    </div>
  )
}

export default App
