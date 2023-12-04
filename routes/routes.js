const express = require('express');
const Login = require('../controllers/login.js');
const Home = require('../controllers/home.js');
const Admin = require('../controllers/admin.js');
const LandingPage = require('../controllers/landingpage.js');
const router = express.Router();

router.get('/', Home.home);
router.get('/kecamatan', Home.kecamatan);
router.get('/kecamatan/:id/', Home.kecamatandetail);
router.get('/kecamatan/:id/:idds', Home.desadetail);
router.get('/kecamatan/:id/:idds/:idtps', Home.tps);
//localhost:8000/irgi/78987
router.get('/home', LandingPage.home);

router.get('/admin', Admin.kabupaten);


router.post('/login', Login.login);
router.post('/register', Login.register);

module.exports = router;