import { capitalize, truncate, isDefined, uid, formatCurrency } from './helpers';

describe('capitalize', () => {
  it('capitalizes first letter', () => expect(capitalize('hello')).toBe('Hello'));
  it('lowercases rest',         () => expect(capitalize('hELLO')).toBe('Hello'));
  it('handles empty string',    () => expect(capitalize('')).toBe(''));
});

describe('truncate', () => {
  it('truncates long strings',        () => expect(truncate('Hello World', 8)).toBe('Hello...'));
  it('leaves short strings intact',   () => expect(truncate('Hi', 10)).toBe('Hi'));
  it('supports custom suffix',        () => expect(truncate('Hello World', 7, '…')).toBe('Hello W…'));
});

describe('isDefined', () => {
  it('returns true for defined values', () => {
    expect(isDefined('value')).toBe(true);
    expect(isDefined(0)).toBe(true);
    expect(isDefined(false)).toBe(true);
  });
  it('returns false for null/undefined', () => {
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });
});

describe('uid', () => {
  it('generates a non-empty string', () => expect(uid().length).toBeGreaterThan(0));
  it('generates unique values',      () => expect(uid()).not.toBe(uid()));
});
