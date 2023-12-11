import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>AI-Powered Process Builder Application</h1>
      <Link to="/create-process">Create a Process</Link>
    </div>
  );
}

export default Home;
