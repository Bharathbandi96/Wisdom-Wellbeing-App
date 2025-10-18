import { describe, it, expect } from 'vitest';
import { filterResources, sortResources, groupByCategory } from './resourceFilters';
import type { Resource } from '../types/types';

const mockResources: Resource[] = [
  {
    id: '1',
    category: 'Podcasts',
    title: 'Mindful Moments',
    thumbnail: 'test.jpg',
    tags: ['wellbeing', 'mindfulness', 'relaxation'],
    duration: 25,
    description: 'A calming podcast',
    date_uploaded: '2025-07-10',
  },
  {
    id: '2',
    category: 'Articles',
    title: 'The Science of Sleep',
    thumbnail: 'test.jpg',
    tags: ['wellbeing', 'sleep', 'science'],
    duration: 8,
    description: 'Sleep research',
    date_uploaded: '2025-06-22',
  },
  {
    id: '3',
    category: 'Fitness',
    title: 'Morning Stretch',
    thumbnail: 'test.jpg',
    tags: ['mobility', 'energy', 'routine'],
    duration: 10,
    description: 'Stretching routine',
    date_uploaded: '2025-08-05',
  },
  {
    id: '4',
    category: 'Meditation',
    title: 'Stress Relief',
    thumbnail: 'test.jpg',
    tags: ['relaxation', 'routine', 'sleep'],
    duration: 15,
    description: 'Guided meditation',
    date_uploaded: '2025-07-28',
  },
];

describe('resourceFilters', () => {
  describe('filterResources', () => {
    it('should return all resources when category is All and no search query', () => {
      const result = filterResources(mockResources, '', 'All');
      expect(result).toHaveLength(4);
    });

    it('should filter resources by category', () => {
      const result = filterResources(mockResources, '', 'Podcasts');
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Podcasts');
    });

    it('should filter resources by search query in title', () => {
      const result = filterResources(mockResources, 'stretch', 'All');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Morning Stretch');
    });

    it('should filter resources by search query in tags', () => {
      const result = filterResources(mockResources, 'sleep', 'All');
      expect(result).toHaveLength(2);
    });

    it('should filter by both category and search query', () => {
      const result = filterResources(mockResources, 'wellbeing', 'Articles');
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('Articles');
    });

    it('should be case insensitive', () => {
      const result = filterResources(mockResources, 'MINDFUL', 'All');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Mindful Moments');
    });

    it('should return empty array when no matches', () => {
      const result = filterResources(mockResources, 'nonexistent', 'All');
      expect(result).toHaveLength(0);
    });
  });

  describe('sortResources', () => {
    it('should sort by date newest first', () => {
      const result = sortResources(mockResources, 'date-newest');
      expect(result[0].date_uploaded).toBe('2025-08-05');
      expect(result[result.length - 1].date_uploaded).toBe('2025-06-22');
    });

    it('should sort by date oldest first', () => {
      const result = sortResources(mockResources, 'date-oldest');
      expect(result[0].date_uploaded).toBe('2025-06-22');
      expect(result[result.length - 1].date_uploaded).toBe('2025-08-05');
    });

    it('should sort by category alphabetically', () => {
      const result = sortResources(mockResources, 'category');
      expect(result[0].category).toBe('Articles');
      expect(result[result.length - 1].category).toBe('Podcasts');
    });

    it('should sort by duration shortest first', () => {
      const result = sortResources(mockResources, 'duration-shortest');
      expect(result[0].duration).toBe(8);
      expect(result[result.length - 1].duration).toBe(25);
    });

    it('should sort by duration longest first', () => {
      const result = sortResources(mockResources, 'duration-longest');
      expect(result[0].duration).toBe(25);
      expect(result[result.length - 1].duration).toBe(8);
    });

    it('should not mutate original array', () => {
      const original = [...mockResources];
      sortResources(mockResources, 'date-newest');
      expect(mockResources).toEqual(original);
    });
  });

  describe('groupByCategory', () => {
    it('should group resources by category', () => {
      const result = groupByCategory(mockResources);
      expect(result.size).toBe(4);
      expect(result.get('Podcasts')).toHaveLength(1);
      expect(result.get('Articles')).toHaveLength(1);
      expect(result.get('Fitness')).toHaveLength(1);
      expect(result.get('Meditation')).toHaveLength(1);
    });

    it('should handle empty array', () => {
      const result = groupByCategory([]);
      expect(result.size).toBe(0);
    });

    it('should handle multiple resources in same category', () => {
      const resources: Resource[] = [
        ...mockResources,
        {
          id: '5',
          category: 'Podcasts',
          title: 'Another Podcast',
          thumbnail: 'test.jpg',
          tags: ['test'],
          duration: 20,
          description: 'Test',
          date_uploaded: '2025-08-01',
        },
      ];
      const result = groupByCategory(resources);
      expect(result.get('Podcasts')).toHaveLength(2);
    });
  });
});
