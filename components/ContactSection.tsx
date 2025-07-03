

import React, { useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { contactSectionText, personalEmail, socialLinks } from '../constants';
import { EmailIcon } from './icons/EmailIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3D3A37] mb-8 sm:mb-10">
    <span className="pb-1 border-b-2 border-[#3D3A37]">{title}</span>
  </h2>
);

// --- START: Form Component Logic (inlined for simplicity) ---

const FormInput: React.FC<{ id: string, label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }> = ({ id, label, type = 'text', value, onChange, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[#3D3A37] mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-3 py-2 bg-white border border-[#D1C7B8] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A97155] focus:border-[#A97155] transition`}
    />
  </div>
);

const FormTextarea: React.FC<{ id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, required?: boolean }> = ({ id, label, value, onChange, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-[#3D3A37] mb-1">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows={4}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-3 py-2 bg-white border border-[#D1C7B8] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A97155] focus:border-[#A97155] transition`}
    />
  </div>
);

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setSubmitted(false);

    const form = e.target as HTMLFormElement;
    const netlifyFormData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(netlifyFormData as any).toString(),
    })
    .then(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    })
    .catch(() => {
      setError(true);
    });
  };

  return (
    <form 
      name="contact" 
      method="POST" 
      data-netlify="true" 
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit} 
      className="space-y-4"
    >
      {/* This input is required for Netlify to identify the form submission */}
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>

      <FormInput
        id="name"
        label="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <FormInput
        id="email"
        label="Correo Electrónico"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <FormTextarea
        id="message"
        label="Mensaje"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <div>
        <button
          type="submit"
          disabled={submitted}
          className="w-full bg-[#A97155] text-white py-3 px-6 rounded-md font-semibold hover:bg-opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A97155] focus:ring-offset-2 focus:ring-offset-[#EAE3D9] disabled:bg-opacity-50 disabled:cursor-not-allowed"
        >
          {submitted ? '¡Mensaje Enviado!' : 'Enviar Mensaje'}
        </button>
      </div>
       {submitted && (
        <p className="text-sm text-green-700 text-center mt-2">Gracias por tu mensaje. Te responderé lo antes posible.</p>
      )}
      {error && (
        <p className="text-sm text-red-700 text-center mt-2">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctame por email.</p>
      )}
    </form>
  );
};
// --- END: Form Component Logic ---


export const ContactSection = React.forwardRef<HTMLElement>((_props, ref) => {
  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      viewRef(node);
    },
    [ref, viewRef]
  );
  
  const linkedInUrl = socialLinks.find(link => link.name === 'LinkedIn')?.url || '#';

  return (
    <section
      ref={setRefs}
      id="contact"
      className={`scroll-mt-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <SectionTitle title="Contacto" />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
        {/* Left Column: Info */}
        <div className="mb-12 md:mb-0">
          <p className="text-base sm:text-lg text-[#5A5653] leading-relaxed mb-8">
            {contactSectionText}
          </p>
          <div className="space-y-4">
            <div>
              <a href={`mailto:${personalEmail}`} className="inline-flex items-center group text-[#A97155] hover:text-[#3D3A37] transition-colors duration-200">
                <EmailIcon className="w-5 h-5 mr-3" />
                <span className="font-semibold">
                  {personalEmail}
                </span>
              </a>
            </div>
            <div>
              <a 
                href={linkedInUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center group text-[#A97155] hover:text-[#3D3A37] transition-colors duration-200"
              >
                <LinkedInIcon className="w-5 h-5 mr-3" />
                <span className="font-semibold">
                  Conecta conmigo
                </span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Column: Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';