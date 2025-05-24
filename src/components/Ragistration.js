import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const countryCityMap = {
  India: ['Delhi', 'Mumbai', 'Jaipur'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
};

const regex = {
  name: /^[A-Za-z]{2,}$/,
  username: /^[a-zA-Z0-9_]{3,16}$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phoneCode: /^\+?[0-9]{1,4}$/,
  phone: /^[0-9]{7,15}$/,
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  aadhar: /^[0-9]{12}$/,
};

export default function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '',
    phoneCode: '', phoneNumber: '', country: '', city: '', pan: '', aadhar: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);

  const validate = () => {
  const errs = {};

  if (!formData.firstName.trim()) {
    errs.firstName = 'First name is required';
  } else if (!regex.name.test(formData.firstName)) {
    errs.firstName = 'Invalid first name';
  }

  if (!formData.lastName.trim()) {
    errs.lastName = 'Last name is required';
  } else if (!regex.name.test(formData.lastName)) {
    errs.lastName = 'Invalid last name';
  }

  if (!formData.username.trim()) {
    errs.username = 'Username is required';
  } else if (!regex.username.test(formData.username)) {
    errs.username = 'Invalid username';
  }

  if (!formData.email.trim()) {
    errs.email = 'Email is required';
  } else if (!regex.email.test(formData.email)) {
    errs.email = 'Invalid email';
  }

  if (!formData.password) {
    errs.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errs.password = 'Password too short';
  }

  if (!formData.phoneCode.trim()) {
    errs.phoneCode = 'Country code is required';
  } else if (!regex.phoneCode.test(formData.phoneCode)) {
    errs.phoneCode = 'Invalid country code';
  }

  if (!formData.phoneNumber.trim()) {
    errs.phoneNumber = 'Phone number is required';
  } else if (!regex.phone.test(formData.phoneNumber)) {
    errs.phoneNumber = 'Invalid phone number';
  }

  if (!formData.country) {
    errs.country = 'Country is required';
  }

  if (!formData.city) {
    errs.city = 'City is required';
  }

  if (!formData.pan.trim()) {
    errs.pan = 'PAN number is required';
  } else if (!regex.pan.test(formData.pan)) {
    errs.pan = 'Invalid PAN number';
  }

  if (!formData.aadhar.trim()) {
    errs.aadhar = 'Aadhar number is required';
  } else if (!regex.aadhar.test(formData.aadhar)) {
    errs.aadhar = 'Invalid Aadhar number';
  }

  setErrors(errs);
  setIsFormValid(Object.keys(errs).length === 0);
};



  useEffect(() => {
    validate();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/success', { state: formData });
    }
  };

  return (
    <div>
    <h2 className="form-heading">Registration Form</h2>
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group">
          <label>First Name <span className="required-asterisk">*</span></label>
          <input placeholder="Enter your first name" value={formData.firstName}
            onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label>Last Name <span className="required-asterisk">*</span></label>
          <input placeholder="Enter your last name" value={formData.lastName}
            onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
      </div>

      <div className="form-group">
        <label>Username <span className="required-asterisk">*</span></label>
        <input placeholder="Choose a unique username" value={formData.username}
          onChange={e => setFormData({ ...formData, username: e.target.value })} />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>

      <div className="form-group">
        <label>Email Address <span className="required-asterisk">*</span></label>
        <input placeholder="Enter your email address" value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group password-group">
  <label>Password <span className="required-asterisk">*</span></label>
  <div className="password-wrapper">
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="Create a strong password"
      value={formData.password}
      onChange={e => setFormData({ ...formData, password: e.target.value })}
    />
  </div>
  {errors.password && <p className="error">{errors.password}</p>}
</div>


<div className="row">
  <div className="form-group">
    <label>Phone Number <span className="required-asterisk">*</span></label>
    <div className="phone-input">
      <div className="input-wrapper">
        <input
          placeholder="+91"
          value={formData.phoneCode}
          onChange={e => setFormData({ ...formData, phoneCode: e.target.value })}
          className={errors.phoneCode ? 'error-border' : ''}
        />
        {errors.phoneCode && <p className="error">{errors.phoneCode}</p>}
      </div>
      <div className="input-wrapper">
        <input
          placeholder="1234567890"
          value={formData.phoneNumber}
          onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
          className={errors.phoneNumber ? 'error-border' : ''}
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      </div>
    </div>
  </div>
</div>


      <div className="row">
        <div className="form-group">
          <label>Country <span className="required-asterisk">*</span></label>
          <select value={formData.country}
            onChange={e => {
              const country = e.target.value;
              setFormData({ ...formData, country, city: '' });
              setCityOptions(countryCityMap[country] || []);
            }}>
            <option value="">Select your country</option>
            {Object.keys(countryCityMap).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <div className="form-group">
          <label>City <span className="required-asterisk">*</span></label>
          <select
            value={formData.city}
            onChange={e => setFormData({ ...formData, city: e.target.value })}
            disabled={!formData.country}>
            <option value="">Select your city</option>
            {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <label>PAN Number <span className="required-asterisk">*</span></label>
          <input placeholder="ABCDE1234F" value={formData.pan}
            onChange={e => setFormData({ ...formData, pan: e.target.value })} />
          {errors.pan && <p className="error">{errors.pan}</p>}
        </div>

        <div className="form-group">
          <label>Aadhar Number <span className="required-asterisk">*</span></label>
          <input placeholder="123456789012" value={formData.aadhar}
            onChange={e => setFormData({ ...formData, aadhar: e.target.value })} />
          {errors.aadhar && <p className="error">{errors.aadhar}</p>}
        </div>
      </div>

      <button type="submit" disabled={!isFormValid}>Submit</button>
    </form>
    </div>
  );
}







































































