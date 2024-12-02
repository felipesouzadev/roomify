"use client"

import axios from "axios";
import { useRouter } from 'next/navigation';
import useAuth from '../app/hooks/useAuth';

export default function LoginForm() {
    const { valid, loading, error } = useAuth();
    const router = useRouter();
    
    async function login(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            username: formData.get("username"),
            password: formData.get("password"),
        };
        axios.post('/api/auth/login', data)
        router.push('/');
    }

    return (
    <form onSubmit={login} className="bg-secondary p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2">
        <h2 className="font-bold text-sl mb-3">Sign in</h2>
        <input
        name="username"
        type="text"
        placeholder="username"
        className="input input-primary w-full"
        />
        <input
        name="password"
        type="password"
        placeholder="password"
        className="input input-primary w-full"
        />
        <button className="btn btn-primary w-full">Login</button>
      </form>
    );
}