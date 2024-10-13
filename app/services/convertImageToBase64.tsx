export const convertImageToBase64 = async (file: File): Promise<string> => {
  try {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } catch (error: unknown) {
    throw "Image conversion error.";
  }
};
