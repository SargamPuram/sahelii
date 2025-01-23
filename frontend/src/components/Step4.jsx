import React from 'react';

const Step4 = ({ formData, handleSubmit, prevStep }) => {
  return (
    <div>
      <h2>Step 4: Confirmation & Submit</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <div className="navigation-buttons">
        <button type="submit">Submit</button>
      </div>
    </div>
  );
};

export default Step4;
