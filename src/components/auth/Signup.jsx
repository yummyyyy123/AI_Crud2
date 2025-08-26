import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

function Signup({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else setUser(data.user);
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
