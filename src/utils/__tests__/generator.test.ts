import { describe, it, expect } from 'vitest';
import { generatePaths, getData } from '@/utils/generator';

describe('generatePaths', () => {
  it('generates all combinations of keywords', () => {
    const paths = generatePaths({
      service: { 'cleaning': { name: 'Cleaning' }, 'plumbing': { name: 'Plumbing' } },
      location: { 'berlin': { name: 'Berlin' }, 'paris': { name: 'Paris' } }
    });

    expect(paths).toEqual([
      { params: { service: 'cleaning', location: 'berlin' } },
      { params: { service: 'cleaning', location: 'paris' } },
      { params: { service: 'plumbing', location: 'berlin' } },
      { params: { service: 'plumbing', location: 'paris' } }
    ]);
  });
});


describe('getData', () => {
  it('transforms params to template data', () => {
    const result = getData({ service: 'cleaning', location: 'berlin' });
    expect(result).toEqual({
      service: { key: 'service', value: 'cleaning', metadata: { name: 'Cleaning' } },
      location: { key: 'location', value: 'berlin', metadata: { name: 'Berlin' } }
    });
  });
});