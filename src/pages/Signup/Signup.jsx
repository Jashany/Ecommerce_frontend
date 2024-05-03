import styles from './Signup.module.css';
import loginImg from '../../assets/login.svg'
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useSignupMutation } from '../../Slices/usersApiSlice';
import { setCredentials } from '../../Slices/authslice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Signup = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    })
    const [signup] = useSignupMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector(state => state.auth)

    useEffect(() => {
    if(userInfo){
        navigate('/')
    }
    }, [userInfo])

    const handlesubmit = async () => {
        try {
            const response = await signup(data).unwrap()
            console.log(response)
            if(response.email){
                console.log('hi')
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
                    <h1>Register</h1>
                    <p>
                        JOIN US
                    </p>
                    <label>
                    Your Name
                    <input type="text" 
                    value={data.name}
                    onChange={(e)=>setData({...data,name:e.target.value})}
                    placeholder='John Doe' />
                    </label>
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
                    <label
                    >
                    Phone Number
                    <input type="text" 
                    value={data.phoneNumber}
                    onChange={(e)=>setData({...data,phoneNumber:e.target.value})}
                    placeholder='1234567890' />
                    </label>
                    <button onClick={
                        handlesubmit
                    }>
                        Register
                    </button>
                    <p>
                        Already a User? <a href='/signin'>Login</a>
                    </p>
                </div>
            </div>
     );
}
 
export default Signup;