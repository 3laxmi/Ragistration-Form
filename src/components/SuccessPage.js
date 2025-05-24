import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Success() {
  const { state } = useLocation();

  return (
    <div className="form-container">
      <h2>Form Submission Successful!</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

