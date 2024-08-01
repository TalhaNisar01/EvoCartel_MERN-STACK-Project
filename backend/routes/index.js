const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { userSignUp } = require('../controller/userSignUp');
const { userSignIn } = require('../controller/userSignIn');
const { userDetails } = require("../controller/userDetails");
const { authToken } = require("../middleware/authToken");
const { userLogout } = require("../controller/userLogout");
const allUsers = require('../controller/allUsers');
const { updateUser } = require("../controller/updateUser");
const UploadProductController = require('../controller/uploadProduct');
const getProductController = require('../controller/getProduct');
const updateProductController = require('../controller/updateProduct');
const getCategoryProduct = require('../controller/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/getCategoryWiseProduct');
const getProductDetails = require('../controller/getProductDetails');
const addToCartController = require('../controller/addToCartController');
const countAddToCartProduct = require('../controller/countAddToCartProduct');
const addToCartViewProduct = require('../controller/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/updateAddToCart');
const deleteAddToCartProduct = require('../controller/deleteAddToCartProduct');
const deleteProduct = require("../controller/deleteProductAdmin");
const forgotPassword = require('../controller/forgotPassword');
const resetPassword = require('../controller/resetPassword');
const userProfile = require('../controller/userProfile');
const { updateUserDetails } = require("../controller/updateUserDetails");
const { deleteUser } = require("../controller/deleteUserDetails"); // Import deleteUser
const addToWishlistController = require('../controller/addToWishlistController'); 
const countWishlistProductsController = require('../controller/countWishlistProductsController'); 
const getWishlistProductsController = require('../controller/getWishlistProductsController');
const removeFromWishlistController = require('../controller/removeWishListProductController');


const {
    createOrderController,
    getOrderController
} = require('../controller/createOrderController');


const updateOrderStatusController  = require('../controller/updateOrderStatusController');





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//Routes--------------------------------------
router.post("/signup", upload.single('profilePic'), userSignUp);
router.post("/signin", userSignIn);
router.get("/user-details", authToken, userDetails);
router.get("/userLogout", userLogout);
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);
router.post("/delete-product/:id", authToken, deleteProduct); // Route for deleting a product

// Forgot Password and Reset Password routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// User Profile
router.get("/user/:id", authToken, userProfile);

// Update and Delete User
router.put("/update-userdetails/:id", upload.single('profilePic'), updateUserDetails); // Update route to use PUT method and :id param
router.delete("/delete-user/:id", authToken, deleteUser); // Corrected deleteUser route to use DELETE method and :id param

///wishlist products 
router.post("/add-to-wishlist", authToken, addToWishlistController); 
router.get("/count-wishlist-products", authToken, countWishlistProductsController); // Add this line

router.get("/wishlist-products", authToken, getWishlistProductsController);


router.delete("/remove-from-wishlist", authToken, removeFromWishlistController);

router.post('/create-order', authToken, createOrderController);
router.get('/my-orders', authToken, getOrderController);


router.post('/update-order-status', authToken,updateOrderStatusController);






module.exports = router;
