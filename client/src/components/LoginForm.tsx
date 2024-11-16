import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { Alert, Button } from 'react-bootstrap';

interface LoginProps {
  handleModalClose: () => void;
}

const Login: React.FC<LoginProps> = ({ handleModalClose }) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Handle form input change
  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoginError(null); // Reset login error

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      if (data?.login?.token) {
        // Successfully logged in, store token
        Auth.login(data.login.token);
        handleModalClose(); // Close the modal upon successful login
      } else {
        setLoginError("Invalid credentials. Please check your email and password.");
      }
    } catch (e) {
      console.error(e);
      setLoginError("An error occurred during login. Please try again.");
    }

    // Clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {loginError && (
              <Alert variant="danger" className="mt-3">
                {loginError}
              </Alert>
            )}

            {error && (
              <Alert variant="danger" className="mt-3">
                {error.message || "An error occurred during login."}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
