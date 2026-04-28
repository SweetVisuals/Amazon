import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type Profile = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
}

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId?: string) => {
    const query = supabase.from('profiles').select('*');
    if (userId) {
      query.eq('id', userId);
    }
    const { data, error } = await query.order('created_at', { ascending: true }).limit(1).maybeSingle();
    
    if (data) {
      setProfile(data);
    } else if (!userId) {
       // Create a default one if somehow missing (should be seeded by migration)
       const { data: newData, error: insertError } = await supabase.from('profiles').insert({
         id: '00000000-0000-0000-0000-000000000000',
         email: 'nicolas@example.com',
         first_name: 'NICOLAS',
         last_name: 'K THEATO'
       }).select().single();
       if (newData) setProfile(newData);
       if (insertError) console.error("Error creating default profile:", insertError);
    } else if (error) {
       console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    // Check session
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      await fetchProfile(session?.user?.id);
      setLoading(false);
    };
    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        await fetchProfile(session?.user?.id);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    // For this project, we prioritize the "no login" flow, but keep the function if they want to use real auth later
    const email = window.prompt("Enter email for login/registration:");
    if (!email) return;
    const pass = window.prompt("Enter password:");
    if (!pass) return;

    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error && error.message.includes('Invalid login')) {
       const { error: signUpError } = await supabase.auth.signUp({ email, password: pass });
       if (signUpError) window.alert("Sign up error: " + signUpError.message);
    } else if (error) {
       window.alert("Login error: " + error.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    fetchProfile(); // Revert to guest profile
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return;
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profile.id);
    
    if (error) {
      window.alert("Error updating profile: " + error.message);
    } else {
      setProfile({ ...profile, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, signIn, signOut, updateProfile, loading }}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
