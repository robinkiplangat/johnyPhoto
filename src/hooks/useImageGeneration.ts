import { useState, useCallback } from 'react';
import { PromptConfig, GeneratedImage, AIModel } from '../types/types';
import { generateImages, rateImage } from '../services/imageService';
import { API_CONFIG } from '../config/api.config';

export const useImageGeneration = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModel>(API_CONFIG.SUPPORTED_MODELS[0]);

  const handleImageComplete = useCallback((predictionId: string, imageUrl: string) => {
    setImages(prevImages =>
      prevImages.map(img =>
        img.id === predictionId
          ? { ...img, url: imageUrl, status: 'completed' }
          : img
      )
    );
  }, []);

  const generateImagesFromPrompt = async (config: PromptConfig) => {
    try {
      setIsLoading(true);
      setError(null);
      const generatedImages = await generateImages(config, selectedModel);
      setImages(generatedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate images');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    images,
    isLoading,
    error,
    selectedModel,
    setSelectedModel,
    generateImagesFromPrompt,
    handleImageComplete,
  };
}; 