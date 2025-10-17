import { useState, useEffect } from 'react';
import { mockResources } from '../data/mockResources';
import type { Resource } from '../types/types';

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise(resolve => setTimeout(resolve, 500));

      setResources(mockResources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resources');
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  return { resources, loading, error, refetch: fetchResources };
}
