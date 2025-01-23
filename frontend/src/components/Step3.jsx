import React from 'react';

const Step3 = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
      
        // Preventing negative values for relevant fields
        if ((name === 'hairGrowth' || name === 'weightGain') && value < 0) {
          return; // Do not update the value if it's negative
        }
      
        // Allow only numeric inputs for hairGrowth and other fields
        if (name === 'hairGrowth' && isNaN(value)) {
          return; // Prevent non-numeric inputs
        }
      
        // Update the form data with the new value
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      

  return (
    <div>
      <h2>Step 3: Symptoms</h2>

      <label>Skin Darkening (Neck)</label>
      <select
        name="skinDarkeningNeck"
        value={formData.skinDarkeningNeck}
        onChange={handleChange}
      >
        <option value="None">None</option>
        <option value="Mild">Mild</option>
        <option value="Moderate">Moderate</option>
        <option value="Severe">Severe</option>
      </select>

      <label>Skin Darkening (Armpits)</label>
      <select
        name="skinDarkeningArmpits"
        value={formData.skinDarkeningArmpits}
        onChange={handleChange}
      >
        <option value="None">None</option>
        <option value="Mild">Mild</option>
        <option value="Moderate">Moderate</option>
        <option value="Severe">Severe</option>
      </select>

      <label>Skin Darkening (Groin)</label>
      <select
        name="skinDarkeningGroin"
        value={formData.skinDarkeningGroin}
        onChange={handleChange}
      >
        <option value="None">None</option>
        <option value="Mild">Mild</option>
        <option value="Moderate">Moderate</option>
        <option value="Severe">Severe</option>
      </select>

      <label>Hair Growth</label>
      <input
        type="number"
        name="hairGrowth"
        value={formData.hairGrowth}
        onChange={handleChange}
        min="0"
        step="any"
      />
    </div>
  );
};

export default Step3;
