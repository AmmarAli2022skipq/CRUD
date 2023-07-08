import { useState, useEffect } from 'react'
import '../index.css'

const UpdateForm = ({ product, onSubmit }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    setName(product.name)
    setDescription(product.description)
    setPrice(product.price.toString())
  }, [product])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...product, name, description, price: parseFloat(price) })
  }

  // let styles = {
  //   height: '120px',
  //   width: '327px',
  //   padding: '0.5rem',
  //   border: '1px solid #ccc',
  //   borderRadius: '4px',
  //   resize: 'vertical',
  // }

  return (
    <form className="global-form" onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
export default UpdateForm
