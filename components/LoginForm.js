"use client"

import { useRouter } from 'next/navigation';;
import { Input, Button } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import { signIn } from 'next-auth/react';
import { useState } from "react";
import EyeFilledIcon from "./Icons/EyeFilledIcon";
import EyeSlashFilledIcon from "./Icons/EyeSlashFilledIcon";

export default function LoginForm() {
    const [ user, setUser ] = useState({})
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const toggleVisibility = () => setIsVisible(!isVisible);
    
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
            <h2 className="font-bold text-sl mb-3 text-primary">Sign in</h2>
                <Input
                color="primary"
                name="username"
                type="text"
                placeholder="username"
                className="input input-primary w-full"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <Input
                color="primary"
                name="password"
                type={isVisible ? 'text' : 'password'}
                endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                placeholder="password"
                className="input input-primary w-full"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <Button type="submit" color="primary" className="btn btn-primary w-full">Login</Button>
          </Form>
    );
}