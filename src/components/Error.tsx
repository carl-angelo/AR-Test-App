import React from 'react';
import { useDispatch } from 'react-redux';
import { useError } from '../hooks/useError';
import { clearError } from '../slices/error';

const Error: React.FC<EmptyObject> = () => {

  const error = useError();
  const dispatch = useDispatch();

  if (!error.error) {
    return null;
  }

  return (
    <div className="error-container">
      <div className="error-wrapper"> 
        <div className="error-message">
          <span>{error.error?.code}</span> { error?.error.data.message }
        </div>
        <div className="error-close">
          <button onClick={() => dispatch(clearError())}>X</button>
        </div>
      </div>
    </div>
  );
};

export default Error;