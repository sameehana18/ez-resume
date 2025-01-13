import React, { useState, useEffect } from 'react';
import axios from '../config/axiosConfig.js';

function Settings() {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load the existing user data (mocked here, replace with actual data fetch logic)
    const loggedInUser = JSON.parse(localStorage.getItem('user')) || {};
    setAvatar(loggedInUser.avatar || null);
    setUsername(loggedInUser.username || '');
    setFullName(loggedInUser.fullname || '');
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Set preview
    }
  };

  const handleAvatarRemove = () => {
    setAvatar(null); // Remove avatar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const formData = new FormData();
      
      // Check if avatar was removed
      if (avatar === null) {
        formData.append('avatar', null); // Explicitly tell backend to delete the avatar
      } else if (avatar && typeof avatar === 'string') {
        // Check if new avatar is selected (preview is a URL in case no file is selected)
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
          formData.append('avatar', fileInput.files[0]);
        }
      }
  
      formData.append('username', username);
      formData.append('fullname', fullName);
  
      // Send the request to the backend (using PATCH since it's an update)
      const response = await axios.patch('/users/update-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
  
      if (response.status === 200) {
        const updatedUser = response.data.data;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('User updated successfully!');
      }
    } catch (err) {
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center justify-center relative">
          {avatar ? (
            <div className="relative">
              <img
                src={avatar}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
              <div className="absolute top-1/2 right-[-40px] flex flex-col space-y-2 transform -translate-y-1/2">
                <label htmlFor="avatarInput" className="cursor-pointer hover:opacity-80 hover:scale-110">
                  <img
                    src="icons8-edit-500.png"
                    alt="Edit Avatar"
                    className="w-6 h-6"
                  />
                </label>
                <button type="button" onClick={handleAvatarRemove} className="focus:outline-none hover:opacity-80 hover:scale-110">
                  <img
                    src="icons8-delete-500.png"
                    alt="Remove Avatar"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <span>No Avatar</span>
              </div>
              <label
                htmlFor="avatarInput"
                className="mt-2 cursor-pointer hover:opacity-80 hover:scale-110"
              >
                <img
                  src="icons8-upload-100.png"
                  alt="Upload Avatar"
                  className="w-6 h-6"
                />
              </label>
            </div>
          )}
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* Username Input */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-600 placeholder-gray-500 bg-white border rounded-lg focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
            placeholder="Enter your username"
          />
        </div>

        {/* Full Name Input */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-600 placeholder-gray-500 bg-white border rounded-lg focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
            placeholder="Enter your full name"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-purple-700 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default Settings;
