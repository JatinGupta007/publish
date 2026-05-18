import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddItemPage() {
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    description: '',
    preparationTime: '',
    image: '',
    available: true,
    quantity: 0
  });

  // Fetch the current menu items to generate next ID
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu/items');
        const items = await response.json();
        const maxId = Math.max(...items.map(item => item.id), 0);
        setNewItem(prev => ({ ...prev, id: maxId + 1 }));
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setMessage({ text: 'Error generating item ID', type: 'error' });
      }
    };
    fetchMenuItems();
  }, []);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = React.useRef(null);

  const categories = [
    'South Indian',
    'North Indian',
    'Chinese',
    'Italian',
    'Main Course',
    'Snacks',
    'Beverages',
    'Desserts'
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setNewItem(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setMessage({ text: 'Please upload an image file', type: 'error' });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Ensure all numeric values are properly converted
      const itemToSubmit = {
        ...newItem,
        price: Number(newItem.price),
        preparationTime: Number(newItem.preparationTime),
        quantity: Number(newItem.quantity)
      };

      const response = await fetch('http://localhost:5000/api/menu/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemToSubmit),
      });

      if (response.ok) {
        const addedItem = await response.json();
        setMessage({ text: 'Item added successfully!', type: 'success' });
        
        // Reset form fields but keep the next ID
        const nextId = newItem.id + 1;
        setNewItem({
          id: nextId,
          name: '',
          category: '',
          price: '',
          description: '',
          preparationTime: '',
          image: '',
          available: true,
          quantity: 0
        });
        setPreviewUrl('');
        
        // Navigate back to menu page after 2 seconds
        setTimeout(() => {
          navigate('/manager/menu');
        }, 2000);
      } else {
        const error = await response.json();
        setMessage({ text: error.message || 'Failed to add item', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error adding item: ' + error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Add New Menu Item</h2>
          
          {message.text && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb-4`}>
              {message.text}
            </div>
          )}

          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label">Item Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      required
                      placeholder="Enter item name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Price (₹) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                      required
                      min="0"
                      placeholder="Enter price"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Preparation Time (minutes) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newItem.preparationTime}
                      onChange={(e) => setNewItem({...newItem, preparationTime: e.target.value})}
                      required
                      min="1"
                      placeholder="Enter preparation time"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Image *</label>
                    <div 
                      className={`drag-drop-zone ${dragActive ? 'drag-active' : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={handleButtonClick}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="file-input"
                        accept="image/*"
                        onChange={handleChange}
                        required={!newItem.image}
                      />
                      {previewUrl ? (
                        <div className="preview-container">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="preview-image"
                          />
                          <button 
                            type="button" 
                            className="remove-image"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewUrl('');
                              setNewItem(prev => ({ ...prev, image: '' }));
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <div className="upload-prompt">
                          <i className="fas fa-cloud-upload-alt mb-2"></i>
                          <p>Drag and drop your image here or click to select</p>
                          <span className="text-muted">Supported formats: JPG, PNG, WEBP</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      required
                      placeholder="Enter item description"
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="available"
                        checked={newItem.available}
                        onChange={(e) => setNewItem({...newItem, available: e.target.checked})}
                      />
                      <label className="form-check-label" htmlFor="available">
                        Item is available
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Adding Item...
                        </>
                      ) : (
                        'Add Item'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-label {
          font-weight: 500;
        }
        .card {
          border: none;
          border-radius: 10px;
        }
        .form-control:focus,
        .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        .drag-drop-zone {
          border: 2px dashed #ccc;
          border-radius: 10px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8f9fa;
          position: relative;
        }
        .drag-drop-zone:hover {
          border-color: #0d6efd;
          background: #f1f5ff;
        }
        .drag-active {
          border-color: #0d6efd;
          background: #f1f5ff;
        }
        .file-input {
          display: none;
        }
        .upload-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .upload-prompt i {
          font-size: 3rem;
          color: #6c757d;
        }
        .upload-prompt p {
          margin: 0.5rem 0;
          font-size: 1.1rem;
        }
        .preview-container {
          position: relative;
          display: inline-block;
        }
        .preview-image {
          max-width: 100%;
          max-height: 300px;
          border-radius: 8px;
        }
        .remove-image {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #dc3545;
          border: none;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .remove-image:hover {
          background: #bb2d3b;
        }
      `}</style>
    </div>
  );
}

export default AddItemPage;
