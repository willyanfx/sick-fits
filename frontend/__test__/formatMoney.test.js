import formatMoney from '../lib/formatMoney';

describe('format Money function', () => {
  it('should works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(999)).toEqual('$9.99');
  });
  it('should format as intenger when is full dollar', () => {
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(2100)).toEqual('$21');
    expect(formatMoney(92100)).toEqual('$921');
  });
});
