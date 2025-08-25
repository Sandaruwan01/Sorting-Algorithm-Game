import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    // This is a mock initialization. Replace with your actual public key from EmailJS.
    emailjs.init({ publicKey: 'YOUR_PUBLIC_KEY' });
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('sending');

    // These are mock IDs. Replace with your actual Service ID and Template ID from EmailJS.
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current)
      .then(() => {
        setStatus('success');
        form.current?.reset();
      }, (error) => {
        setStatus('error');
        console.error('FAILED...', error);
      });
  };


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">Contact Us</h1>
        <p className="text-center text-gray-300 mb-8">Have questions, feedback, or suggestions? We'd love to hear from you!</p>
        
        {status === 'success' && (
          <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg text-center mb-6">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Thank you for your message! We'll get back to you soon.</span>
          </div>
        )}

        {status === 'error' && (
           <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center mb-6">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> Something went wrong. Please try again later.</span>
          </div>
        )}

        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-4">
            <label htmlFor="user_name" className="block text-gray-300 mb-2">Name</label>
            <input type="text" id="user_name" name="user_name" required className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="user_email" className="block text-gray-300 mb-2">Email</label>
            <input type="email" id="user_email" name="user_email" required className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
            <textarea id="message" name="message" required rows={5} className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
          </div>
          {/* Hidden input to specify the recipient email in the template if needed */}
          <input type="hidden" name="to_email" value="wps.sandaruwanofficial@gmail.com" />

          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
            Note: This is a mock form. To enable sending, replace placeholder IDs in the code with your own from a service like EmailJS.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;