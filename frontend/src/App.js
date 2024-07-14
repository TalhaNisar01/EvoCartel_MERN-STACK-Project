
import './index.css'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect } from 'react';
import summaryApi from './common/index'
import Context from './context/index';

function App() {


  const fetchUserDetails=async()=>{
    const dataResponse=await fetch(summaryApi.current_user.url,{
       method:summaryApi.current_user.method,
       credentials:"include"
    })
    
    const dataApi=await dataResponse.json()
    console.log("User Details:",dataResponse)
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  return (
    <>
    <Header />
    <main className='min-h-[calc(100vh-110px)]'>
      <Outlet />
    </main>
    <Footer />
    </>
  );
}

export default App;
