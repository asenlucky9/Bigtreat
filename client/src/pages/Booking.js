import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import apiService from '../services/api';
import toast from 'react-hot-toast';

const Booking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    guestCount: '',
    specialRequirements: '',
    budget: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await apiService.getService(serviceId);
        setService(data);
      } catch (error) {
        setError('Failed to load service details. Please try again later.');
        console.error('Error fetching service:', error);
        toast.error('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const bookingData = {
        ...formData,
        serviceId,
        serviceName: service?.name || 'Custom Service'
      };

      const response = await apiService.createBooking(bookingData);
      toast.success(response.message);
      navigate('/services');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to submit booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 border-opacity-50"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl shadow text-lg font-semibold">
          {error}
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Not Found</h2>
          <button 
            onClick={() => navigate('/services')}
            className="btn btn-primary"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="heading-primary">Book Your Service</h1>
            <p className="text-lg text-gray-600">
              Complete the form below to book your {service.name} service
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Service Details */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="heading-secondary mb-4">Service Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img 
                        src={service.imageUrl} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">₦{service.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">{service.duration}</span>
                    </div>
                  </div>

                  {service.features && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="card p-6">
              <h2 className="heading-secondary mb-6">Booking Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <span>Customer Information</span>
                  </h3>
                  
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Event Details</span>
                  </h3>
                  
                  <div className="form-group">
                    <label className="form-label">Event Date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="input"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Event Time</label>
                    <input
                      type="time"
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Event Location</label>
                    <input
                      type="text"
                      name="eventLocation"
                      value={formData.eventLocation}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Enter event location"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Number of Guests</label>
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="input"
                      min="1"
                      placeholder="Estimated guest count"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Additional Information</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Special Requirements</label>
                    <textarea
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleInputChange}
                      className="textarea"
                      rows="3"
                      placeholder="Any special requirements or preferences..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Budget Range (₦)</label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Your budget range"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full"
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="spinner"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Booking Request'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking; 