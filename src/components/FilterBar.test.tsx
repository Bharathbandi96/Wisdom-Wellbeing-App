import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar } from './FilterBar';
import type { ResourceCategory, SortOption } from '../types/types';

const categories: (ResourceCategory | 'All')[] = [
  'All',
  'Podcasts',
  'Articles',
  'Newsletters',
  'Recipes',
  'Fitness',
  'Meditation',
];

describe('FilterBar', () => {
  const defaultProps = {
    searchQuery: '',
    onSearchChange: vi.fn(),
    selectedCategory: 'All' as ResourceCategory | 'All',
    onCategoryChange: vi.fn(),
    sortOption: 'date-newest' as SortOption,
    onSortChange: vi.fn(),
    categories,
  };

  it('should render search input', () => {
    render(<FilterBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search by title or tags...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render all category buttons', () => {
    render(<FilterBar {...defaultProps} />);

    categories.forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
  });

  it('should render sort dropdown', () => {
    render(<FilterBar {...defaultProps} />);

    const sortSelect = screen.getByRole('combobox');
    expect(sortSelect).toBeInTheDocument();
  });

  it('should call onSearchChange when typing in search input', async () => {
    const onSearchChange = vi.fn();
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} onSearchChange={onSearchChange} />);

    const searchInput = screen.getByPlaceholderText('Search by title or tags...');
    await user.type(searchInput, 'test');

    expect(onSearchChange).toHaveBeenCalled();
    expect(onSearchChange.mock.calls.length).toBeGreaterThan(0);
  });

  it('should call onCategoryChange when category button is clicked', async () => {
    const onCategoryChange = vi.fn();
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} onCategoryChange={onCategoryChange} />);

    const podcastsButton = screen.getByRole('button', { name: 'Podcasts' });
    await user.click(podcastsButton);

    expect(onCategoryChange).toHaveBeenCalledWith('Podcasts');
  });

  it('should call onSortChange when sort option is changed', async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} onSortChange={onSortChange} />);

    const sortSelect = screen.getByRole('combobox');
    await user.selectOptions(sortSelect, 'duration-shortest');

    expect(onSortChange).toHaveBeenCalledWith('duration-shortest');
  });

  it('should highlight selected category', () => {
    render(<FilterBar {...defaultProps} selectedCategory="Podcasts" />);

    const podcastsButton = screen.getByRole('button', { name: 'Podcasts' });
    expect(podcastsButton).toHaveClass('bg-teal-600');
  });

  it('should display current search query', () => {
    render(<FilterBar {...defaultProps} searchQuery="mindfulness" />);

    const searchInput = screen.getByPlaceholderText('Search by title or tags...') as HTMLInputElement;
    expect(searchInput.value).toBe('mindfulness');
  });

  it('should display current sort option', () => {
    render(<FilterBar {...defaultProps} sortOption="category" />);

    const sortSelect = screen.getByRole('combobox') as HTMLSelectElement;
    expect(sortSelect.value).toBe('category');
  });

  it('should render all sort options', () => {
    render(<FilterBar {...defaultProps} />);

    expect(screen.getByRole('option', { name: 'Newest First' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Oldest First' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'By Category' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Shortest First' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Longest First' })).toBeInTheDocument();
  });

  it('should apply correct styling to non-selected categories', () => {
    render(<FilterBar {...defaultProps} selectedCategory="Podcasts" />);

    const articlesButton = screen.getByRole('button', { name: 'Articles' });
    expect(articlesButton).toHaveClass('bg-slate-100');
  });

  it('should handle multiple category changes', async () => {
    const onCategoryChange = vi.fn();
    const user = userEvent.setup();
    render(<FilterBar {...defaultProps} onCategoryChange={onCategoryChange} />);

    await user.click(screen.getByRole('button', { name: 'Podcasts' }));
    await user.click(screen.getByRole('button', { name: 'Articles' }));
    await user.click(screen.getByRole('button', { name: 'All' }));

    expect(onCategoryChange).toHaveBeenCalledTimes(3);
    expect(onCategoryChange).toHaveBeenNthCalledWith(1, 'Podcasts');
    expect(onCategoryChange).toHaveBeenNthCalledWith(2, 'Articles');
    expect(onCategoryChange).toHaveBeenNthCalledWith(3, 'All');
  });
});
