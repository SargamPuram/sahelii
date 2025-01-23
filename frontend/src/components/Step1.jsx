import React from 'react';

const Step1 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Step 1: Basic Information</h2>
      <label>Age</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        min="0"
        step="any"
        required
      />
      <label>Marriage Status</label>
      <select
        name="marriageStatus"
        value={formData.marriageStatus}
        onChange={handleChange}
      >
        <option value="1.0">Yes</option>
        <option value="0.0">No</option>
      </select>
      <label>Weight (kg)</label>
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        min="0"
        step="any"
        required
      />
      <label>BMI</label>
      <input
        type="number"
        name="bmi"
        value={formData.bmi}
        onChange={handleChange}
        min="0"
        step="any"
        required
      />
    </div>
  );
};

export default Step1;
