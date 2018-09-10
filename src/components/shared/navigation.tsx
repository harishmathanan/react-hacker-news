import * as React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <section className="navbar-section">
        <Link to="/" className="navbar-brand">Hacker News</Link>
        <Link to="/newest" className="btn btn-link">new</Link>
        <Link to="/comments" className="btn btn-link">comments</Link>
        <Link to="/show" className="btn btn-link">show</Link>
        <Link to="/ask" className="btn btn-link">ask</Link>
        <Link to="/jobs" className="btn btn-link">jobs</Link>
      </section>
    </nav>
  );
};

export default Navigation;
