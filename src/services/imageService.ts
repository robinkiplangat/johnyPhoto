import axios from 'axios';
import { PromptConfig, GeneratedImage, AIModel } from '../types/types';
import { API_CONFIG } from '../config/api.config';

const api = axios.create({
  baseURL: API_CONFIG.FLUX_PRO_ENDPOINT,
  headers: {
    'Authorization': `Bearer ${API_CONFIG.FLUX_PRO_API_KEY}`,
    'Content-Type': 'application/json',
  }
});

export const generateImages = async (
  config: PromptConfig, 
  selectedModel: AIModel
): Promise<GeneratedImage[]> => {
  try {
    const response = await api.post('/generate', {
      prompt: config.mainPrompt,
      num_images: config.variations,
      model: selectedModel.id,
      scene: config.scene,
      objects: config.objects,
      environment: config.environment,
      activities: config.activities,
    });

    return response.data.images.map((img: any) => ({
      id: img.id,
      url: img.url,
      prompt: config.mainPrompt,
      model: selectedModel.name,
      createdAt: new Date(),
      rating: null,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to generate images');
    }
    throw error;
  }
};

export const rateImage = async (imageId: string, rating: number): Promise<void> => {
  await api.post(`/images/${imageId}/rate`, { rating });
}; 