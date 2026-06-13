import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Trash2, 
  Search, 
  Inbox, 
  AlertTriangle,
  ArrowLeft,
  Clock
} from 'lucide-react';
import type { PageType } from '../App';
import './Submissions.css';

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface SubmissionsProps {
  onNavigate: (page: PageType, hash?: string) => void;
}

export default function Submissions({ onNavigate }: SubmissionsProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('contact_submissions');
      if (stored) {
        setSubmissions(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load submissions from localStorage:', err);
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = submissions.filter(sub => sub.id !== id);
    setSubmissions(updated);
    try {
      localStorage.setItem('contact_submissions', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to update localStorage after deletion:', err);
    }
    setSelectedDeleteId(null);
  };

  const handleClearAll = () => {
    setSubmissions([]);
    try {
      localStorage.removeItem('contact_submissions');
    } catch (err) {
      console.error('Failed to clear localStorage submissions:', err);
    }
    setShowConfirmModal(false);
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const q = searchQuery.toLowerCase();
    return (
      sub.name.toLowerCase().includes(q) ||
      sub.email.toLowerCase().includes(q) ||
      sub.message.toLowerCase().includes(q)
    );
  });

  return (
    <section className="submissions-section">
      <div className="section">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Admin Portal</span>
          <h1 className="section-title">Form Submissions</h1>
          <p className="section-desc">
            Monitor client inquiries, integration requests, and messages transmitted via the contact portal.
          </p>
        </div>

        {/* Dashboard Actions Bar */}
        <div className="dashboard-controls glass">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or message contents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="controls-actions">
            {submissions.length > 0 && (
              <button 
                className="btn btn-secondary btn-clear-all"
                onClick={() => setShowConfirmModal(true)}
              >
                <Trash2 size={16} />
                Clear All
              </button>
            )}
            <button 
              className="btn btn-outline"
              onClick={() => onNavigate('contact')}
            >
              <ArrowLeft size={16} />
              Back to Form
            </button>
          </div>
        </div>

        {/* Submissions Container */}
        {filteredSubmissions.length === 0 ? (
          <div className="empty-state-card glass">
            <div className="empty-icon-wrapper">
              <Inbox size={48} className="empty-icon" />
            </div>
            <h3>
              {submissions.length === 0 
                ? 'No Submissions Yet' 
                : 'No Matching Records'}
            </h3>
            <p>
              {submissions.length === 0 
                ? 'Submissions sent through the contact form will appear here in real-time.' 
                : `No results matching "${searchQuery}" was found.`}
            </p>
            {submissions.length === 0 && (
              <button 
                className="btn btn-primary"
                onClick={() => onNavigate('contact')}
              >
                Go to Contact Form
              </button>
            )}
          </div>
        ) : (
          <div className="submissions-grid">
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="submission-card glass glass-hover">
                <div className="card-glow"></div>
                
                {/* Card Header Info */}
                <div className="submission-card-header">
                  <div className="user-info">
                    <div className="avatar">
                      <User size={18} />
                    </div>
                    <div>
                      <h4>{submission.name}</h4>
                      <a href={`mailto:${submission.email}`} className="email-link">
                        <Mail size={12} />
                        {submission.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="card-actions">
                    <div className="timestamp" title="Submission Time">
                      <Calendar size={14} />
                      <span>{formatDate(submission.timestamp)}</span>
                    </div>
                    <button 
                      className="btn-delete-card" 
                      onClick={() => setSelectedDeleteId(submission.id)}
                      title="Delete entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="submission-card-body">
                  <div className="message-header">
                    <MessageSquare size={14} />
                    <span>Message:</span>
                  </div>
                  <p className="message-content">{submission.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Clear All */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <div className="modal-icon-wrapper warning">
              <AlertTriangle size={32} />
            </div>
            <h2>Clear All Records?</h2>
            <p>
              This will permanently delete all <strong>{submissions.length}</strong> submission records. 
              This action cannot be undone.
            </p>
            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary btn-confirm-delete" onClick={handleClearAll}>
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Single Delete */}
      {selectedDeleteId !== null && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <div className="modal-icon-wrapper danger">
              <Clock size={32} />
            </div>
            <h2>Delete Submission?</h2>
            <p>
              Are you sure you want to remove this record from your system? This action is permanent.
            </p>
            <div className="modal-buttons">
              <button className="btn btn-secondary" onClick={() => setSelectedDeleteId(null)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary btn-confirm-delete" 
                onClick={() => handleDelete(selectedDeleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
