import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            method: 'get',
            headers: {
                'Content-Type': 'application/JSON'
            }
        });
        result = await result.json();
        console.log(result);
        // console.log("products", products);
        setProducts(result);
    }

    const searchHandle = async (event) => {
        // console.log(event.target.value);
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
        else {
            getProducts();
        }
    }

    const deleteProduct = async (id) => {
        // console.log(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });

        result = await result.json()
        if (result) {
            // alert("Record is deleted")
            getProducts()
        }
    };


    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" className="search-product-box" onChange={searchHandle} placeholder="Search Product" />
            <ul>
                <li>Sr. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <button Link to={"/update/" + item._id}>Update</button>
                        </li>
                    </ul>
                )
                    : <h1>No Result Found</h1>
            }
        </div>
    )
}
export default ProductList