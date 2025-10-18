import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResourceModal } from './ResourceModal';
import type { Resource } from '../types/types';

const mockResource: Resource = {
  id: '1',
  category: 'Podcasts',
  title: 'Test Podcast',
  thumbnail: 'https://example.com/test.jpg',
  tags: ['test', 'example', 'demo'],
  duration: 30,
  description: 'This is a detailed test podcast description that provides more information.',
  date_uploaded: '2025-07-10',
};

describe('ResourceModal', () => {
  it('should render all resource details', () => {
    const onClose = vi.fn();
    render(<ResourceModal resource={mockResource} onClose={onClose} />);

    expect(screen.getByText('Test Podcast')).toBeInTheDocument();
    expect(screen.getByText('Podcasts')).toBeInTheDocument();
    expect(screen.getByText('30 minutes')).toBeInTheDocument();
    expect(screen.getByText('10 July 2025')).toBeInTheDocument();
    expect(screen.getByText('This is a detailed test podcast description that provides more information.')).toBeInTheDocument();
  });

  it('should render all tags', () => {
    const onClose = vi.fn();
    render(<ResourceModal resource={mockResource} onClose={onClose} />);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('example')).toBeInTheDocument();
    expect(screen.getByText('demo')).toBeInTheDocument();
  });

  it('should render thumbnail image with correct alt text', () => {
    const onClose = vi.fn();
    render(<ResourceModal resource={mockResource} onClose={onClose} />);

    const image = screen.getByAltText('Test Podcast');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/test.jpg');
  });

  it('should call onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ResourceModal resource={mockResource} onClose={onClose} />);

    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when backdrop is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ResourceModal resource={mockResource} onClose={onClose} />);

    const backdrop = screen.getByText('Test Podcast').closest('.fixed');
    if (backdrop) {
      await user.click(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('should not call onClose when modal content is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ResourceModal resource={mockResource} onClose={onClose} />);

    const modalContent = screen.getByText('Description').closest('.bg-white');
    if (modalContent) {
      await user.click(modalContent);
      expect(onClose).not.toHaveBeenCalled();
    }
  });

  it('should format date correctly', () => {
    const onClose = vi.fn();
    render(<ResourceModal resource={mockResource} onClose={onClose} />);

    expect(screen.getByText('10 July 2025')).toBeInTheDocument();
  });

  it('should display duration in minutes', () => {
    const onClose = vi.fn();
    render(<ResourceModal resource={mockResource} onClose={onClose} />);

    expect(screen.getByText('30 minutes')).toBeInTheDocument();
  });

  it('should have proper ARIA label for close button', () => {
    const onClose = vi.fn();
    render(<ResourceModal resource={mockResource} onClose={onClose} />);

    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toBeInTheDocument();
  });

  it('should display category badge', () => {
    const onClose = vi.fn();
    render(<ResourceModal resource={mockResource} onClose={onClose} />);

    const categoryBadge = screen.getByText('Podcasts');
    expect(categoryBadge).toHaveClass('bg-teal-500');
  });
});
