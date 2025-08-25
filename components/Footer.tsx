import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 mt-12">
      <div className="container mx-auto py-4 px-5 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} All Right Received By WPS Sandaruwan BSC Hons IN Computer Science (NSBM Green University) , Sri Lanka.
        </p>
      </div>
    </footer>
  );
};

export default Footer;