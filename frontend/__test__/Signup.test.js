import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import wait from 'waait';
import Signup, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const me = fakeUser();
const password = 'will';
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
];

describe('<SignUp />', () => {
  it('should render and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <Signup />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/name/i), me.name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);

    await userEvent.click(screen.getByText('Sign Up!'));
    await screen.findByText(
      `Signed up with ${me.email} - Please Go Head and Sign in!`
    );
  });
});
