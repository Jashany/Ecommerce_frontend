import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import styles from './Cart.module.css'
import { Link } from "react-router-dom";
const Cart = () => {
    const [data,setData] = useState([])
    
    const {userInfo} = useSelector(state => state.auth)
    useEffect(()=>{
        fetch(`http://localhost:3000/api/cart/${userInfo.id}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            setData(res)
        })
    },[])
    
    
   
    const removeItem = (cartItemId) => {
        fetch(`http://localhost:3000/api/cart/remove`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({cartItemId})
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            setData(data.filter(item => item.Id !== cartItemId));
            console.log("hi")
        })
    }


    const updateQuantity = (cartItemId, quantity) => {
        
            fetch(`http://localhost:3000/api/cart/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity,cartItemId }),
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    setData(data.map(item =>
                        item.Id === cartItemId ? { ...item, Quantity: quantity } : item
                    ));
                })
               
        };
       
       
    return ( 
    <>
    <div className={styles.cart}>

    <h1 style={{
        textAlign: 'center',
        padding: '20px 0',
        fontSize:"50px",
        color:"#1ABA1A",
        borderRadius: '10px',
    }}>Cart</h1>

    {data.length === 0 ? <h1 style={{textAlign: 'center',marginTop:"20vh",fontSize:"3rem"}}>Cart is empty</h1> : 
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
    }}>
        
    <div className={styles.cartitems}>
        {data.map((item) => (
            <div key={item.Id}>
                <div style={{
                        width: '150px',
                        
                }}>
                <img src={item.imageUrl} alt={item.productName} />
                </div>
            
                <h3>{item.Product_Name}</h3>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '10px 20px',
                }}
                >

                <p style={{
                    fontSize: '30px',
                    fontWeight:"bold",
                    color:"red"
                }}>₹{item.Price}</p>   
            <h4 style={{width:'100px'}}>Quantity: {item.Quantity}  </h4>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <button style={{
                    padding: '5px 10px',
                    backgroundColor: '#1ABA1A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={() => {updateQuantity(item.Id, item.Quantity - 1)
                
                
                }}
                id="cartItemId"
                
                >
                    -
                </button >
                <span style={{
                    padding: '0 10px',
                    fontSize: '20px',
                }}>{item.Quantity}</span>
                <button style={{
                    padding: '5px 10px',
                    backgroundColor: '#1ABA1A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    updateQuantity(item?.Id, item.Quantity + 1)
                   
                }}
                id="cartItemId"
                >
                    +
                </button>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                
            </div>
                </div>

            </div>
        ))}
    </div>
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor:"#f5f5f5",
        borderRadius:"10px",
        height:"fit-content",
        flex:0.15,
        padding: '30px 20px',

    }} >
        <h1>Total: ₹{data.reduce((acc, item) => acc + item.Price*item.Quantity, 0)}</h1>
        <Link to='/checkout'>
        <button style={{
            padding: '10px 20px',
            backgroundColor: '#1ABA1A',
            color: 'white',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px',
        }}
        >Checkout</button>
        </Link>
    </div>
        </div>
    }
    
    </div>
    </> 
    );
}
 
export default Cart;