import 'dotenv/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const client = new S3Client({ region: bucketRegion, accessKey, secretKey });

// upload file to s3

export const uploadFile = (fileBuffer, fileName, mimetype) => {
  try {
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype,
    };
    return client.send(new PutObjectCommand(uploadParams));
  } catch (error) {
    console.log(error);
    throw Error('Error while uploading image to cloud');
  }
};

export async function getObjectUrl(key) {
  try {
    return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${key}`;
  } catch (error) {
    console.log(error);
    throw Error('Error while downloading image from cloud');
  }
}

export function deleteFile(fileName) {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    };

    return client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.log(error);
    throw Error('Error while deleting image from cloud');
  }
}
