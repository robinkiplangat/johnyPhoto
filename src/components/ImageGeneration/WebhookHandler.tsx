import { useEffect } from 'react';
import { checkPredictionStatus } from '../../services/imageService';

interface ReplicateResponse {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed';
  output: string[];
  error: string | null;
}

interface Props {
  predictionId: string;
  onImageComplete: (predictionId: string, imageUrls: string[]) => void;
  onError: (error: string) => void;
}

export const WebhookHandler: React.FC<Props> = ({ 
  predictionId, 
  onImageComplete,
  onError 
}) => {
  useEffect(() => {
    const pollStatus = async () => {
      try {
        const status: ReplicateResponse = await checkPredictionStatus(predictionId);
        
        if (status.status === 'succeeded' && status.output) {
          onImageComplete(predictionId, status.output);
        } else if (status.status === 'failed') {
          onError(status.error || 'Image generation failed');
        }
      } catch (error) {
        console.error('Error checking prediction status:', error);
      }
    };

    const interval = setInterval(pollStatus, 5000);
    return () => clearInterval(interval);
  }, [predictionId, onImageComplete, onError]);

  return null;
}; 