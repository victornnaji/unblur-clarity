import { v2 as cloudinary } from 'cloudinary';
import invariant from 'tiny-invariant';


invariant(process.env.CLOUDINARY_CLOUD_NAME, "CLOUDINARY_CLOUD_NAME is not set");
invariant(process.env.CLOUDINARY_API_KEY, "CLOUDINARY_API_KEY is not set");
invariant(process.env.CLOUDINARY_API_SECRET, "CLOUDINARY_API_SECRET is not set");

export function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

export { cloudinary };