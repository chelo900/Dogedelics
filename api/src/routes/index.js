const { Router } = require("express");
const router = Router();
const getDogs = require("./getDogs");
const temperaments = require("./temperaments");
const dogPost = require("./postDog");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers

router.use("/dogs", getDogs);
router.use("/dog", dogPost);
router.use("/temperament", temperaments);

module.exports = router;
