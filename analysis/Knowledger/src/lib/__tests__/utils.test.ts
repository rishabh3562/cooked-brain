import { cn } from '../utils';

describe('cn', () => {
  it('should return a string', () => {
    expect(typeof cn()).toBe('string');
  });

  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle falsy values', () => {
    expect(cn('foo', null, undefined, false, '', 'bar')).toBe('foo bar');
  });

  it('should handle clsx and tailwind-merge', () => {
    // This is a simple test; we can't test the exact output of twMerge without knowing the tailwind config.
    // But we can ensure it returns a string and doesn't throw.
    expect(() => cn('p-4', 'text-red-500', 'hover:bg-blue-100')).not.toThrow();
  });
});