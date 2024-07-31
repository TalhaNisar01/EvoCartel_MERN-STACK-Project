const backendDomain = "http://localhost:8000";

const summaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "POST",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "GET",
  },

  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: 'GET'
  },

  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: 'GET'
  },

  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: 'POST'
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: 'POST'

  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: 'GET'
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: 'POST'

  },
  categoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: 'GET'
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: 'POST'
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: 'POST'
  },
  addToCartProduct: {
    url: `${backendDomain}/api/addtocart`,
    method: 'POST'
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: 'GET'
  },
  addToCartProductView: {
    url: `${backendDomain}/api/view-cart-product`,
    method: 'GET'
  },
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: 'POST'
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: 'POST'
  },

  deleteProduct: {
    url: `${backendDomain}/api/delete-product`,
    method: 'POST'
  },
  // New endpoints for forgot password and reset password
  forgotPassword: {
    url: `${backendDomain}/api/forgot-password`,
    method: "POST",
  },
  resetPassword: {
    url: `${backendDomain}/api/reset-password`,
    method: "POST",
  },

  userProfile: (userId) => ({
    url: `${backendDomain}/api/user/${userId}`,
    method: "GET",
  }),
  updateUserDetails: (userId) => ({
    url: `${backendDomain}/api/update-userdetails/${userId}`,
    method: 'PUT'
  }),
  deleteUser: (userId) => ({
    url: `${backendDomain}/api/delete-user/${userId}`,
    method: 'DELETE'
  }),

  addToWishlist: {
    url: `${backendDomain}/api/add-to-wishlist`,
    method: 'POST'
  },
  countWishlistProducts: {
    url: `${backendDomain}/api/count-wishlist-products`,
    method: 'GET'
  },
  getWishlistProducts: {
    url: `${backendDomain}/api/wishlist-products`,
    method: 'GET'
  },
  removeWishlistProduct: {
    url: `${backendDomain}/api/remove-from-wishlist`,
    method: 'DELETE'
  },
  // New endpoints for order management
  createOrder: {
    url: `${backendDomain}/api/create-order`,
    method: 'POST'
  },
  getUserOrders: {
    url: `${backendDomain}/api/my-orders`,
    method: 'GET'
  },
  updateOrderStatus:{
   url: `${backendDomain}/api/update-order-status`,
    method: 'POST'
  }


};

export default summaryApi
