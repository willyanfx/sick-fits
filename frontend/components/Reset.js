import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import ErrorMessage from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      message
      code
    }
  }
`;

function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset();
    resetForm();
  };
  console.log(data?.authenticateUserWithPassword?.message);

  const resetedLink = data?.redeemUserPasswordResetToken === null && (
    <p>Success! You can sign</p>
  );
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      {loading && <p>Loading ...</p>}
      <ErrorMessage error={data?.redeemUserPasswordResetToken} />
      <fieldset aria-busy={loading} disabled={loading}>
        {resetedLink}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your email address"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
}
export { Reset };
