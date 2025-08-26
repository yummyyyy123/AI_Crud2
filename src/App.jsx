import React, { useEffect, useState } from "react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Notes from "./components/Notes";
import { supabase } from "./supabaseClient";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      {!user ? (
        <div className="auth-forms">
          <Login setUser={setUser} />
          <Signup setUser={setUser} />
        </div>
      ) : (
        <Notes user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
