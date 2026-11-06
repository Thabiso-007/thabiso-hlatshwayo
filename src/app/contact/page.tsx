'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from 'react-icons/fi';
import { CONTACT_EMAIL, CONTACT_LIMITS, CONTACT_MAILTO } from '@/lib/contact';
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/profile';

const emptyForm = { name: '', email: '', subject: '', message: '', website: '' };
const defaultError = 'Unable to send your message. Please try again or email me directly.';

const questions = [
  {
    question: 'What’s your typical response time?',
    answer:
      'I usually respond to emails within 24–48 hours. For urgent matters, feel free to mention it in your subject line.',
  },
  {
    question: 'Do you work on small projects?',
    answer:
      'Absolutely. I enjoy projects of all sizes, from landing pages to complex web applications.',
  },
  {
    question: 'What technologies do you work with?',
    answer:
      'I work across JavaScript, TypeScript, Python and Java, alongside frontend, backend, DevOps and AWS technologies.',
  },
  {
    question: 'Are you available for remote work?',
    answer: 'Yes. I’m comfortable collaborating remotely with teams and clients around the world.',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState(defaultError);

  const fallbackBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
  const fallbackMailto = `${CONTACT_MAILTO}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(fallbackBody)}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus === 'success') setSubmitStatus('idle');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        // Allow time for the SMTP connection and the server's 30-second function limit.
        signal: AbortSignal.timeout(35_000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) {
        setErrorMessage(typeof result?.error === 'string' ? result.error : defaultError);
        setSubmitStatus('error');
        return;
      }
      setSubmitStatus('success');
      setFormData(emptyForm);
    } catch {
      setErrorMessage(defaultError);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-content" className="interior-page contact-page">
      <div className="shell">
        <header className="page-heading">
          <p className="eyebrow">
            <span className="section-number">03 /</span> GET IN TOUCH
          </p>
          <div className="page-heading__row">
            <h1>
              Good things start <span>with a hello.</span>
            </h1>
            <p>
              Have a project, an opportunity, or just a question? I&apos;d love to hear what&apos;s
              on your mind.
            </p>
          </div>
        </header>
        <div className="contact-layout">
          <div className="contact-details">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> LET&apos;S CONNECT
            </p>
            <h2>Let&apos;s make something meaningful.</h2>
            <p className="contact-details__intro">
              Whether you&apos;re looking to collaborate or simply want to say hello, there&apos;s a
              place for your message here.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <span className="contact-method__icon">
                  <FiMail aria-hidden="true" />
                </span>
                <div>
                  <h3>Email</h3>
                  <p className="contact-method__email">{CONTACT_EMAIL}</p>
                  <a href={CONTACT_MAILTO} className="text-link">
                    Send me an email <FiArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="contact-method">
                <span className="contact-method__icon">
                  <FiMapPin aria-hidden="true" />
                </span>
                <div>
                  <h3>Location</h3>
                  <p>Johannesburg, South Africa</p>
                  <p>Open to remote work worldwide</p>
                </div>
              </div>
            </div>
            <div className="contact-socials">
              <span>FIND ME ONLINE</span>
              <div>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <FiGithub aria-hidden="true" /> GitHub <FiArrowUpRight aria-hidden="true" />
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <FiLinkedin aria-hidden="true" /> LinkedIn <FiArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <div className="contact-form-card">
            <div className="contact-form-card__heading">
              <div>
                <p className="eyebrow">THE DETAILS</p>
                <h2>
                  Send me a message<span>.</span>
                </h2>
              </div>
              <span aria-hidden="true">
                <FiArrowUpRight />
              </span>
            </div>
            <p className="contact-form-card__intro">
              Tell me a little about what you have in mind.
            </p>
            <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
              <fieldset disabled={isSubmitting} className="contact-fields">
                <div className="visually-hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this field empty</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      maxLength={CONTACT_LIMITS.name}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      maxLength={CONTACT_LIMITS.email}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    maxLength={CONTACT_LIMITS.subject}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>
                <div className="field">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    maxLength={CONTACT_LIMITS.message}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>
                {submitStatus === 'success' && (
                  <div role="status" className="form-feedback form-feedback--success">
                    Thank you! Your message has been submitted. I&apos;ll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div role="alert" className="form-feedback form-feedback--error">
                    <p>{errorMessage}</p>
                    <a href={fallbackMailto}>Send this message using your email app</a>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button--primary contact-submit"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}{' '}
                  {!isSubmitting && <FiArrowRight aria-hidden="true" />}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
        <section className="faq-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="section-number">A FEW ANSWERS /</span> FAQ
              </p>
              <h2>
                Good to <span>know.</span>
              </h2>
            </div>
            <p>A little more information before we start a conversation.</p>
          </div>
          <div className="faq-grid">
            {questions.map((item, index) => (
              <article className="faq-item" key={item.question}>
                <span>0{index + 1} /</span>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
