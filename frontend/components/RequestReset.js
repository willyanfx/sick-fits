import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import ErrorMessage from './ErrorMessage';

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [signup, { data, loading }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const res = await signup();
    console.log('RESULT::: ', res);
    resetForm();
  };
  console.log(data?.authenticateUserWithPassword?.message);

  const resetedLink = data?.sendUserPasswordResetLink === null && (
    <p>Success! check your email for a link</p>
  );
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      {loading && <p>Loading ...</p>}
      <ErrorMessage error={data?.authenticateUserWithPassword} />
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

        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
}
