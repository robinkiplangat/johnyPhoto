export interface PromptConfig {
  mainPrompt: string;
  scene?: string;
  objects?: string[];
  environment?: string[];
  activities?: string[];
  variations: number;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  model: string;
  rating?: number;
  createdAt: Date;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  costPerImage: number;
  isAvailable: boolean;
} 