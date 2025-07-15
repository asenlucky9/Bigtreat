import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What services does Big Treat Unique Centre offer?',
    answer: 'We offer event planning, decoration, makeup, bead making, traditional hair styling, and custom wedding cakes for all occasions.'
  },
  {
    question: 'How do I book a service?',
    answer: 'You can book a service directly through our website by visiting the Services page and clicking on the "Book Now" button, or by contacting us via phone or email.'
  },
  {
    question: 'Do you offer consultations before booking?',
    answer: 'Yes! We offer free consultations to discuss your needs, vision, and budget before you make a booking.'
  },
  {
    question: 'Can I customize my event package?',
    answer: 'Absolutely. All our services are customizable to fit your preferences, theme, and budget.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made at least 7 days before the event will receive a full refund. Cancellations within 7 days may incur a fee.'
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking as early as possible, especially for weddings and large events. However, we do our best to accommodate last-minute requests.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="pt-20 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Frequently Asked Questions
        </motion.h1>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-lg font-medium text-gray-800 focus:outline-none focus:bg-pink-50 transition-colors"
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                {faq.question}
                <ChevronDown className={`w-6 h-6 ml-2 transition-transform ${openIndex === idx ? 'rotate-180 text-pink-600' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    id={`faq-panel-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-700 text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 