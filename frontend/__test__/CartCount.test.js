import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import wait from 'waait';
import CartCount from '../components/CartCount';
import { fakeItem } from '../lib/testUtils';

describe('<CartCount>', () => {
  it('should render', () => {
    const { container, debug } = render(<CartCount count={10} />);
    expect(container).toMatchSnapshot();
  });
  it('should update via props', async () => {
    const { container, rerender } = render(<CartCount count={10} />);
    expect(container.textContent).toBe('10');
    expect(container).toHaveTextContent('10'); // same as before
    rerender(<CartCount count={12} />);

    await waitFor(() => {
      expect(container.textContent).toBe('12');
    });
  });
});
