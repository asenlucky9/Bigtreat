import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Image, Layers, Edit, Trash2, Plus, Home as HomeIcon, Info, Mail as MailIcon, CheckCircle } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const tabs = [
  { id: 'home', name: 'Home', icon: HomeIcon },
  { id: 'about', name: 'About', icon: Info },
  { id: 'contact', name: 'Contact', icon: MailIcon },
  { id: 'bookings', name: 'Bookings', icon: Calendar },
  { id: 'gallery', name: 'Gallery', icon: Image },
  { id: 'services', name: 'Services', icon: Layers }
];

const placeholderBookings = [
  { id: 1, name: 'Jane Doe', service: 'Wedding Planning', date: '2024-08-10', status: 'Confirmed' },
  { id: 2, name: 'John Smith', service: 'Bridal Makeup', date: '2024-08-15', status: 'Pending' }
];
const placeholderGallery = [
  { id: 1, title: 'Elegant Cake', image: '/assets/cake1.jpeg' },
  { id: 2, title: 'Bridal Makeup', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=400&fit=crop' }
];
const placeholderServices = [
  { id: 1, name: 'Event Planning', description: 'Complete event coordination.' },
  { id: 2, name: 'Makeup & Beauty', description: 'Professional makeup and hair styling.' }
];

const ICON_OPTIONS = [
  { label: 'Users', value: 'Users' },
  { label: 'Calendar', value: 'Calendar' },
  { label: 'Award', value: 'Award' },
  { label: 'Star', value: 'Star' },
  { label: 'Heart', value: 'Heart' }
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (['home', 'about', 'contact'].includes(activeTab)) {
      setLoading(true);
      setError('');
      setSuccess('');
      fetch(`/api/content/${activeTab}`)
        .then(res => res.json())
        .then(data => {
          setContent(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load content.');
          setLoading(false);
        });
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setActiveTab(tab);
      setLoading(false);
    }, 400);
  };

  const handleContentChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleContentSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/content/${activeTab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      if (!res.ok) throw new Error('Failed to update content');
      setSuccess('Content updated successfully!');
    } catch {
      setError('Failed to update content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10"
        >
          Admin Panel
        </motion.h1>
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="w-48 flex-shrink-0">
            <ul className="space-y-2">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === tab.id ? 'bg-pink-600 text-white' : 'bg-white text-gray-800 hover:bg-pink-50'}`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-600 border-opacity-50"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 font-semibold">{error}</div>
            ) : success ? (
              <div className="flex flex-col items-center justify-center h-64 text-green-600">
                <CheckCircle className="w-12 h-12 mb-2" />
                <div className="text-xl font-semibold">{success}</div>
              </div>
            ) : (
              <>
                {activeTab === 'home' && (
                  <form onSubmit={handleContentSave} className="max-w-xl mx-auto space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Edit Home Page Content</h2>
                    <div>
                      <label className="form-label">Hero Title</label>
                      <input name="heroTitle" className="input" value={content.heroTitle || ''} onChange={handleContentChange} />
                    </div>
                    <div>
                      <label className="form-label">Hero Subtitle</label>
                      <textarea name="heroSubtitle" className="textarea" value={content.heroSubtitle || ''} onChange={handleContentChange} />
                    </div>
                    <ImageUpload
                      label="Hero Image"
                      imageUrl={content.heroImage}
                      onUpload={url => setContent({ ...content, heroImage: url })}
                    />
                    {/* Testimonials CRUD UI scaffold (full logic to follow) */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-2">Testimonials</h3>
                      {(content.testimonials || []).map((t, idx) => (
                        <div key={idx} className="border rounded-lg p-4 mb-4 flex items-center gap-4">
                          <ImageUpload
                            label="Avatar"
                            imageUrl={t.avatar}
                            onUpload={url => {
                              const updated = [...content.testimonials];
                              updated[idx] = { ...updated[idx], avatar: url };
                              setContent({ ...content, testimonials: updated });
                            }}
                          />
                          <div className="flex-1">
                            <input
                              className="input mb-2"
                              placeholder="Name"
                              value={t.name}
                              onChange={e => {
                                const updated = [...content.testimonials];
                                updated[idx] = { ...updated[idx], name: e.target.value };
                                setContent({ ...content, testimonials: updated });
                              }}
                            />
                            <input
                              className="input mb-2"
                              placeholder="Role"
                              value={t.role}
                              onChange={e => {
                                const updated = [...content.testimonials];
                                updated[idx] = { ...updated[idx], role: e.target.value };
                                setContent({ ...content, testimonials: updated });
                              }}
                            />
                            <textarea
                              className="textarea"
                              placeholder="Testimonial"
                              value={t.content}
                              onChange={e => {
                                const updated = [...content.testimonials];
                                updated[idx] = { ...updated[idx], content: e.target.value };
                                setContent({ ...content, testimonials: updated });
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-outline ml-2"
                            onClick={() => {
                              const updated = [...content.testimonials];
                              updated.splice(idx, 1);
                              setContent({ ...content, testimonials: updated });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setContent({ ...content, testimonials: [...(content.testimonials || []), { name: '', role: '', content: '', avatar: '' }] })}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Testimonial
                      </button>
                    </div>
                    {/* Stats CRUD UI */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-2">Stats</h3>
                      {(content.stats || []).map((stat, idx) => (
                        <div key={idx} className="border rounded-lg p-4 mb-4 flex items-center gap-4">
                          <input
                            className="input mb-2"
                            placeholder="Number"
                            value={stat.number}
                            onChange={e => {
                              const updated = [...content.stats];
                              updated[idx] = { ...updated[idx], number: e.target.value };
                              setContent({ ...content, stats: updated });
                            }}
                          />
                          <input
                            className="input mb-2"
                            placeholder="Label"
                            value={stat.label}
                            onChange={e => {
                              const updated = [...content.stats];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setContent({ ...content, stats: updated });
                            }}
                          />
                          <select
                            className="input mb-2"
                            value={stat.icon || ''}
                            onChange={e => {
                              const updated = [...content.stats];
                              updated[idx] = { ...updated[idx], icon: e.target.value };
                              setContent({ ...content, stats: updated });
                            }}
                          >
                            <option value="">Icon</option>
                            {ICON_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          <button
                            type="button"
                            className="btn btn-outline ml-2"
                            onClick={() => {
                              const updated = [...content.stats];
                              updated.splice(idx, 1);
                              setContent({ ...content, stats: updated });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setContent({ ...content, stats: [...(content.stats || []), { number: '', label: '', icon: '' }] })}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Stat
                      </button>
                    </div>
                    <button className="btn btn-primary mt-6" type="submit">Save</button>
                  </form>
                )}
                {activeTab === 'about' && (
                  <form onSubmit={handleContentSave} className="max-w-xl mx-auto space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Edit About Page Content</h2>
                    <div>
                      <label className="form-label">Title</label>
                      <input name="title" className="input" value={content.title || ''} onChange={handleContentChange} />
                    </div>
                    <div>
                      <label className="form-label">Description</label>
                      <textarea name="description" className="textarea" value={content.description || ''} onChange={handleContentChange} />
                    </div>
                    <ImageUpload
                      label="Hero Image"
                      imageUrl={content.heroImage}
                      onUpload={url => setContent({ ...content, heroImage: url })}
                    />
                    <div>
                      <label className="form-label">Video Link (optional)</label>
                      <input name="videoUrl" className="input" value={content.videoUrl || ''} onChange={handleContentChange} />
                    </div>
                    {/* Team CRUD UI */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-2">Team Members</h3>
                      {(content.team || []).map((member, idx) => (
                        <div key={idx} className="border rounded-lg p-4 mb-4 flex items-center gap-4">
                          <ImageUpload
                            label="Photo"
                            imageUrl={member.photo}
                            onUpload={url => {
                              const updated = [...content.team];
                              updated[idx] = { ...updated[idx], photo: url };
                              setContent({ ...content, team: updated });
                            }}
                          />
                          <div className="flex-1">
                            <input
                              className="input mb-2"
                              placeholder="Name"
                              value={member.name}
                              onChange={e => {
                                const updated = [...content.team];
                                updated[idx] = { ...updated[idx], name: e.target.value };
                                setContent({ ...content, team: updated });
                              }}
                            />
                            <input
                              className="input mb-2"
                              placeholder="Role"
                              value={member.role}
                              onChange={e => {
                                const updated = [...content.team];
                                updated[idx] = { ...updated[idx], role: e.target.value };
                                setContent({ ...content, team: updated });
                              }}
                            />
                            <textarea
                              className="textarea"
                              placeholder="Bio"
                              value={member.bio}
                              onChange={e => {
                                const updated = [...content.team];
                                updated[idx] = { ...updated[idx], bio: e.target.value };
                                setContent({ ...content, team: updated });
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-outline ml-2"
                            onClick={() => {
                              const updated = [...content.team];
                              updated.splice(idx, 1);
                              setContent({ ...content, team: updated });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setContent({ ...content, team: [...(content.team || []), { name: '', role: '', bio: '', photo: '' }] })}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Team Member
                      </button>
                    </div>
                    {/* Stats CRUD UI */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-2">Stats</h3>
                      {(content.stats || []).map((stat, idx) => (
                        <div key={idx} className="border rounded-lg p-4 mb-4 flex items-center gap-4">
                          <input
                            className="input mb-2"
                            placeholder="Number"
                            value={stat.number}
                            onChange={e => {
                              const updated = [...content.stats];
                              updated[idx] = { ...updated[idx], number: e.target.value };
                              setContent({ ...content, stats: updated });
                            }}
                          />
                          <input
                            className="input mb-2"
                            placeholder="Label"
                            value={stat.label}
                            onChange={e => {
                              const updated = [...content.stats];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setContent({ ...content, stats: updated });
                            }}
                          />
                          <select
                            className="input mb-2"
                            value={stat.icon || ''}
                            onChange={e => {
                              const updated = [...content.stats];
                              updated[idx] = { ...updated[idx], icon: e.target.value };
                              setContent({ ...content, stats: updated });
                            }}
                          >
                            <option value="">Icon</option>
                            {ICON_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          <button
                            type="button"
                            className="btn btn-outline ml-2"
                            onClick={() => {
                              const updated = [...content.stats];
                              updated.splice(idx, 1);
                              setContent({ ...content, stats: updated });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setContent({ ...content, stats: [...(content.stats || []), { number: '', label: '', icon: '' }] })}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Stat
                      </button>
                    </div>
                    <button className="btn btn-primary mt-6" type="submit">Save</button>
                  </form>
                )}
                {activeTab === 'contact' && (
                  <form onSubmit={handleContentSave} className="max-w-xl mx-auto space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Edit Contact Page Content</h2>
                    <div>
                      <label className="form-label">Address</label>
                      <input name="address" className="input" value={content.address || ''} onChange={handleContentChange} />
                    </div>
                    <div>
                      <label className="form-label">Phone</label>
                      <input name="phone" className="input" value={content.phone || ''} onChange={handleContentChange} />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input name="email" className="input" value={content.email || ''} onChange={handleContentChange} />
                    </div>
                    <div>
                      <label className="form-label">Map Embed (Google Maps iframe or link)</label>
                      <textarea name="mapEmbed" className="textarea" value={content.mapEmbed || ''} onChange={handleContentChange} />
                    </div>
                    {/* Business Hours CRUD UI */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                      {(content.businessHours || []).map((line, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                          <input
                            className="input flex-1"
                            value={line}
                            onChange={e => {
                              const updated = [...content.businessHours];
                              updated[idx] = e.target.value;
                              setContent({ ...content, businessHours: updated });
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => {
                              const updated = [...content.businessHours];
                              updated.splice(idx, 1);
                              setContent({ ...content, businessHours: updated });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setContent({ ...content, businessHours: [...(content.businessHours || []), ''] })}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Line
                      </button>
                    </div>
                    <button className="btn btn-primary mt-6" type="submit">Save</button>
                  </form>
                )}
                {activeTab === 'bookings' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">Bookings</h2>
                      <button className="btn btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Booking</button>
                    </div>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2">Name</th>
                          <th className="py-2">Service</th>
                          <th className="py-2">Date</th>
                          <th className="py-2">Status</th>
                          <th className="py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {placeholderBookings.map(b => (
                          <tr key={b.id} className="border-b hover:bg-pink-50">
                            <td className="py-2">{b.name}</td>
                            <td className="py-2">{b.service}</td>
                            <td className="py-2">{b.date}</td>
                            <td className="py-2">{b.status}</td>
                            <td className="py-2 flex gap-2">
                              <button className="text-blue-600 hover:underline"><Edit className="w-4 h-4 inline" /></button>
                              <button className="text-red-600 hover:underline"><Trash2 className="w-4 h-4 inline" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === 'gallery' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">Gallery</h2>
                      <button className="btn btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Image</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {placeholderGallery.map(item => (
                        <div key={item.id} className="bg-gray-100 rounded-xl p-4 flex flex-col items-center">
                          <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded-lg mb-2" />
                          <div className="font-medium mb-1">{item.title}</div>
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:underline"><Edit className="w-4 h-4 inline" /></button>
                            <button className="text-red-600 hover:underline"><Trash2 className="w-4 h-4 inline" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'services' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">Services</h2>
                      <button className="btn btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Service</button>
                    </div>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2">Name</th>
                          <th className="py-2">Description</th>
                          <th className="py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {placeholderServices.map(s => (
                          <tr key={s.id} className="border-b hover:bg-pink-50">
                            <td className="py-2">{s.name}</td>
                            <td className="py-2">{s.description}</td>
                            <td className="py-2 flex gap-2">
                              <button className="text-blue-600 hover:underline"><Edit className="w-4 h-4 inline" /></button>
                              <button className="text-red-600 hover:underline"><Trash2 className="w-4 h-4 inline" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 