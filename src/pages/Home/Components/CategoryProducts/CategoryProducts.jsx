import React, { useEffect,useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './CategoryProducts.module.css'
const CategoryProduct = () => {
    const [data, setData] = useState([])
    const {id} = useParams()
    useEffect(()=>{
        fetch(`http://localhost:3000/api/categories/${id}/products`)
        .then(response => response.json())
        .then(res => setData(res))
    },[])
    return ( 
        <>
        <div className={styles.main}>
        <h1>Category Products</h1>
        <div>
            {data.map((product) => (
                <div key={product.Id} className={styles.product} >
                    <Link to={`/product/${product.Id}`}>
                    <div>
                    <img src={product.imageUrl} alt={product.productName} />
                    </div>
                    <h3>{product.Product_name}</h3>
                    <p>${product.Price}</p>
                    <h6>FREE delivery Tue, 7 May on first order
Or fastest delivery Sun, 5 May </h6>
            </Link>
                </div>
            ))}
        </div>
        </div>
        </>
     );
}
 
export default CategoryProduct;