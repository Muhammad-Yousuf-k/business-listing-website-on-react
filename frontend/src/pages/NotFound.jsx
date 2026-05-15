import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-secondary">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-6xl font-bold text-accent">404</h1>
        <p className="text-xl text-black mb-4">Oops! The page you're looking for does not exist.</p>
        <Link to="/" className="text-lg text-primary hover:underline">Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;