import imageCompression from "browser-image-compression";

const MAX_SIZE_BYTES = 20 * 1024;

export const reduceImageSize = async (file: File): Promise<File> => {
  try {
    if (file.size > MAX_SIZE_BYTES) {
      const options = {
        maxSizeMB: 0.015,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      file = await imageCompression(file, options);
      return file;
    } else {
      return file;
    }
  } catch (error: unknown) {
    throw "Error during image resizing";
  }
};