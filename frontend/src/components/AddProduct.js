import React from 'react'

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState('');

    const addProduct = async () => {
        // console.warn(name, price, category, company)
        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type='text' className='inputBox' placeholder='Enter Product Name: ' value={name} onChange={(e) => { setName(e.target.value) }} />

            {error && !name && <span className='invalid-input'>Enter valid Name</span>}

            <input type='text' className='inputBox' placeholder='Enter Product Price: ' value={price} onChange={(e) => { setPrice(e.target.value) }} />

            {error && !price && <span className='invalid-input'>Enter Product Price</span>}

            <input type='text' className='inputBox' placeholder='Enter Product Category: ' value={category} onChange={(e) => { setCategory(e.target.value) }} />

            {error && !category && <span className='invalid-input'>Enter Product Category</span>}

            <input type='text' className='inputBox' placeholder='Enter Product Company: ' value={company} onChange={(e) => { setCompany(e.target.value) }} />

            {error && !company && <span className='invalid-input'>Enter Product Company</span>}

            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;