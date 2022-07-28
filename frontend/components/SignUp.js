import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import ErrorMessage from './ErrorMessage';

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });
  const [signup, { data, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup();
    resetForm();
  };

  const signed = data?.createUser && (
    <p>Signed up with {data?.createUser.email} - Please Go Head and Sign in!</p>
  );
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      {loading && <p>Loading ...</p>}
      <ErrorMessage error={data?.authenticateUserWithPassword} />
      <fieldset aria-busy={loading} disabled={loading}>
        {signed}
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}
