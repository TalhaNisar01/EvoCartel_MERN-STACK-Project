import summaryApi from '../common/index';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    const response = await fetch(summaryApi.addToCartProduct.url, {
      method: summaryApi.addToCartProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id }),
    });

    const responseData = await response.json();

    if (response.ok) {
      if (responseData.success) {
        toast.success(responseData.message, {
          style: {
            background: 'linear-gradient(to right, #4a90e2, #9013fe)',
            color: 'white',
          },
          position: 'top-center',
          autoClose: 2000,
          closeOnClick: true,
        });
      } else {
        toast.error(responseData.message, {
          style: {
            background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
            color: 'white',
          },
          position: 'top-center',
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    } else {
      toast.error('An unexpected error occurred. Please try again.', {
        style: {
          background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
          color: 'white',
        },
        position: 'top-center',
        autoClose: 3000,
        closeOnClick: true,
      });
    }

    return responseData;
  } catch (error) {
    toast.error('Network error. Please check your connection and try again.', {
      style: {
        background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
        color: 'white',
      },
      position: 'top-center',
      autoClose: 3000,
      closeOnClick: true,
    });
  }
  <ToastContainer/>
};

export default addToCart;
