var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var multer = require("multer");
var path = require("path");
var postModel = require("../models/postModel");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const secret = "secret";

router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCon = await userModel.findOne({ email: email });
  if (emailCon) {
    return res.json({ success: false, message: "Email already exists" });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) throw err;
        let user = await userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash
        });

        return res.json({
          success: true,
          message: "User created successfully",
        })
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }
  else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        var token = jwt.sign({ email: user.email, userId: user._id }, secret);
        return res.json({
          success: true,
          message: "User logged in successfully",
          token: token,
          userId: user._id
        })
      }
      else {
        return res.json({
          success: false,
          message: "Invalid password"
        })
      }
    })
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let extName = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extName)
  }
})

const upload = multer({ storage: storage })

router.post("/createPost", upload.single('image'), async (req, res) => {
  let { title, desc, userId } = req.body;
  let user = await userModel.findById(userId);
  if (user) {

    let post = await postModel.create({
      title: title,
      desc: desc,
      img: req.file.filename,
      uploadedBy: userId
    });
    res.json({
      success: true,
      msg: "Post created successfully"
    }
    )
  }
  else {
    return res.json({
      success: false,
      msg: "User not found"
    })
  }
});

router.get("/getPosts", async (req, res) => {
  let posts = await postModel.find({});
  
  let fullData = await Promise.all(posts.map(async (post) => {
    let user = await userModel.findById(post.uploadedBy).lean();
    return {
      postData: post,
      userData: user
    };
  }));

  return res.json({
    success: true,
    posts: fullData
  })
})

router.post("/getPostData", async (req,res)=>{
  let {postId,userId} = req.body;
  let post = await postModel.findById(postId);
  let fullData = [];
  if(post){
    let user = await userModel.findById(post.uploadedBy).lean();
    let isYouLiked = post.likes.some((like)=>like.userId.toString() === userId.toString());  
    fullData.push({
      postData: post,
      userData: user,
      isYouLiked: isYouLiked
    })
    return res.json({
      success: true,
      postData: fullData,
      api: "Get Single Post"
    })
  }
  else{
    return res.json({
      success: false,
      msg: "Post not found"
    })
  }
})

router.post("/toggelLike", async (req,res)=>{
  let {postId,userId} = req.body;
  let user = await userModel.findById(userId);
  let post = await postModel.findById(postId);
  if(user && post){
    if(post.likes.some((like)=>like.userId.toString() === userId.toString())){
      post.likes.pull({userId: userId});
      
      await post.save();
      return res.json({
        success: true,
        msg: "Like successfully",
        isLiked: true
      })
    }
    else{
      post.likes.push({userId: userId});
      await post.save();
      return res.json({
        success: true,
        msg: "Un like successfully",
        isLiked: false
      })
    }
  }
  else{
    return res.json({
      success: false,
      msg: "User or Post not found"
    })
  }
})

module.exports = router;
