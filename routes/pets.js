// MODELS
const Pet = require('../models/pet');

const Upload = require('s3-uploader');

// UPLOADING TO AWS S3
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


const client = require('../lib/uploader')
// PET ROUTES
module.exports = (app) => {

  // INDEX PET => index.js

  // SEARCH PET
  app.get('/search', (req, res) => {

    const term = new RegExp(req.query.term, 'i')

    const page = req.query.page || 1
    Pet.paginate(
      {
        $or: [
          { 'name': term },
          { 'species': term }
        ]
      },
      { page: page }).then((results) => {
        res.render('pets-index', { pets: results.docs, pagesCount: results.pages,
          currentPage: page, term: req.query.term });
      });
  });
  // NEW PET
  app.get('/pets/new', (req, res) => {
    res.render('pets-new');
  });


  // // CREATE PET
  // app.post('/pets', upload.single('avatar'), (req, res, next) => {
  //   var pet = new Pet(req.body);
  //   pet.save(function (err) {
  //     if (err) {
  //       return res.status(400).send({
  //         err: err
  //       })
  //     };
  //     if (req.file) {
  //       client.upload(req.file.path, {}, function (err, versions, meta) {
        
  //         versions.forEach(function (image) {
  //           var urlArray = image.url.split('-');
  //           urlArray.pop();
  //           var url = urlArray.join('-');
  //           pet.avatarUrl = url;
  //           pet.save();
  //         });

  //         res.send({ pet: pet });
  //       });
  //     } else {
  //       res.send({ pet: pet });
  //     }
  //   })
  // })


  // CREATE PET
    app.post('/pets', upload.single('avatar'), async(req, res, next) => {
        console.log(req.file)
        var pet = new Pet(req.body);
        pet.save(function (err) {
            if (err) {
                console.log(err)
                return res.status(400).send({ err })
            };
            if (req.file) {
                client.upload(req.file.path, {}, function (err, versions, meta) {
                    // STATUS OF 400 FOR VALIDATIONS
                    if (err) {
                        console.log(err)
                        return res.status(400).send({ err })
                    };

                    let imgUrl = versions[0].url.split('-');
                    imgUrl.pop();
                    imgUrl = imgUrl.join('-');
                    pet.avatarUrl = imgUrl;
                    pet.save();

                    res.send({ pet });
                });
            } else {
                res.send({ pet });
            }
        });
    });


  // SHOW PET
  app.get('/pets/:id', (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render('pets-show', { pet: pet });
    });
  });

  // EDIT PET
  app.get('/pets/:id/edit', (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render('pets-edit', { pet: pet });
    });
  });

  // UPDATE PET
  app.put('/pets/:id', (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body)
      .then((pet) => {
        res.redirect(`/pets/${pet._id}`)
      })
      .catch((err) => {
        // Handle Errors
      });
  });

  // DELETE PET
  app.delete('/pets/:id', (req, res) => {
    Pet.findByIdAndRemove(req.params.id).exec((err, pet) => {
      return res.redirect('/')
    });
  });
}
