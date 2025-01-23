import React, { useState } from "react";

const Predict = () => {
  // State to store the input values
  const [formData, setFormData] = useState({
    age: "",
    marriageStatus: "", // Set default to an empty string
    weight: "",
    bmi: "",
    follicleNoR: "",
    follicleNoL: "",
    amh: "",
    regularCycle: "", // Set default to an empty string
    cycleLength: "",
    skinDarkening: "",
    hairGrowth: "",
    weightGain: "",
    fastFood: "",
    pimples: "",
  });

  // State to handle error messages
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Convert lifestyle choice to float (non, mild, heavy, severe)
  const convertLifestyleToFloat = (value) => {
    switch (value) {
      case "non":
        return 0.0;
      case "mild":
        return 0.5;
      case "heavy":
        return 1.0;
      case "severe":
        return 1.5;
      default:
        return 0.0;
    }
  };

  // Convert hair growth to float (No = 0, Yes = 1)
  const convertHairGrowthToFloat = (value) => {
    return value === "Yes" ? 1.0 : 0.0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled correctly
    let validationErrors = [];
    let missingFields = [];
    for (const key in formData) {
      if (formData[key] === "") {
        missingFields.push(key);
      }
      const numValue = parseFloat(formData[key]);
      if (
        ["age", "weight", "bmi", "follicleNoR", "follicleNoL", "amh", "cycleLength", "weightGain"].includes(key)
      ) {
        if (isNaN(numValue) || numValue < 0) {
          validationErrors.push(`${key} must be a valid non-negative number.`);
        }
      }
    }

    if (validationErrors.length > 0) {
      setError(validationErrors.join(" "));
      return;
    }

    if (missingFields.length > 0) {
      setError(`Please fill the following fields: ${missingFields.join(", ")}`);
      return;
    }

    // Manually parse form data values as floats, even for integers
    const dataToSend = {
      age: formData.age ? parseFloat(formData.age).toFixed(1) : 0.0, // Force float even if input is an integer
      marriageStatus: formData.marriageStatus === "Yes" ? 1.0 : 0.0,
      weight: parseFloat(formData.weight).toFixed(1), // Ensure weight is a float
      bmi: parseFloat(formData.bmi).toFixed(1), // Ensure bmi is a float
      follicleNoR: parseFloat(formData.follicleNoR).toFixed(1), // Ensure follicleNoR is a float
      follicleNoL: parseFloat(formData.follicleNoL).toFixed(1), // Ensure follicleNoL is a float
      amh: parseFloat(formData.amh).toFixed(1), // Ensure amh is a float
      regularCycle: formData.regularCycle === "Yes" ? 1.0 : 0.0,
      cycleLength: parseFloat(formData.cycleLength).toFixed(1), // Ensure cycleLength is a float
      skinDarkening: parseFloat(formData.skinDarkening).toFixed(1), // Ensure skinDarkening is a float
      hairGrowth: convertHairGrowthToFloat(formData.hairGrowth),
      weightGain: parseFloat(formData.weightGain).toFixed(1), // Ensure weightGain is a float
      fastFood: convertLifestyleToFloat(formData.fastFood),
      pimples: convertLifestyleToFloat(formData.pimples),
    };

    // Log the request body for debugging
    console.log("Request Body (before sending to backend):", dataToSend);
    console.log("JSON Stringified Request Body:", JSON.stringify(dataToSend));

    // Send the data to the backend
    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      
      // Log the response for debugging
      console.log("Response from backend:", result);

      // Display the response below the form
      if (result.atRisk) {
        setResponse(<p style={{ color: "red" }}>The patient is at risk.</p>);
      } else {
        setResponse(<p style={{ color: "green" }}>The patient is not at risk.</p>);
      }

      // Clear error message after response
      setError("");
    } catch (err) {
      setError("Failed to submit the data.");
    }
  };

  return (
    <div>
      <h1>Patient Risk Prediction</h1>
      
      {/* Show errors if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Show response from the backend */}
      {response}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Age (in years):</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>

        <div>
          <label>Marriage Status (Yes/No):</label>
          <select name="marriageStatus" value={formData.marriageStatus} onChange={handleChange}>
            <option value="">Select</option> {/* Default option */}
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label>Weight (in kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>

        <div>
          <label>BMI:</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>

        <div>
          <label>Follicle Count (Right):</label>
          <input
            type="number"
            name="follicleNoR"
            value={formData.follicleNoR}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>

        <div>
          <label>Follicle Count (Left):</label>
          <input
            type="number"
            name="follicleNoL"
            value={formData.follicleNoL}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>

        <div>
          <label>AMH:</label>
          <input
            type="number"
            name="amh"
            value={formData.amh}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>

        <div>
          <label>Regular Cycle (Yes/No):</label>
          <select name="regularCycle" value={formData.regularCycle} onChange={handleChange}>
            <option value="">Select</option> {/* Default option */}
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label>Cycle Length (in days):</label>
          <input
            type="number"
            name="cycleLength"
            value={formData.cycleLength}
            onChange={handleChange}
            step="1"
            required
          />
        </div>

        <div>
          <label>Skin Darkening (0-1):</label>
          <input
            type="number"
            name="skinDarkening"
            value={formData.skinDarkening}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="1"
            required
          />
        </div>

        <div>
          <label>Hair Growth (Yes/No):</label>
          <select name="hairGrowth" value={formData.hairGrowth} onChange={handleChange}>
            <option value="">Select</option> {/* Default option */}
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label>Weight Gain (in kg):</label>
          <input
            type="number"
            name="weightGain"
            value={formData.weightGain}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>

        <div>
          <label>Fast Food Intake:</label>
          <select name="fastFood" value={formData.fastFood} onChange={handleChange}>
            <option value="non">Non</option>
            <option value="mild">Mild</option>
            <option value="heavy">Heavy</option>
            <option value="severe">Severe</option>
          </select>
        </div>

        <div>
          <label>Pimples:</label>
          <select name="pimples" value={formData.pimples} onChange={handleChange}>
            <option value="non">Non</option>
            <option value="mild">Mild</option>
            <option value="heavy">Heavy</option>
            <option value="severe">Severe</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Predict;
