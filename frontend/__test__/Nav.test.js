import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';

const noSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedItem: fakeUser({
          cart: [fakeCartItem()],
        }),
      },
    },
  },
];
describe('<Nav />', () => {
  it('should renders nav when signed out', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={noSignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    expect(container).toHaveTextContent('Sign In');
    expect(container).toMatchSnapshot();
    const link = screen.getByText('Sign In');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signin');
    const productsLink = screen.getByText('Products');
    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute('href', '/products');
  });

  it('render full nav when sign in', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByText('Account');
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Sign Out');
    expect(container).toHaveTextContent('My Cart');
  });

  it('should render the amount of items in teh cart', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocksWithCartItems}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );

    await screen.findByText('Account');
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
