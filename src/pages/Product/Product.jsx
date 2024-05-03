import styles from "./Product.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Slices/cartSlice";

const Product = () => {
  const [data, setData] = useState([]);
  const [quanity, setQuanity] = useState(1);
  const [button, setButton] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        console.log(res);
      });
  }, []);

  const { userInfo } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  
useEffect(() => {
    console.log("Cart items:", cartItems);
    if (cartItems && cartItems.length > 0) {
        console.log("Checking for item in cart...");
        const check = cartItems.find((item) => item.id === data.Id);
        if (check) {
            console.log("Item found in cart:", check);
            setButton(false);
        } else {
            console.log("Item with id", data.Id, "not found in cart.");
        }
    } else {
        console.log("Cart is empty.");
    }
}, [cartItems, data]); 
  console.log(userInfo.id);

  const dispatch = useDispatch();
  const addcart = () => {
    fetch(`http://localhost:3000/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userInfo.id,
        productId: data.Id,
        quantity: quanity,
      }),
    });
    console.log("hi");
    dispatch(
      addToCart({
        id: data.Id,
        quantity: quanity,
        amount: data.Price * quanity,
      })
    );
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.product}>
          <img src={data.imageUrl} alt={data.productName} />
          <div className={styles.productinner}>
            <h4>{data.Product_name}</h4>
            <h3>₹{data.Price}</h3>
            <h6>{data.Description}</h6>
          </div>
          <div className={styles.price} style={{paddingTop:"30px"}}>
            <p>TOTAL PRICE:</p>
            <h3>₹{data.Price * quanity}</h3>
            {button ? (
              <div style={{
                display: "flex",
                width:"100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
            }}>
                <div className={styles.quatity}>
                  <button
                    onClick={() => {
                      if (quanity > 1) setQuanity(quanity - 1);
                    }}
                  >
                    -
                  </button>
                  <span>{quanity}</span>
                  <button
                    onClick={() => {
                      setQuanity(quanity + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <button onClick={addcart}>Add to Cart</button>
              </div>
            ) : (
            <div
                style={{
                    display: "flex",
                    width:"100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
            <p style={{
                color: "green",
                fontSize: "20px",
                fontWeight: "bold",
            }}>
                Already in Cart
            </p>
            <Link to='/cart' style={{display: "flex",
                    width:"100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "20px",}}>
              <button>Go to Cart</button>
            </Link>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
