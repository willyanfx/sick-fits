import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { input, handleChange, resetForm, clearForm } = useForm({});
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset
      // aria-busy
      // disabled={false}
      >
        <label htmlFor="file">
          Image
          <input
            type="file"
            id="image"
            name="image"
            value={input.file}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={input.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="price">
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
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={input.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
