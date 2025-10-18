import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useResources } from './useResources';
import * as mockData from '../data/mockResources';

vi.mock('../data/mockResources', () => ({
  mockResources: [
    {
      id: '1',
      category: 'Podcasts',
      title: 'Test Podcast',
      thumbnail: 'test.jpg',
      tags: ['test'],
      duration: 30,
      description: 'Test description',
      date_uploaded: '2025-07-10',
    },
    {
      id: '2',
      category: 'Articles',
      title: 'Test Article',
      thumbnail: 'test.jpg',
      tags: ['test'],
      duration: 10,
      description: 'Test description',
      date_uploaded: '2025-06-22',
    },
  ],
}));

describe('useResources', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading state initially', () => {
    const { result } = renderHook(() => useResources());

    expect(result.current.loading).toBe(true);
    expect(result.current.resources).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should load resources successfully', async () => {
    const { result } = renderHook(() => useResources());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.resources).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  it('should return all mock resources', async () => {
    const { result } = renderHook(() => useResources());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.resources).toEqual(mockData.mockResources);
  });

  it('should provide refetch function', async () => {
    const { result } = renderHook(() => useResources());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe('function');
  });

  it('should refetch resources when refetch is called', async () => {
    const { result } = renderHook(() => useResources());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const initialResources = result.current.resources;

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.resources).toEqual(initialResources);
  });

  it('should not mutate resources array on subsequent renders', async () => {
    const { result, rerender } = renderHook(() => useResources());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const firstResources = result.current.resources;

    rerender();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.resources).toEqual(firstResources);
  });

  it('should have error as null when loading succeeds', async () => {
    const { result } = renderHook(() => useResources());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
  });
});
