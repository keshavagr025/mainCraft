import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    let missingFields: string[] = [];

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      missingFields.push('Name');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      missingFields.push('Email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      missingFields.push('Message');
    }

    setErrors(newErrors);

    if (missingFields.length > 0) {
      const msg = `Validation Error: Please fill out the missing fields (${missingFields.join(', ')}).`;
      setAlertMsg(msg);
      setShowAlert(true);
      // Trigger standard browser alert as required
      alert(msg);
      return false;
    }

    if (Object.keys(newErrors).length > 0) {
      // If there are other errors like invalid email
      const msg = 'Validation Error: Please correct the invalid input fields.';
      setAlertMsg(msg);
      setShowAlert(true);
      alert(msg);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(false);

    if (validateForm()) {
      // Save form data to LocalStorage
      const newSubmission = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        timestamp: new Date().toISOString()
      };
      
      try {
        const stored = localStorage.getItem('contact_submissions');
        const submissions = stored ? JSON.parse(stored) : [];
        submissions.unshift(newSubmission);
        localStorage.setItem('contact_submissions', JSON.stringify(submissions));
      } catch (err) {
        console.error('Failed to save submission to localStorage:', err);
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section className="contact-section">
      <div className="section">
        {/* Contact Header */}
        <div className="section-header">
          <span className="section-tag">Get in Touch</span>
          <h1 className="section-title">Let's Connect</h1>
          <p className="section-desc">
            Have questions about MainCrafts, visual compilation engines, or custom enterprise solutions? Drop us a message.
          </p>
        </div>

        {/* Custom Validation Alert Banner */}
        {showAlert && (
          <div className="contact-alert glass">
            <AlertCircle className="alert-icon" size={20} />
            <div className="alert-content">
              <h4>Missing or Invalid Inputs</h4>
              <p>{alertMsg}</p>
            </div>
            <button className="alert-close" onClick={() => setShowAlert(false)}>&times;</button>
          </div>
        )}

        {/* Success Banner */}
        {isSubmitted && (
          <div className="contact-success-toast glass">
            <CheckCircle2 className="success-icon" size={24} />
            <div>
              <h3>Message Transmitted Successfully!</h3>
              <p>We will process your query and reply within 12 standard business hours.</p>
            </div>
          </div>
        )}

        <div className="contact-grid">
          {/* Left: Contact Info Column */}
          <div className="contact-info glass">
            <div className="info-glow"></div>
            <h3>Contact Information</h3>
            <p className="info-intro">Reach out to us directly or follow our developer branches on social channels.</p>

            <div className="info-details-list">
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="info-label">Send an Email</span>
                  <a href="mailto:support@maincrafts.com" className="info-val">support@maincrafts.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="info-label">Call Support</span>
                  <span className="info-val">+1 (555) 389-2041</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="info-label">Headquarters</span>
                  <span className="info-val">100 Pine Street, San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div className="contact-social-grid">
              <h4>Developer Feeds</h4>
              <div className="social-pills">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-pill">GitHub</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-pill">Twitter</a>
                <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="social-pill">Slack Workspace</a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form Column */}
          <div className="contact-form-container glass">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="contact-name">Full Name <span className="required-star">*</span></label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Your Name"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address <span className="required-star">*</span></label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="name@company.com"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Your Message <span className="required-star">*</span></label>
                <div className="textarea-wrapper">
                  <MessageSquare className="textarea-icon" size={16} />
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Describe your project, question, or integration request..."
                    className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary form-submit-btn">
                Send Message
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
