import { useState } from "react";

export function useForm<T>(inputValues: T) {
  const [form, setForm] = useState<T>(inputValues);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  return { form, onChange, setValue: setForm };
}
