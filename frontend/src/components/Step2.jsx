import React from 'react';

const Step2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Step 2: Medical Parameters</h2>
      <label>Follicle Number (Right Ovary)</label>
      <input
        type="number"
        name="follicleNoR"
        value={formData.follicleNoR}
        onChange={handleChange}
        min="0"
        step="any"
        required
      />
      <label>Follicle Number (Left Ovary)</label>
      <input
        type="number"
        name="follicleNoL"
        value={formData.follicleNoL}
        onChange={handleChange}
        min="0"
        step="any"
        required
      />
      <label>AMH (ng/mL)</label>
      <input
        type="number"
        name="amh"
        value={formData.amh}
        onChange={handleChange}
        min="0"
        step="any"
        required
      />
      <label>Regular Cycle</label>
      <select
        name="regularCycle"
        value={formData.regularCycle}
        onChange={handleChange}
      >
        <option value="1.0">Regular</option>
        <option value="0.0">Irregular</option>
      </select>
    </div>
  );
};

export default Step2;
