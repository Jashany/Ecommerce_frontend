import styles from './Navbar.module.css';
import logo from '../../assets/Link.png'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../Slices/authslice';
import { useDispatch } from 'react-redux';
import cart from  '../../assets/cart.svg'
import { useEffect ,useState } from 'react';
import SearchBar from '../Searchbar';

const Navbar = () => {
    const {userInfo} = useSelector(state => state.auth)
    const [data,setData] = useState([])
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }

    useEffect(() => {
            fetch(`http://localhost:3000/api/products`)
            .then(response => response.json())
            .then(res => {
                console.log(res);
                setData(res);
            })
    }, [])
    return ( 
        <>
        <div className={styles.top}>
            <div className={styles.navv}>
            <div>
            <Link to='/'>
            <img src={logo} alt="" />
            </Link>
            </div>
            <div>
            {userInfo ? <div style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                gap:'30px'
            }}><Link to='/profile'>
                <div style={{
                    width:'40px',
                    height:'40px',
                    borderRadius:'50%',
                    backgroundColor:'#1ABA1A',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',    
                    color:'white'
                }}>{
                    userInfo.name[0].toUpperCase()
                }</div>
                </Link>
                
                <button style={{backgroundColor:"#1ABA1A",padding:'10px 20px',borderRadius:"20px",color:"white"}} onClick={handleLogout}>Logout</button>
                <Link to='/cart'>
                <img style={{
                    width:"100%",
                    height:'30px',
                    marginTop:"5px",
                    mixBlendMode:'multiply'
                }} src={cart} alt="" />
                </Link>
                </div> : 
                <Link to='/signup'>
                <button>
                    Login / Register
                </button>
                </Link>
    }           
            </div>
            </div>
            <div className={styles.lowernav}>
                <div>
                <SearchBar placeholder={"Search here"} data={data} />
                </div>
                <p>
                FREE SHIPPING ON ORDERS OVER $100
                </p>
                <p>
                30 DAYS MONEY BACK
                </p>
                <p>
                24/7 SUPPORT
                </p>
            </div>
        </div>
        </>
     );
}
 
export default Navbar;