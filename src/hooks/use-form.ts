import { useState, ChangeEvent } from 'react';
import { TInputValues } from '../utils/types/hooks';

export function useForm(inputValues: TInputValues={}) {
    const [form, setValue] = useState(inputValues);
  
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValue({...form, [name]: value});
    };
    return {form, onChange, setValue};
  }