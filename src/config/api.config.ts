export const API_CONFIG = {
  REPLICATE_API_KEY: import.meta.env.VITE_REPLICATE_API_KEY,
  REPLICATE_ENDPOINT: 'https://api.replicate.com/v1/predictions',
  MAKE_WEBHOOK_URL: import.meta.env.VITE_MAKE_WEBHOOK_URL,
  SUPPORTED_MODELS: [
    {
      id: 'stability-ai/sdxl',
      name: 'SDXL',
      description: 'Stable Diffusion XL for high-quality image generation',
      costPerImage: 0.02,
      isAvailable: true,
    }
  ]
}; 