import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setCredentials } from '../../Slices/authslice';
const Profile = () => {
    const [activeTab, setActiveTab] = useState('AccountInfo');
    const { userInfo } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/api/orders`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userId:userInfo.id})
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                setOrders(res)
            })
    }, [])
    return ( 
        <div className={styles.profile}>
            <div className={styles.side}>
                <h3>
                    Mark Cole
                </h3>
                <p>
                    example@gmail.com
                </p>
                <button 
                className={activeTab === 'AccountInfo' ? styles.activeButton : ''} 
                onClick={()=>{
                    setActiveTab('AccountInfo');
                }} >
                    Account Info
                </button>
                <button 
                className={activeTab === 'MyOrder' ? styles.activeButton : ''} 
                onClick={()=>{
                    setActiveTab('MyOrder');
                }}>
                    My Order
                </button>
                <button
                className={activeTab === 'ChangePassword' ? styles.activeButton : ''} 
                 onClick={()=>{
                    setActiveTab('ChangePassword');
                }}>
                    Change Password
                </button>
            </div>
            <div className={styles.main}>
                {activeTab === 'AccountInfo' && <AccountInfo />}
                {activeTab === 'MyOrder' && <MyOrder orders={orders} />}
                {activeTab === 'ChangePassword' && <ChangePassword />}
            </div>
        </div>
     );
}

const AccountInfo = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [data, setData] = useState({
        name: userInfo.name,
        email: userInfo.email,
        phoneNumber: userInfo.Phone,

    })

    const handlesubmit = () =>{
        console.log("hii")
        fetch(`http://localhost:3000/api/users/update`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                dispatch(setCredentials(res))
            })
    }
   
    return ( 
        <div className={styles.account}>
            <h3>
                Account Info
            </h3>
            <label>
                Name
                <input type="text" placeholder={userInfo.name}
                onChange={(e)=>{
                    setData({...data,name:e.target.value})
                }}  />
            </label>
            <label>
                Email
                <input type="email"  placeholder={userInfo.email} 
                onChange={(e)=>{
                    setData({...data,email:e.target.value})
                }}/>
            </label>
            <label>
                Phone Number
                <input type="text"  placeholder={userInfo.Phone} 
                onChange={(e)=>{
                    setData({...data,phoneNumber:e.target.value})
                }} />
            </label>
           
            <button onClick={handlesubmit}>
                Save
            </button>
        </div>
    );
}

const MyOrder = ({orders}) => {
  
    const groupedOrders = orders.reduce((acc, order) => {
        const orderId = order.Id;
        if (!acc[orderId]) {
          acc[orderId] = {
            orders: [],
            totalOrderPrice: 0,
          };
        }
        acc[orderId].orders.push(order);
        acc[orderId].totalOrderPrice += order.Price * order.Quantity;
        return acc;
      }, {});

      return (
        <div>
          {Object.keys(groupedOrders).map(orderId => (
            <div key={orderId}>
              <h2>Order ID: {orderId}</h2>
              <ul>
                {groupedOrders[orderId].orders.map(item => (
                  <li key={item.Id}>
                    <p>Product Name: {item.Product_name}</p>
                    <p>Price: {item.Price}</p>
                    <p>Quantity: {item.Quantity}</p>
                  </li>
                ))}
              </ul>
              <p>Total Order Price: {groupedOrders[orderId].totalOrderPrice}</p>
            </div>
          ))}
        </div>
      );
    };

    


const ChangePassword = () => {
    return ( 
        <div className={styles.account}>
            <h3>
                Change Password
            </h3>
            <label>
                Old Password
                <input type="password"  />
            </label>
            <label>
                New Password
                <input type="password"   />
            </label>
            
            <button>
                Change Password
            </button>
        </div>
    );
}

 
export default Profile;