import { useDispatch } from "react-redux";
import { clearCart } from "../../Slices/cartSlice";
import { Link } from "react-router-dom";
const Cancel = () => {
    return ( 
        <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
            backgroundColor: 'white',
        }}
        >
            <h1>Payment unsuccessful</h1>
            <Link to='/'>
            <button style={{
                padding: '10px 20px',
                backgroundColor: '#1ABA1A',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '20px',
                cursor: 'pointer',
            
            }}
            >Go to Home</button>
            </Link>
        </div>
     );
}
 
export default Cancel;