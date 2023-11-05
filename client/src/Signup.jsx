import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setLoading(true); // Show loading indicator

    axios
      .post('http://localhost:3001/register', { name, email, password })
      .then((result) => {
        console.log(result);
        setLoading(false);
        navigate('/login');
      })
      .catch((err) => {
        setLoading(false);
        setError('Registration failed. Please check your input.');
        console.log(err);
      });
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <p>Already Have an Account</p>
        <Link to='/login' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;


// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom'

// function Signup() {
//   const [name, setName] = useState();
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const navigate=useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post('http://localhost:3001/register', { name, email, password })
//       .then((result) =>{console.log(result)})
//       navigate('/login')
//       .catch((err) => console.log(err));
//   }

//   return (
//     <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
//       <div className='bg-white p-3 rounded w-25'>
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name">
//               <strong>Name</strong>
//             </label>
//             <input
//               type="text"
//               id="name" // Added id attribute
//               placeholder="Enter Name"
//               autoComplete="off"
//               name="name" // Corrected name attribute
//               className="form-control rounded-0"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="email"
//               id="email" // Added id attribute
//               placeholder="Enter Email"
//               autoComplete="off"
//               name="email"
//               className="form-control rounded-0"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="password"
//               id="password" // Added id attribute
//               placeholder="Enter Password"
//               autoComplete="off"
//               name="password"
//               className="form-control rounded-0"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
//         </form>
//         <p>Already Have an Account</p>
//         <Link to='/login' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Signup;
