import { render, screen } from '@testing-library/react';
import Landing from '@/pages/services/[service]/[location]';
import { describe, it, expect } from 'vitest';

describe('Landing Component', () => {
  it('renders correctly with given params', () => {
    render(<Landing params={{ service: 'cleaning', location: 'berlin' }} template={{ title: 'Service: Cleaning - Location: Berlin' }} />);
    expect(screen.getByText('Service: Cleaning - Location: Berlin')).toBeDefined();
  });
});