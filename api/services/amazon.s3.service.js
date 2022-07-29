import 'dotenv/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const client = new S3Client({ region: bucketRegion, accessKey, secretKey });

//upload file to s3

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

export async function getObjectSignedUrl(key) {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    const command = new GetObjectCommand(params);
    const seconds = 3600;
    const url = await getSignedUrl(client, command);

    return url;
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
