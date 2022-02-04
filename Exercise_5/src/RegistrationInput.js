import React from 'react';
import { Fragment } from 'react';

/**
 * Form
 * @description All inputs necessary user registration. Updates newUser state with input.
 * @param {obj} newUser object with properties such as fullName to represent our unregistered user.
 * @param {function} setNewUser setter for our newUser.
 * @param {string} formID identifier for form input and submission.
 * @returns {<table>} form inputs.
 */
const Form = ({ newUser, setNewUser, formID }) => {
  // Change handler for inputs
  const handleChange = (name, value) => {
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <Fragment>
      <table>
        <tbody>
          {/* Full Name */}
          <tr>
            <td>Full Name</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input
                form={formID}
                id='fullName'
                name='fullName'
                value={newUser.fullName}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </td>
          </tr>

          {/* Phone Number and NPI */}
          <tr>
            <td>Phone Number:</td>
            <td>NPI:</td>
          </tr>
          <tr>
            <td>
              <input
                form={formID}
                id='phoneNumber'
                name='phoneNumber'
                value={newUser.phoneNumber}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </td>
            <td>
              <input
                form={formID}
                id='NPI'
                name='NPI'
                value={newUser.NPI}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </td>
          </tr>

          {/* Email */}
          <tr>
            <td>Email:</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input
                form={formID}
                id='email'
                name='email'
                value={newUser.email}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </td>
          </tr>

          {/* Street Address and City */}
          <tr>
            <td>Street Address:</td>
            <td>City:</td>
          </tr>
          <tr>
            <td>
              <input
                form={formID}
                id='street'
                name='street'
                value={newUser.street}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </td>
            <td>
              <input
                form={formID}
                id='city'
                name='city'
                value={newUser.city}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </td>
          </tr>

          {/* State and Postal Code */}
          <tr>
            <td>State:</td>
            <td>Postal Code:</td>
          </tr>
          <tr>
            <td>
              <input
                form={formID}
                id='state'
                name='state'
                value={newUser.state}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </td>
            <td>
              <input
                form={formID}
                id='postalCode'
                name='postalCode'
                value={newUser.postalCode}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default Form;
