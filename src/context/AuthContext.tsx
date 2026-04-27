import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    // using signInWithOAuth with google for demo, or magic link?
    // User wants email/password or google. We can just use dummy prompt for testing or simple magic link
    const email = window.prompt("Enter email for login/registration:");
    if (!email) return;

    let pass = window.prompt("Enter password:");
    if (!pass) return;

    // Try sign in
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error && error.message.includes('Invalid login')) {
       // try sign up
       const { error: signUpError } = await supabase.auth.signUp({ email, password: pass });
       if (signUpError) {
         window.alert("Sign up error: " + signUpError.message);
       } else {
         window.alert("Signed up successfully!");
       }
    } else if (error) {
       window.alert("Login error: " + error.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signOut, loading }}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
