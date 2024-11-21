export const API_CONFIG = {
  FLUX_PRO_API_KEY: import.meta.env.VITE_FLUX_PRO_API_KEY,
  FLUX_PRO_ENDPOINT: 'https://api.flux.pro/v1/images', // Replace with actual FLUX Pro endpoint
  SUPPORTED_MODELS: [
    {
      id: 'flux-pro-v1',
      name: 'FLUX Pro',
      description: 'High-quality image generation with excellent prompt adherence',
      costPerImage: 0.02,
      isAvailable: true,
    },
    {
      id: 'flux-pro-v2',
      name: 'FLUX Pro V2',
      description: 'Enhanced version with better detail and composition',
      costPerImage: 0.03,
      isAvailable: true,
    }
  ]
}; 