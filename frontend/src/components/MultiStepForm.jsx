import React, { useState } from 'react';
import axios from 'axios';

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    marriageStatus: '1.0', // default to 'Yes'
    weight: '',
    bmi: '',
    follicleNoR: '',
    follicleNoL: '',
    amh: '',
    regularCycle: '1.0', // default to 'Regular'
    cycleLength: '',
    skinDarkeningNeck: '',
    skinDarkeningArmpits: '',
    skinDarkeningGroin: '',
    hairGrowth: '',
    weightGain: '',
    fastFood: '',
    pimples: '',
  });

  const [currentStep, setCurrentStep] = useState(1); // Track current step
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState(null);

  const steps = [
    'Basic Information',
    'Medical Parameters',
    'Symptoms',
    'Confirmation & Submit',
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Move to the next step
  const nextStep = () => {
    setError('');
    setCurrentStep((prev) => prev + 1);
  };

  // Move to the previous step
  const prevStep = () => {
    setError('');
    setCurrentStep((prev) => prev - 1);
  };

  // Validate current step fields
  const validateStep = () => {
    const requiredFields = {
      1: ['age', 'marriageStatus', 'weight', 'bmi'],
      2: ['follicleNoR', 'follicleNoL', 'amh', 'regularCycle'],
      3: [
        'skinDarkeningNeck',
        'skinDarkeningArmpits',
        'skinDarkeningGroin',
        'hairGrowth',
        'weightGain',
        'fastFood',
        'pimples',
      ],
    };

    for (const field of requiredFields[currentStep]) {
      if (formData[field] === '') {
        return `${field.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    }

    return null;
  };

  // Handle next button click
  const handleNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    nextStep();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/', {
        ...formData,
        marriageStatus: parseFloat(formData.marriageStatus),
        hairGrowth: parseFloat(formData.hairGrowth),
        weight: parseFloat(formData.weight),
        bmi: parseFloat(formData.bmi),
        follicleNoR: parseFloat(formData.follicleNoR),
        follicleNoL: parseFloat(formData.follicleNoL),
        amh: parseFloat(formData.amh),
        cycleLength: parseFloat(formData.cycleLength),
        weightGain: parseFloat(formData.weightGain),
        fastFood: parseFloat(formData.fastFood),
        pimples: parseFloat(formData.pimples),
        skinDarkening: {
          neck: formData.skinDarkeningNeck,
          armpits: formData.skinDarkeningArmpits,
          groin: formData.skinDarkeningGroin,
        },
      });

      setPrediction(response.data.atRisk);
    } catch (err) {
      setError('Something went wrong! Please try again.');
    }
  };

  // Render form fields for the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1: // Step 1: Basic Information
        return (
          <>
            <h2>Step 1: {steps[0]}</h2>
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
          </>
        );
      case 2: // Step 2: Medical Parameters
        return (
          <>
            <h2>Step 2: {steps[1]}</h2>
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
          </>
        );
      case 3: // Step 3: Symptoms
        return (
          <>
            <h2>Step 3: {steps[2]}</h2>
            <label>Skin Darkening (Neck)</label>
            <select
              name="skinDarkeningNeck"
              value={formData.skinDarkeningNeck}
              onChange={handleChange}
            >
              <option value="">Select Severity</option>
              <option value="None">None</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
            {/* Repeat for other fields like hair growth */}
          </>
        );
      case 4: // Step 4: Confirmation
        return (
          <>
            <h2>Step 4: {steps[3]}</h2>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <button type="submit">Submit</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderStep()}

        {error && <div className="error">{error}</div>}

        <div className="navigation-buttons">
          {currentStep > 1 && <button type="button" onClick={prevStep}>Back</button>}
          {currentStep < 4 && <button type="button" onClick={handleNext}>Next</button>}
        </div>
      </form>

      {prediction !== null && <div>Prediction: {prediction ? 'At Risk' : 'Not At Risk'}</div>}
    </div>
  );
};

export default MultiStepForm;
