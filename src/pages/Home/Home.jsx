import { useEffect,useState } from "react";
import Slider from "./Components/Slider";
import Categories from "./Components/categories/Categories";

const Home = () => {
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3000/api/categories')
        .then(response => response.json())
        .then(res => setData(res))
    },[])
    return ( 
        <>
        
        <Slider />
        <Categories props={data} />
        </>
     );
}
 
export default Home;