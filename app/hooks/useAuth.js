// /app/hooks/useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/validate', {
          method: 'GET',
          credentials: 'same-origin',
        });

        if (response.ok) {
          setValid(true);
        } else {
          setValid(false);
        }
      } catch (error) {
        setError('Failed to check authentication');
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { valid, loading, error };
};
export default useAuth;