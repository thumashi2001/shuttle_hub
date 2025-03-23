import React, { useRef, useState, useContext } from 'react';
import emailjs from '@emailjs/browser';
import './ContactAdmin.css';
import { AuthContext } from '../../../Context/AuthContext';

function ContactAdmin() {
  const form = useRef();
  const { user } = useContext(AuthContext);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_cb99dmt', 'template_hae3dh8', form.current, {
        publicKey: 'SYjeI94bKxx6e628N',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <div className="contact-form-container">
      <h1>Contact Admin Page</h1>

      <div className="contact-form">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input
            type="text"
            name="user_name"
            value={user.userName}
            readOnly

          />

          <label>Email</label>
          <input
            type="email"
            name="user_email"
            value={user.email}
            readOnly
          />

          <label>Message</label>
          <textarea name="message" required /><br /><br />

          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactAdmin;
