import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h2>I am page component</h2>
      <p>{children}</p>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
