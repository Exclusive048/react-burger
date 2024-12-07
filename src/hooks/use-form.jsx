import { useState } from 'react'

export function useForm(inputValues={}) {
    const [form, setValue] = useState(inputValues);

    const onChange = (event) => {
      const {value, name} = event.target;
      setValue({...form, [name]: value});
    };
    return {form, onChange, setValue};
  }