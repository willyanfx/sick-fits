import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

describe('<Product />', () => {
  const { container, debug } = render(
    <MockedProvider mocks={[]}>
      <Product product={product} />
    </MockedProvider>
  );
  debug();
  it('should render price tag and title', () => {
    const priceTag = screen.getByText('$50');
    expect(priceTag).toBeInTheDocument();
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/product/abc123');
    expect(link).toHaveTextContent(product.name);
  });
  it('should render and matches the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
  it('should render the image properly', () => {
    const img = screen.getByText(product.name);
    expect(img).toBeInTheDocument();
  });
});
