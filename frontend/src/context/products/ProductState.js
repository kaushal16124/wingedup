import { useState } from "react"
import ProductContext from "./productContext"

const ProductState = (props) => {
    const host = process.env.REACT_APP_BACKEND_HOST_URI;
    const initialProduct = []
    const [products, setProducts] = useState(initialProduct)

    //Fetching all Products
    const getProducts = async () => {
        const response = await fetch(`${host}/api/products/getallproducts`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const res = await response.json()
        //console.log(res)
        setProducts(res.products)
    }

    //Adding a product
    const addProduct = async (product_id, title, amount, description, content, images, category) => {
        let added = false;
        const response = await fetch(`${host}/api/products/createproduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // Authorization: localStorage.getItem('token')
            },
            body: JSON.stringify({ product_id, title, amount, description, content, images, category })
        });
        const res = await response.json()
        if (res.success) {
            added = true;
            getProducts();


        }
        return added;

    }

    //Edit product
    const updateProduct = async (id, title, amount, description, content, images, category) => {
        let updated = false;
        const response = await fetch(`${host}/api/products/updateproduct/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
                // Authorization: localStorage.getItem('token')
            },
            body: JSON.stringify({ title, amount, description, content, images, category }),
        });
        const res = await response.json()
        if (res.success) {
            updated = true;
            let newProduct = JSON.parse(JSON.stringify(products))
            for (let index = 0; index < newProduct.length; index++) {
                const element = newProduct[index];
                if (element._id == id) {
                    newProduct[index].title = title;
                    newProduct[index].amount = amount;
                    newProduct[index].description = description;
                    newProduct[index].content = content;
                    newProduct[index].images = images;
                    newProduct[index].category = category;
                    break;
                }
            }
            setProducts(newProduct);


        }
        return updated;



    }

    //Delete Product
    const deleteProduct = async (id) => {
        let added = false;
        const response = await fetch(`${host}/api/products/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                // Authorization: localStorage.getItem('token')
            }
        });
        const res = await response.json()
        if (res.success) {
            added = true;
            const newProducts = products.filter((item) => { return item._id != id })

            setProducts(newProducts);

        }
        return added;

    }

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, setProducts, getProducts }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;