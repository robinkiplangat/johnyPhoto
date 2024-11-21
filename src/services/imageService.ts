import axios from 'axios';
import { PromptConfig, GeneratedImage, AIModel } from '../types/types';
import { API_CONFIG } from '../config/api.config';

const api = axios.create({
  baseURL: API_CONFIG.REPLICATE_ENDPOINT,
  headers: {
    'Authorization': `Token ${API_CONFIG.REPLICATE_API_KEY}`,
    'Content-Type': 'application/json',
  }
});

export const generateImages = async (
  config: PromptConfig, 
  selectedModel: AIModel
): Promise<GeneratedImage[]> => {
  try {
    const response = await api.post('', {
      version: selectedModel.id,
      input: {
        prompt: config.mainPrompt,
        num_outputs: config.variations,
        webhook: API_CONFIG.MAKE_WEBHOOK_URL,
        webhook_events_filter: ["completed"]
      },
    });

    // Return pending images with prediction ID
    return [{
      id: response.data.id,
      url: '', // Will be populated via webhook
      prompt: config.mainPrompt,
      model: selectedModel.name,
      createdAt: new Date(),
      rating: null,
      status: 'pending'
    }];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to generate images');
    }
    throw error;
  }
};

export const checkPredictionStatus = async (predictionId: string): Promise<any> => {
  const response = await api.get(`/${predictionId}`);
  return response.data;
}; 