// In order to accomplish this pattern we have to take the following steps:

// TODO: Done

// Get an AWS console account[Done]
// Get our API public and secret keys and save them in our .env folder.[Done]
// Make a new "bucket" in AWS S3[Done]
// Change the form to use multipart/form-data[Done]
// Add some middleware to accept multipart/form-data: multer[Done]
// Add some middleware to interact with the S3 API: s3-uploader[done]
// Initialize and use the middleware in the controller route.[Done]
// Save the image URL into the database[Done]
// Display the image using the URL[Done]

// TODO: One
// I ran into a problem when i tried to drop indexes of pets on db
// > use petes-pets
// switched to db petes - pets >
//     db.pets.dropIndex('animal_text_color_text_pattern_text_size_text'); {
//     "ok": 0,
//     "errmsg": "index not found with name [animal_text_color_text_pattern_text_size_text]",
//     "code": 27,
//     "codeName": "IndexNotFound"
// }

// TODO: Two [check with someone]
// I think my full text search isnt working properly, need more test 
// it was working when I used simple text search now. not sure if it 
// is working right

// TODO: Tests are failing work with Braus 