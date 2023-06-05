const express = require("express");
const router = express.Router();
const path = require("path");

// Rota para a página inicial
router.get("/inicio", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "inicio.html"));
});

// Rota para a página de cadastro
router.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cadastro.html"));
});

router.get("/blog", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "blog.html"));
  });

  router.get("/public/img.jpg.jpg", (req, res)=> {
    return res.sendFile(__dirname + "/public/img.jpg.jpg")
})

router.get("/public/mesa.jpeg", (req, res)=> {
  return res.sendFile(__dirname + "/public/mesa.jpeg")
})

router.get("/public/cadeiras.jpeg", (req, res)=> {
  return res.sendFile(__dirname + "/public/cadeiras.jpeg")
})

router.get("/public/th.jpeg", (req, res)=> {
  return res.sendFile(__dirname + "/public/th.jpeg")
})

router.get("/public/images.jpeg", (req, res)=> {
  return res.sendFile(__dirname + "/public/images.jpeg")
})






module.exports = router;
