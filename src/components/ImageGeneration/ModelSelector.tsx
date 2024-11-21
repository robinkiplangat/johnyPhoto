import React from 'react';
import { AIModel } from '../../types/types';
import { API_CONFIG } from '../../config/api.config';

interface Props {
  selectedModel: AIModel;
  onModelSelect: (model: AIModel) => void;
}

export const ModelSelector: React.FC<Props> = ({ selectedModel, onModelSelect }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Select AI Model
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {API_CONFIG.SUPPORTED_MODELS.map((model) => (
          <div
            key={model.id}
            className={`relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 ${
              selectedModel.id === model.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
            }`}
            onClick={() => onModelSelect(model)}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{model.name}</span>
              <span className="text-sm text-gray-500">{model.description}</span>
              <span className="mt-2 text-sm font-medium text-indigo-600">
                ${model.costPerImage} per image
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 