"use client"

import { useRouter } from 'next/navigation';;
import { Input, Button } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import { signIn } from 'next-auth/react';
import {  useState } from "react";

export default function LoginForm() {
    const [ user, setUser ] = useState({})
    const router = useRouter();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await signIn('credentials', {
            username: user.username,
            password: user.password,
            redirect: false,
          });
          if (!response?.error) {
            router.push('/');
            router.refresh();
          }
    }

    return (
        <Form validationBehavior="native"  onSubmit={handleLogin} className="flex flex-col gap-3 justify-center min-w-80 p-80" >
            <h2 className="font-bold text-sl mb-3">Sign in</h2>
                <Input
                name="username"
                type="text"
                placeholder="username"
                className="input input-primary w-full"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <Input
                name="password"
                type="password"
                placeholder="password"
                className="input input-primary w-full"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <Button type="submit" className="btn btn-primary w-full">Login</Button>
          </Form>
    );
}