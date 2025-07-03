
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

const FormInput: React.FC<{ id: string, label: string, type?: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error?: string, required?: boolean }> = ({ id, label, type = 'text', value, onChange, error, required = false }) => (
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
      className={`w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-[#D1C7B8]'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A97155] focus:border-[#A97155] transition`}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

const FormTextarea: React.FC<{ id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, error?: string, required?: boolean }> = ({ id, label, value, onChange, error, required = false }) => (
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
      className={`w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-[#D1C7B8]'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A97155] focus:border-[#A97155] transition`}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string, email?: string, message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string, email?: string, message?: string } = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del correo electrónico no es válido.';
    }
    if (!formData.message.trim()) newErrors.message = 'El mensaje es obligatorio.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000); 
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormInput
        id="name"
        label="Nombre"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <FormInput
        id="email"
        label="Correo Electrónico"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <FormTextarea
        id="message"
        label="Mensaje"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        required
      />
      <div>
        <button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          className="w-full bg-[#A97155] text-white py-3 px-6 rounded-md font-semibold hover:bg-opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A97155] focus:ring-offset-2 focus:ring-offset-[#EAE3D9] disabled:bg-opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' && 'Enviando...'}
          {status === 'success' && '¡Mensaje Enviado!'}
          {(status === 'idle' || status === 'error') && 'Enviar Mensaje'}
        </button>
      </div>
       {status === 'success' && (
        <p className="text-sm text-green-700 text-center mt-2">Gracias por tu mensaje. Te responderé lo antes posible.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-700 text-center mt-2">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>
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
