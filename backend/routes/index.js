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




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post("/signup", upload.single('profilePic'), userSignUp); 
router.post("/signin", userSignIn);
router.get("/user-details", authToken, userDetails);
router.get("/userLogout", userLogout);
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);

router.get("/get-categoryProduct",getCategoryProduct);
router.post("/category-product",getCategoryWiseProduct)



router.post("/product-details",getProductDetails)
//

router.post("/addtocart",authToken,addToCartController)


router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)



module.exports = router;
