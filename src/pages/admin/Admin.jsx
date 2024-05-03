import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage } from '../../config.js'
import { useState } from "react";
import styles from './admin.module.css';

const Admin = () => {
  
  const [activeTab, setActiveTab] = useState('addproduct');

  return ( 
      <div className={styles.profile}>
          <div className={styles.side}>
              <h3>
                Admin Page
              </h3>
              <button 
              className={activeTab === 'addproduct' ? styles.activeButton : ''} 
              onClick={()=>{
                  setActiveTab('addproduct');
              }} >
                  Add product
              </button>
              <button 
              className={activeTab === 'addCategory' ? styles.activeButton : ''} 
              onClick={()=>{
                  setActiveTab('addCategory');
              }}>
                  Add Category
              </button>
          </div>
          <div className={styles.main}>
              {activeTab === 'addproduct' && <AccountInfo />}
              {activeTab === 'addCategory' && <MyOrder />}
          </div>
      </div>
   );
}

const AccountInfo = () => {
  const [imageUpload, setImageUpload] = useState();
  const [data , setData] = useState({
    productName: '',
    category: '',
    description: '',
    price: '',
    stockQuanity: '',
    status: '',
    image: '',
  });

  const uploadFile =  () => {
    return new Promise((resolve, reject) => {
      if (!imageUpload) reject('No image to upload');
  
      const imageRef =  ref(storage, `ecommerce/${imageUpload.name}`);
  
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          resolve(url);
        });
      });
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    try {
      uploadFile().then((url) => {
        console.log(url);
        fetch('http://localhost:3000/api/products/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productName: data.productName,
            category: data.category,
            description: data.description,
            price: data.price,
            stockQuanity: data.stockQuanity,
            status: data.status,
            image: url,
          }),
        }).then((res) => {
          console.log(res);
        });
      });
    } catch (error) {
      console.log(error)
    }
  }


  return ( 
      <div className={styles.account}>
          <h3>
              Add product
          </h3>
          <div style={{display:"flex",width:"100%",gap:"20px"}}>

          <label>
              Product Name
              <input type="text" onChange={(e) => {
                setData({...data, productName: e.target.value});
              }}   />
          </label>
          <label>
              Category
              <input type="text" onChange={(e) => {
                setData({...data, category: e.target.value});
              }}   />
          </label>
          </div>
          <label>
              Description
              <input type="text" onChange={(e) => {
                setData({...data, description: e.target.value});
              }}  />
          </label>
          <div style={{display:"flex",width:"100%",gap:"20px"}}>
          <label>

              Price
              <input type="number" onChange={(e) => {
                setData({...data, price: e.target.value});
              }}   />
            </label>
            <label>
              Stock quanity
              <input type="number"
              onChange={(e) => {
                setData({...data, stockQuanity: e.target.value});
              }} 
                />
            </label>
          </div>
          <div style={{display:"flex",width:"100%",gap:"20px"}}>
            
            <label>
              Status
              <input type="text" 
              onChange={(e) => {
                setData({...data, status: e.target.value});
              }}
                />
            </label>
            <label>
              Image
              <input type="file"  onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}  />
            </label>
          </div>
          <button onClick={handlesubmit}>
              Add Product
          </button>
      </div>
  );
}

const MyOrder = () => {
  const [imageUpload, setImageUpload] = useState();
  const [category, setCategory] = useState('');

  const uploadFile =  () => {
    return new Promise((resolve, reject) => {
      if (!imageUpload) reject('No image to upload');
  
      const imageRef =  ref(storage, `ecommerce/${imageUpload.name}`);
  
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          resolve(url);
        });
      });
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    try {
      uploadFile().then((url) => {
        console.log(url);
        fetch('http://localhost:3000/api/categories/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categoryName: category,
            image: url,
          }),
        }).then((res) => {
          console.log(res);
        });
      });
    } catch (error) {
      console.log(error)
    }
  }
  
  return ( 
    <div className={styles.account}>
    <h3>
        Add Category
    </h3>

    <label>
        Category Name
        <input type="text" value={category} name="category" onChange={(e)=>{
          setCategory(e.target.value);
        }}  />
    </label>
      <label>
        Image
        <input type="file" onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }} 
        />
      </label>
    <button onClick={handlesubmit}>
        Add Category
    </button>
</div>
  );
}

export default Admin;