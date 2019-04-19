// In order to accomplish this pattern we have to take the following steps:

// TODO:

// Get an AWS console account[Done]
// Get our API public and secret keys and save them in our .env folder.[Done]
// Make a new "bucket" in AWS S3[Done]
// Change the form to use multipart/form-data[]
// Add some middleware to accept multipart/form-data: multer[]
// Add some middleware to interact with the S3 API: s3-uploader[]
// Initialize and use the middleware in the controller route.[]
// Save the image URL into the database[]
// Display the image using the URL[]