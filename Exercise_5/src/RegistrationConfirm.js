import React, { useState } from 'react';

// Error messages for each key of our new users
const errorMessages = {
  fullName: 'Invalid name format!',
  email: 'Invalid email format!',
  NPI: "Invalid NPI format! NPI's are 10 numeric digits.",
  postalCode: 'Invalid postal code! Postal codes must be 5 numeric digits.',
  phoneNumber:
    'Invalid phone number format! Phone numbers must be 10 numeric digits.',
  street: 'Invalid street format!',
  city: 'Invalid city format! Cities must be alphabetical.',
  state: 'Invalid state format! States must be alphabetical.',
};

// Conversions for required fields so we can tell the user what field is missing
const keyConversion = {
  fullName: 'Full name',
  email: 'Email',
  NPI: 'NPI',
  postalCode: 'Postal code',
  phoneNumber: 'Phone number',
  street: 'Street Address',
  city: 'City',
  state: 'State',
};

// Validation functions for strings

/**
 * isEmpty
 * @description Determines whether or not a string is empty with or without whitespace or null.
 * @returns {bool}
 */
const isEmpty = (str) => {
  if (str == null) {
    return true;
  }

  return /^\s*$/.test(str);
};

/**
 * isNumeric
 * @description Determines whether or not a string is numeric.
 * @returns {bool}
 */
const isNumeric = (str) => {
  return !isNaN(str);
};

/**
 * isAlphabetical
 * @description Determines whether or not a string is alphabetical.
 * @returns {bool}
 */
const isAlphabetical = (str) => {
  return /^[a-zA-Z]+$/.test(str);
};

/**
 * isAlphabeticalWithSpaces
 * @description Determines whether or not a string is alphabetical with spaces.
 * @returns {bool}
 */
const isAlphabeticalWithSpaces = (str) => {
  return /^[a-zA-Z\s]+$/.test(str);
};

/**
 * validateForm
 * @description Validates all form inputs, creates an array of error messages for invalid inputs.
 * @param {obj} user object with properties such as fullName to represent our unregistered user.
 * @param {function} setErrors setter for our error array.
 * @returns {bool} whether or not the form is in a valid state.
 */
const validateForm = (user, setErrors) => {
  var errors = [];

  for (var [key, value] of Object.entries(user)) {
    // Trim excess whitespace off the ends
    value = value.trim();

    if (isEmpty(value)) {
      // Missing input, tell the user
      errors.push(keyConversion[key] + ' is a required field.');
    } else {
      // Validate each data point
      switch (key) {
        case 'fullName':
          // Validate: Two or more alphabetic words separated by a space
          const names = value.split(' ');

          // Ensure that we at least have a first and last name
          if (names.length < 2) {
            errors.push(errorMessages[key]);
            break;
          }

          // Validate each name, ensure that it is alphabetical
          for (let i = 0; i < names.length; i++) {
            let name = names[i];
            if (!isAlphabetical(name)) {
              errors.push(errorMessages[key]);
              break;
            }
          }

          break;
        case 'email':
          // Validate: Non-empty, prefix @ domain
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            errors.push(errorMessages[key]);
          }

          break;
        case 'NPI':
          // Validate: 10 numeric digits
          if (value.length != 10 || !isNumeric(value)) {
            errors.push(errorMessages[key]);
          }

          break;
        case 'postalCode':
          // Validate: 5 numeric digits
          if (!isNumeric(value) || value.length != 5) {
            errors.push(errorMessages[key]);
          }

          break;
        case 'phoneNumber':
          // Fisrt, trim '(', ')', ' ', and '-'
          value = value.replace(/[-)( ]/g, '');

          // Validate: 10 numeric digits
          if (!isNumeric(value) || value.length != 10) {
            errors.push(errorMessages[key]);
          }

          break;
        case 'street':
          // Validate: Alphanumerical with spaces
          // TODO: Use some API to determine whether or not the user's address is valid
          if (!/^[0-9a-zA-Z.\s]+$/.test(value)) {
            errors.push(errorMessages[key]);
          }

          break;
        case 'city':
        case 'state':
          // Validate: Alphabetical with spaces
          if (!isAlphabeticalWithSpaces(value)) {
            errors.push(errorMessages[key]);
          }

          break;
      }
    }
  }

  // Count errors and update state
  const errorCount = errors.length;
  setErrors(errors);

  // Determine form validity
  if (errorCount > 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * RegistrationConfirm
 * @description A confirm button that first looks for form validity and updates error messages.
 * @param {string} formID identifier for form input and submission.
 * @param {obj} newUser object with properties such as fullName to represent our unregistered user.
 * @param {function} setErrors setter for our list of errors.
 * @returns {<button>} sign up button.
 */
const RegistrationConfirm = ({ formID, newUser, setErrors }) => {
  // Handle form submission
  const submit = (event) => {
    event.preventDefault();

    // Attempt to pass validation
    const validForm = validateForm(newUser, setErrors);
    if (validForm) {
      // We passed validation, organize export data
      const user = {
        fullName: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        NPI: newUser.NPI,
        address: [
          newUser.street,
          newUser.city,
          newUser.state,
          newUser.postalCode,
        ].join(' '),
      };

      // Log export data
      console.log(user);
      alert('Form successfully submitted. Export data outputted via console');
    }
  };

  // Create submit button
  return (
    <button className='sign-up' type='button' form={formID} onClick={submit}>
      Register
    </button>
  );
};

export default RegistrationConfirm;
