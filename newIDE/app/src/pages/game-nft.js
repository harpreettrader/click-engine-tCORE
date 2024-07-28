import React, { useState, useContext } from 'react';
import { GameContext } from '../GameContext/GameContext';
import './Gamenft.css';

const Gamenft = () => {
  const {
    handleImageUpload,
    handleFileUpload,
    handleSubmit,
    createGameNft,
    generateAccessId,
  } = useContext(GameContext);

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [formInput, setFormInput] = useState({
    price: '',
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setFormInput((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formInput.name || !formInput.description || !formInput.price || !file || !image) {
        throw new Error('Please fill in all fields and upload files.');
      }

      await handleFileUpload(file);
      setFileUploaded(true);

      await handleImageUpload(image);
      setImageUploaded(true);

      const finalURL = await handleSubmit(formInput);
      const accessId = generateAccessId();
      await createGameNft(accessId, finalURL, formInput.price);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async () => {
    if (file) {
      await handleFileUpload(file);
      setFileUploaded(true);
    }
  };

  const uploadImage = async () => {
    if (image) {
      await handleImageUpload(image);
      setImageUploaded(true);
    }
  };

  return (
    <div className="container">
      <h1>Create Game NFT</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="file">Choose File</label>
          <input type="file" id="file" onChange={handleFileChange} />
          {file && <span className="file-name">{file.name}</span>}
          <button
            type="button"
            onClick={uploadFile}
            className={fileUploaded ? 'btn-uploaded' : 'btn-upload'}
          >
            Upload File
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="image">Choose Image</label>
          <input type="file" id="image" onChange={handleImageChange} />
          {image && <span className="file-name">{image.name}</span>}
          <button
            type="button"
            onClick={uploadImage}
            className={imageUploaded ? 'btn-uploaded' : 'btn-upload'}
          >
            Upload Image
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (ETH)</label>
          <input
            type="number"
            id="price"
            step="0.0001"
            placeholder="Enter price"
            onChange={(e) => handleInputChange('price', e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={!fileUploaded || !imageUploaded || loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {loading && <div className="loader"></div>}
      </form>
    </div>
  );
};

export default Gamenft;
