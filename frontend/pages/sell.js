import CreateProduct from '../components/Createproduct';
import PleaseSignIn from '../components/PleaseSignIn';

export default function SellPage() {
  return (
    <PleaseSignIn>
      <CreateProduct />
    </PleaseSignIn>
  );
}
