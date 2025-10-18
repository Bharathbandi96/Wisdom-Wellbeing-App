import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

vi.mock('./data/mockResources', () => ({
  mockResources: [
    {
      id: '1',
      category: 'Podcasts',
      title: 'Mindful Moments',
      thumbnail: 'https://example.com/podcast.jpg',
      tags: ['wellbeing', 'mindfulness', 'relaxation'],
      duration: 25,
      description: 'A calming podcast focused on mindfulness techniques.',
      date_uploaded: '2025-07-10',
    },
    {
      id: '2',
      category: 'Articles',
      title: 'The Science of Sleep',
      thumbnail: 'https://example.com/article.jpg',
      tags: ['wellbeing', 'sleep', 'science'],
      duration: 8,
      description: 'Explore the latest research on sleep.',
      date_uploaded: '2025-06-22',
    },
    {
      id: '3',
      category: 'Fitness',
      title: 'Morning Stretch',
      thumbnail: 'https://example.com/fitness.jpg',
      tags: ['mobility', 'energy', 'routine'],
      duration: 10,
      description: 'A short stretching routine.',
      date_uploaded: '2025-08-05',
    },
  ],
}));

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render header with title and logo', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Wisdom Wellbeing')).toBeInTheDocument();
    });

    expect(screen.getByText('Your Resource Centre for Better Living')).toBeInTheDocument();
  });

  it('should show loading state initially', () => {
    render(<App />);

    expect(screen.getByText('Loading resources...')).toBeInTheDocument();
  });

  it('should load and display resources after loading', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Mindful Moments')).toBeInTheDocument();
    expect(screen.getByText('The Science of Sleep')).toBeInTheDocument();
    expect(screen.getByText('Morning Stretch')).toBeInTheDocument();
  });

  it('should group resources by category on initial load', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    const categoryHeadings = screen.getAllByRole('heading', { level: 2 });
    const categoryNames = categoryHeadings.map(h => h.textContent);

    expect(categoryNames).toContain('Podcasts');
    expect(categoryNames).toContain('Articles');
    expect(categoryNames).toContain('Fitness');
  });

  it('should render filter bar with all categories', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Podcasts' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Articles' })).toBeInTheDocument();
  });

  it('should filter resources by category when category button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    const podcastsButton = screen.getByRole('button', { name: 'Podcasts' });
    await user.click(podcastsButton);

    expect(screen.getByText('Mindful Moments')).toBeInTheDocument();
    expect(screen.queryByText('The Science of Sleep')).not.toBeInTheDocument();
    expect(screen.queryByText('Morning Stretch')).not.toBeInTheDocument();
  });

  it('should filter resources by search query', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by title or tags...');
    await user.type(searchInput, 'sleep');

    await waitFor(() => {
      expect(screen.getByText('The Science of Sleep')).toBeInTheDocument();
      expect(screen.queryByText('Mindful Moments')).not.toBeInTheDocument();
      expect(screen.queryByText('Morning Stretch')).not.toBeInTheDocument();
    });
  });

  it('should open modal when resource card is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    const resourceCards = screen.getAllByRole('article');
    await user.click(resourceCards[0]);

    await waitFor(() => {
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    const resourceCards = screen.getAllByRole('article');
    await user.click(resourceCards[0]);

    const closeButton = await screen.findByLabelText('Close modal');
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
    });
  });

  it('should show no results message when search has no matches', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by title or tags...');
    await user.type(searchInput, 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText('No resources found matching your criteria')).toBeInTheDocument();
    });
  });

  it('should change sort order when sort option is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    const sortSelect = screen.getByRole('combobox');
    await user.selectOptions(sortSelect, 'duration-shortest');

    const resourceTitles = screen.getAllByRole('article').map((article) => {
      const title = article.querySelector('h3');
      return title?.textContent;
    });

    expect(resourceTitles[0]).toBe('The Science of Sleep');
  });

  it('should render footer', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Wisdom Wellbeing Resource Centre')).toBeInTheDocument();
  });

  it('should return to grouped view when All category is selected after filtering', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Loading resources...')).not.toBeInTheDocument();
    });

    const podcastsButton = screen.getByRole('button', { name: 'Podcasts' });
    await user.click(podcastsButton);

    await waitFor(() => {
      const headings = screen.queryAllByRole('heading', { level: 2 });
      const hasArticlesHeading = headings.some(h => h.textContent === 'Articles');
      expect(hasArticlesHeading).toBe(false);
    });

    const allButton = screen.getByRole('button', { name: 'All' });
    await user.click(allButton);

    await waitFor(() => {
      const categoryHeadings = screen.getAllByRole('heading', { level: 2 });
      const categoryNames = categoryHeadings.map(h => h.textContent);

      expect(categoryNames).toContain('Podcasts');
      expect(categoryNames).toContain('Articles');
      expect(categoryNames).toContain('Fitness');
    });
  });
});
