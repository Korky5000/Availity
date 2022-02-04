/**
 * Coding exercise #5 for Availity's Fullstack Homework Assignment
 * @author Steven Lee / stevenmlee99@gmail.com
 *
 * Full disclosure, this is my first time ever using React. I am excited to see the many things
 * I am doing wrong!
 */

// Imports
import React, { Fragment, useState } from 'react';
import ReactDom from 'react-dom';
import RegistrationInput from './RegistrationInput';
import RegistrationConfirm from './RegistrationConfirm';
import RegistrationErrors from './RegistrationErrors';

// CSS
import './index.css';

/**
 * Registration
 * @description Complete registration form with submit button and error messages.
 */
const Registration = () => {
  const formID = 'submitNewUser';

  // Create a newUser state object to represent the user that is signing up
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    NPI: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
  });

  // Create an array of errors for front-end error messages
  const [errors, setErrors] = useState([]);

  return (
    <Fragment>
      <div className='registration'>
        <form id={formID}></form>
        <RegistrationInput
          newUser={newUser}
          setNewUser={setNewUser}
          formID={formID}
        />
        <RegistrationErrors errors={errors} />
        <RegistrationConfirm
          formID={formID}
          newUser={newUser}
          setErrors={setErrors}
        />
      </div>
    </Fragment>
  );
};

ReactDom.render(<Registration />, document.getElementById('root'));
