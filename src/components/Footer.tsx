import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-gray-800 text-white py-4 mt-12 w-full fixed bottom-0 left-0">
      <div className="text-center text-lg ">
        <p>© {currentYear} True Feedback | Made with Next.js | Auth.js</p>
      </div>
    </footer>
  );
};

export default Footer;
