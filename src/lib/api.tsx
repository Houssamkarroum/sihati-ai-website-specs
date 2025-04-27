const API_BASE_URL = 'http://localhost:5000/api';

export const analyzeImage = async (file: File, lang: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('lang', lang);

  const response = await fetch(`${API_BASE_URL}/analyze-image`, {
    method: 'POST',
    body: formData,
  });

  return response.json();
};

export const getMedicationAdvice = async (symptoms: string, lang: string) => {
  const response = await fetch(`${API_BASE_URL}/medication-advice`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ symptoms, lang }),
  });

  return response.json();
};

export const findSpecialist = async (illness: string, lang: string) => {
  const response = await fetch(`${API_BASE_URL}/find-specialist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ illness, lang }),
  });

  return response.json();
};

export const findHospitals = async (location: string) => {
  const response = await fetch(`${API_BASE_URL}/find-hospitals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ location }),
  });

  return response.json();
};
