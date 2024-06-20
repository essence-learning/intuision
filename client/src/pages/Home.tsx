import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className="font-bold">intuision</h1>
      <p>"length" -lebron</p>
      <Link to="/book/apphysics1" className="text-blue-500 hover:underline">
      ap physics 1
      </Link>
      <br />
      <Link to="/book/lebron" className="text-blue-500 hover:underline">
      lebron read this textbook
      </Link>
    </div>
  );
};

export default Home;
