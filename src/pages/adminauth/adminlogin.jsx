import styles from './adminlogin.module.css';
import loginImg from '../../assets/login.svg'
import { useSelector,useDispatch } from 'react-redux';
import { useLoginMutation } from '../../Slices/usersApiSlice';
import { useEffect, useState } from 'react';
import { setCredentials } from '../../Slices/authslice';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector(state => state.auth)


    const handlesubmit = async () => {
        try {
            const response = await login(data).unwrap()
            if(response.email){
                dispatch(setCredentials({...response}))
                navigate('/admin')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return ( 
            <div className={styles.login}>
                <img src={loginImg} alt="" />
                <div className={styles.loginbox}>
                    <h1>Welcome Back</h1>
                    <p>
                       Admin Login
                    </p>
                    <label>
                    Email Address
                    <input type="text" 
                    value={data.email}
                    onChange={(e)=>setData({...data,email:e.target.value})}
                    placeholder='Example@gmail.com' />
                    </label>
                    <label>
                    Password
                    <input type="password"
                    value={data.password}
                    onChange={(e)=>setData({...data,password:e.target.value})}
                    placeholder='**********' />
                    </label>
                    <button onClick={handlesubmit}>
                        Login
                    </button>
                    
                </div>
            </div>
     );
}
 
export default AdminLogin;