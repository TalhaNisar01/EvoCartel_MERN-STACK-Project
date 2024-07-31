import axios from 'axios';
import summaryApi from '../common/index';

const fetchWishlistProducts = async (userId) => {
  try {
    const response = await axios.get(`${summaryApi.backendDomain}/api/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist products", error);
    return [];
  }
};

export default fetchWishlistProducts;
