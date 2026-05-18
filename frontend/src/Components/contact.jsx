import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  return (
    <div className="container py-4" style={{ maxHeight: '85vh', overflowY: 'hidden' }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4" style={{ color: '#800000' }}>Contact Us</h2>
              
              {status === 'success' && (
                <div className="alert alert-success">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              {status === 'error' && (
                <div className="alert alert-danger">
                  Something went wrong. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject of your message"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Your message"
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={status === 'sending'}
                    style={{ backgroundColor: '#800000', borderColor: '#800000' }}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>
                </div>
              </form>

              <div className="row mt-4 pt-4 border-top text-center">
                <div className="col-sm-4">
                  <div className="mb-4">
                    <i className="fas fa-map-marker-alt fa-2x text-primary mb-2" style={{ color: '#800000 !important' }}></i>
                    <h6 className="mt-2">Our Location</h6>
                    <p className="text-muted small"> Utraula Road, Gonda,271002 (Uttar Pradesh)</p>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-4">
                    <i className="fas fa-phone fa-2x text-primary mb-2" style={{ color: '#800000 !important' }}></i>
                    <h6 className="mt-2">Phone Number</h6>
                    <p className="text-muted small">+91 1234567890</p>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="mb-4">
                    <i className="fas fa-envelope fa-2x text-primary mb-2" style={{ color: '#800000 !important' }}></i>
                    <h6 className="mt-2">Email Address</h6>
                    <p className="text-muted small">support@smartcanteen.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;