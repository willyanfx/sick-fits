import { useState } from 'react';

export default function useForm(initial = {}) {
  const [input, setInput] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setInput({
      ...input,
      [name]: value,
    });
  }

  function resetForm() {
    setInput(initial);
  }

  function clearForm() {
    const blankState = Object.entries(input).map(([key, value]) => [key, '']);
    setInput(Object.fromEntries(blankState));
  }

  return { input, handleChange, resetForm, clearForm };
}
