const API_BASE_URL = 'http://localhost:5000';

export const processImage = async (imageFile, options) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  // Convert options to form data
  Object.entries(options).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  try {
    const response = await fetch(`${API_BASE_URL}/process`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image processing failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

export const checkServerStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch {
    return false;
  }
};