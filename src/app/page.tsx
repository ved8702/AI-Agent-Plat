"use client";
import { Button } from '@/components/ui/button'
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { signOut } from 'better-auth/api';
import { on } from 'events';
export default function Home() {  

  const { 
        data: session
    } = authClient.useSession() 
   

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
 const onSubmit = async () => {
  const { data, error } = await authClient.signUp.email({
    email,
    name,
    password,
  });

  if (error) {
    console.error("Better Auth error:", error);
    alert(error.message);
    return;
  }

  console.log("User created:", data);
  alert("Success!");
};
     
  if (session){
    return (
      <div className='p-4 flex flex-col gap-y-4'>
        <h1>Welcome back, {session.user.name}!</h1>
        <Button onClick={async () => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }
   const onLogin = async () => {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
  });

  if (error) {
    console.error("Better Auth error:", error);
    alert(error.message);
    return;
  }

  console.log("User created:", data);
  alert("Success!");
};
     
  if (session){
    return (
      <div className='p-4 flex flex-col gap-y-4'>
        <h1> Logged in as, {session.user.name}!</h1>
        <Button onClick={async () => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }


  return (
    <div className='flex flex-col gap-y-10 '>  
    <div className='p-4 flex flex-col gap-y-4'>
     <input
       type="email"
       placeholder="Email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
     />
     <input
       type="text"
       placeholder="Name"
       value={name}
       onChange={(e) => setName(e.target.value)}
     />
     <input
       type="password"
       placeholder="Password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
     />
     <Button onClick={onSubmit}>
      create user
     </Button>
   </div>
   <div className='p-4 flex flex-col gap-y-4'>
     <input
       type="email"
       placeholder="Email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
     />

     <input
       type="password"
       placeholder="Password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
     />
     <Button onClick={onLogin}>
      Login
     </Button>
   </div>
</div>


  )
}
