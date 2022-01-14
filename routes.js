const moment = require('moment');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');
const path = require('path');

    // 1. Module Router
router.get('/', (req,res) => {
    // Menangkap Query String
    const {page, total} = req.query;
    res.send({
        status: `Succesfully added at ${moment().format('LTS')}`,
        message: 'Welcome to Express JS Tutorial',
        page,
        total
    });
});

    // 2. Dynamic Router
router.get('/product/:id', (req,res) => {
    res.json({
        id: req.params.id
    });
});

    // 2.1 Using Destructuring assignment
// router.get('/:category/:tag', (req,res) => {
//     const {category, tag} = req.params;
//     res.json({
//         // category: category,
//         // tag: tag
//         category, tag
//     });
// });

    // 3. Request Body dengan Middleware
// router.post('/product/', (req,res) => {
//     res.json(req.body);
// });

    // 4. Menangani File
router.post('/product/', upload.single('image'), (req,res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, 'uploads', image.originalname);
        fs.renameSync(image.path, target)

    // A. File Upload
        // res.json({
        //     name,
        //     price,
        //     stock,
        //     status,
        //     image
        // });

    // B. File Download
        res.sendFile(target);

    }
});

module.exports = router;