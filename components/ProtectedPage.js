"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../app/hooks/useAuth';
import SkeleonLoader from './SkeletonLoader';


const ProtectedPage = ({ children }) => {
    const { valid, loading, error } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (loading) return
      if (!valid) {
        router.push('/login');
      }
    }, [valid, loading, router]);
  
    if (loading) {
      return <div/>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return <>{children}</>;
  };
  
  export default ProtectedPage;