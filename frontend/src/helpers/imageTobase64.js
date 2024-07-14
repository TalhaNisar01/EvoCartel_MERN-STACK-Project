/**
 * Converts an image file to a base64 string.
 * @param {File} file - The image file to convert.
 * @returns {Promise<string>} A promise that resolves to the base64 string of the image.
 */
export const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        resolve(reader.result);
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      if (file) {
        reader.readAsDataURL(file); // Reads the file as a base64 string
      } else {
        reject(new Error("No file provided"));
      }
    });
  };
  