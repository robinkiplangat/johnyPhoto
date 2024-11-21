import { ImagePromptForm } from './components/ImageGeneration/ImagePromptForm';
import { ModelSelector } from './components/ImageGeneration/ModelSelector';
import { ImageRating } from './components/ImageGeneration/ImageRating';
import { useImageGeneration } from './hooks/useImageGeneration';

function App() {
  const {
    images,
    isLoading,
    error,
    selectedModel,
    setSelectedModel,
    generateImagesFromPrompt,
    handleRateImage,
  } = useImageGeneration();

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">AI Image Generator</h1>

            <ModelSelector
              selectedModel={selectedModel}
              onModelSelect={setSelectedModel}
            />

            <div className="mt-8">
              <ImagePromptForm 
                onSubmit={generateImagesFromPrompt}
                isLoading={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-500 mt-4">
                {error}
              </div>
            )}

            {images.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-6">
                {images.map((image) => (
                  <div key={image.id} className="relative space-y-2">
                    <img 
                      src={image.url} 
                      alt={image.prompt}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <div className="flex justify-between items-center p-2">
                      <ImageRating
                        imageId={image.id}
                        currentRating={image.rating}
                        onRate={handleRateImage}
                      />
                      <span className="text-sm text-gray-500">
                        Generated with {image.model}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
