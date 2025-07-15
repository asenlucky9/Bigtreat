import React, { useRef, useState } from 'react';

const ImageUpload = ({ label = 'Upload Image', onUpload, imageUrl }) => {
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(imageUrl || '');
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        onUpload && onUpload(data.url);
      } else {
        setError('Upload failed.');
      }
    } catch {
      setError('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="form-label block mb-2">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Choose Image'}
        </button>
        {preview && (
          <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded-lg border" />
        )}
      </div>
      {error && <div className="text-rose-600 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default ImageUpload; 