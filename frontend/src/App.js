
import './index.css'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect } from 'react';
import summaryApi from './common/index'
import Context from './context/index';
import {useDispatch} from 'react-redux'
import { setUserDetails } from './store/userSlice';


function App() {

  const dispatch =useDispatch()
  const fetchUserDetails=async()=>{
    const dataResponse=await fetch(summaryApi.current_user.url,{
       method:summaryApi.current_user.method,
       credentials:"include"
    })
    
    const dataApi=await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    // console.log("User Details:",dataResponse)
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  return (
    <>
    <Context.Provider value={{
        fetchUserDetails  //fetching user details
    }}>
    <Header />
    <main className='min-h-[calc(100vh-110px)]'>
      <Outlet />
    </main>
    <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
