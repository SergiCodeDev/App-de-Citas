'use client';

import { useState, useEffect } from 'react';

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch profiles');
        }
        const data = await response.json();
        setProfiles(data.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchProfiles();
  }, []);

  const handleLike = async (targetId) => {
    const userId = 'currentUserId'; // Obtén el ID del usuario actual de alguna manera
    try {
      const response = await fetch('/api/users/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, targetId }),
      });
      if (!response.ok) {
        throw new Error('Failed to like user');
      }
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDislike = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  if (profiles.length === 0 || currentIndex >= profiles.length) {
    return <div>No more profiles</div>;
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div>
      <img src={currentProfile.profileImage} alt={currentProfile.username} />
      <h2>{currentProfile.username}</h2>
      <p>{currentProfile.bio}</p>
      <button onClick={() => handleLike(currentProfile._id)}>Like</button>
      <button onClick={handleDislike}>Dislike</button>
    </div>
  );
}
