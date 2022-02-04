import React from 'react';

/**
 * RegistrationErrors
 * @description Creates a sequence of paragraph errors based on errors state.
 * @param {array[String]} errors a list of active error messages handled by state.
 * @returns {<p>} a sequence of error messages.
 */
const RegistrationErrors = ({ errors }) => {
  return (
    <>
      {errors.map((error, index) => {
        return (
          <p className='error' key={index}>
            {error}
          </p>
        );
      })}
    </>
  );
};

export default RegistrationErrors;
