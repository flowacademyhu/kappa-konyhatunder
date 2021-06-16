import React from 'react';
import { useField, ErrorMessage } from 'formik';

const InputGroup = (props) => {
  const [field, meta] = useField(props);
  const { label, name, type } = props;

  return (
    <div className="form-group mt-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        className={`form-control ${
          meta.error && meta.touched ? 'is-invalid' : ''
        }`}
        {...field}
        type={type}
      />

      <ErrorMessage component="div" name={name} className="invalid-feedback" />
    </div>
  );
};

export default InputGroup;
