import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { input, handleChange, resetForm, clearForm } = useForm({});

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={input.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="price"
          value={input.price}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
