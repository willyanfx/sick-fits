import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  return (
    <p>
      <SingleProduct id={query.id} />
    </p>
  );
}
