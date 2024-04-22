
const multer = require('multer');
const AWS = require('aws-sdk');

const upload = multer({ dest: 'uploads/' }); 

// Configure AWS SDK with credentials and region
AWS.config.update({
    accessKeyId:  process.env.YOUR_ACCESS_KEY_ID,
    secretAccessKey:  process.env.YOUR_SECRET_ACCESS_KEY,
    region: 'us-east-1' 
});

const s3 = new AWS.S3();

// Handle file upload route
const uploadImageToS3 = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            res.status(400).send('Multer error');
        } else if (err) {
            console.error('Unknown error:', err);
            res.status(500).send('Unknown error');
        } else {
            const file = req.file; // Uploaded file object

            // Upload file to AWS S3
            const uploadParams = {
                Bucket: process.env.bucket_name, // Replace with S3 bucket name
                Key: 'image/' + file.originalname, // Specify the folder and file name in S3
                Body: file.buffer, // Buffer of the uploaded file
                ACL: 'public-read' // Set ACL to allow public read access
            };

            s3.upload(uploadParams, (err, data) => {
                if (err) {
                    console.error('Error uploading file to S3:', err);
                    res.status(500).send('Error uploading file to S3');
                } else {
                    console.log('File uploaded successfully to S3:', data.Location);
                    req.imageUrl = data.Location;
                    next(); 
                }
            });
        }
    });
};

module.exports = {
    uploadImageToS3
  };
  

