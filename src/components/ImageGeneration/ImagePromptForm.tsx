import React, { useState } from 'react';
import { PromptConfig } from '../../types/types';

interface Props {
  onSubmit: (config: PromptConfig) => Promise<void>;
  isLoading: boolean;
}

export const ImagePromptForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [promptConfig, setPromptConfig] = useState<PromptConfig>({
    mainPrompt: '',
    variations: 3,
    objects: [],
    environment: [],
    activities: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(promptConfig);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Main Prompt
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={promptConfig.mainPrompt}
          onChange={(e) => setPromptConfig(prev => ({
            ...prev,
            mainPrompt: e.target.value
          }))}
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of Variations
        </label>
        <input
          type="number"
          min={1}
          max={5}
          value={promptConfig.variations}
          onChange={(e) => setPromptConfig(prev => ({
            ...prev,
            variations: parseInt(e.target.value)
          }))}
          className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? 'Generating...' : 'Generate Images'}
      </button>
    </form>
  );
}; 