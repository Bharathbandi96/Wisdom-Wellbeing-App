import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResourceCard } from './ResourceCard';
import type { Resource } from '../types/types';

const mockResource: Resource = {
  id: '1',
  category: 'Podcasts',
  title: 'Test Podcast',
  thumbnail: 'https://example.com/test.jpg',
  tags: ['test', 'example', 'demo'],
  duration: 30,
  description: 'This is a test podcast description',
  date_uploaded: '2025-07-10',
};

describe('ResourceCard', () => {
  it('should render resource information correctly', () => {
    const onClick = vi.fn();
    render(<ResourceCard resource={mockResource} onClick={onClick} />);

    expect(screen.getByText('Test Podcast')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText('This is a test podcast description')).toBeInTheDocument();
  });

  it('should render all tags', () => {
    const onClick = vi.fn();
    render(<ResourceCard resource={mockResource} onClick={onClick} />);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('example')).toBeInTheDocument();
    expect(screen.getByText('demo')).toBeInTheDocument();
  });

  it('should render thumbnail image with correct alt text', () => {
    const onClick = vi.fn();
    render(<ResourceCard resource={mockResource} onClick={onClick} />);

    const image = screen.getByAltText('Test Podcast');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/test.jpg');
  });

  it('should call onClick when card is clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<ResourceCard resource={mockResource} onClick={onClick} />);

    const card = screen.getByRole('article');
    await user.click(card);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should only display up to 3 tags', () => {
    const resourceWithManyTags: Resource = {
      ...mockResource,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    };
    const onClick = vi.fn();
    render(<ResourceCard resource={resourceWithManyTags} onClick={onClick} />);

    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
    expect(screen.queryByText('tag4')).not.toBeInTheDocument();
    expect(screen.queryByText('tag5')).not.toBeInTheDocument();
  });

  it('should have cursor pointer style', () => {
    const onClick = vi.fn();
    render(<ResourceCard resource={mockResource} onClick={onClick} />);

    const card = screen.getByRole('article');
    expect(card).toHaveClass('cursor-pointer');
  });

  it('should truncate long descriptions', () => {
    const longDescription = 'This is a very long description that should be truncated when displayed on the card to maintain a clean and consistent layout across all resource cards.';
    const resourceWithLongDesc: Resource = {
      ...mockResource,
      description: longDescription,
    };
    const onClick = vi.fn();
    render(<ResourceCard resource={resourceWithLongDesc} onClick={onClick} />);

    const description = screen.getByText(longDescription);
    expect(description).toHaveClass('line-clamp-2');
  });
});
