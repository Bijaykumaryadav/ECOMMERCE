import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '@/components/Common/form';
import { registerFormControls } from '@/config';

const initialState = {
  userName: '',
  email: '',
  password: '',
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);

  function onSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted:', formData);
    // Add your registration logic here
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link className="font-medium ml-2 text-primary hover:underline" to="/signin">
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData} // Pass formData to CommonForm
        setFormData={setFormData} // Pass setFormData to CommonForm
        onSubmit={onSubmit} // Pass onSubmit handler
        buttonText="Sign Up" // Set button text
      />
    </div>
  );
};

export default AuthRegister;
