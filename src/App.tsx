import { ImagePromptForm } from './components/ImageGeneration/ImagePromptForm';
import { ModelSelector } from './components/ImageGeneration/ModelSelector';
import { useImageGeneration } from './hooks/useImageGeneration';

function App() {
  const {
    images,
    isLoading,
    error,
    selectedModel,
    setSelectedModel,
    generateImagesFromPrompt,
  } = useImageGeneration();

  return (
    <div className="container mx-auto px-4 py-8">
      <ModelSelector
        selectedModel={selectedModel}
        onModelSelect={setSelectedModel}
      />
      <ImagePromptForm
        onSubmit={generateImagesFromPrompt}
        isLoading={isLoading}
      />
      {error && (
        <div className="text-red-500 mt-4">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {images.map((image) => (
          <div key={image.id} className="rounded-lg overflow-hidden shadow-lg">
            {image.url ? (
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 animate-pulse flex items-center justify-center">
                <p className="text-gray-500">Generating...</p>
              </div>
            )}
            <div className="p-4">
              <p className="text-sm text-gray-600">{image.prompt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
