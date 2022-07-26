describe('Same test 101', () => {
  it('works as expected', () => {
    // expect statements to see if the test will pass
    expect(1).toEqual(1);
    const age = 25;
    expect(age * 4).toEqual(100);
  });
  it('should have 2 items', () => {
    const arr = [2, 3];
    expect(arr.length).toBeGreaterThanOrEqual(2);
  });
});
