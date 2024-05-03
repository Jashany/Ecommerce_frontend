import styles from './Login.module.css';
import loginImg from '../../assets/login.svg'
import { useSelector,useDispatch } from 'react-redux';
import { useLoginMutation } from '../../Slices/usersApiSlice';
import { useEffect, useState } from 'react';
import { setCredentials } from '../../Slices/authslice';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector(state => state.auth)
    
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is Required'),
        password: Yup.string().required('Enter Password').min(8),

    });

    useEffect(() => {
    if(userInfo){
        navigate('/')
    }
    }, [userInfo])

    const handlesubmit = async () => {
        await validationSchema.validate(data, { abortEarly: false });
        try {
            const response = await login(data).unwrap()
            if(response.email){
                dispatch(setCredentials({...response}))
                navigate('/')
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
                        LOGIN TO CONTINUE
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
                    <p>
                        Don't have an account? <a href='/signup'>Register</a>
                    </p>
                </div>
            </div>
     );
}
 
export default Login;