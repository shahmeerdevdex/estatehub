import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Define types for our context
interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'asset_manager' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, role?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for session and set user on mount
  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
        setLoading(false);
        return;
      }
      
      if (session) {
        setSession(session);
        const { user } = session;
        
        // Fetch user profile data from users table
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError || !profile) {
          console.error('Error fetching user profile:', profileError);
          // Even if we can't get profile, we still have authenticated user
          setUser({
            id: user.id,
            email: user.email || '',
            name: user.user_metadata.name || 'User',
            role: 'owner', // Default role
            avatar: user.user_metadata.avatar_url,
          });
        } else {
          // Use the profile from database
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role,
            avatar: profile.avatar_url,
          });
        }
      }
      
      setLoading(false);
    };

    getSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'SIGNED_IN' && newSession) {
          setLoading(true);
          const { user } = newSession;
          
          // Check if user exists in our users table
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (profileError) {
            // New user, create profile
            setUser({
              id: user.id,
              email: user.email || '',
              name: user.user_metadata.name || 'User',
              role: 'owner', // Default role
              avatar: user.user_metadata.avatar_url,
            });
          } else {
            // Existing user
            setUser({
              id: profile.id,
              email: profile.email,
              name: profile.name,
              role: profile.role,
              avatar: profile.avatar_url,
            });
          }
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "You have been signed in successfully",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string, role: string = 'owner') => {
    setLoading(true);
    
    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      if (data.user) {
        // Insert user profile into users table
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email,
            name,
            role: role as 'owner' | 'asset_manager' | 'admin',
            created_at: new Date().toISOString(),
          });
        
        if (profileError) {
          toast({
            title: "Error",
            description: "Error creating user profile",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Your account has been created successfully",
          });
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/');
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while signing out",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (data: Partial<AuthUser>) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Update user metadata in auth
      if (data.name) {
        await supabase.auth.updateUser({
          data: {
            name: data.name,
          },
        });
      }
      
      // Update profile in users table
      const { error } = await supabase
        .from('users')
        .update({
          name: data.name,
          avatar_url: data.avatar,
          ...(data.role && { role: data.role }),
        })
        .eq('id', user.id);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        });
      } else {
        // Update local user state
        setUser(prev => prev ? { ...prev, ...data } : null);
        
        toast({
          title: "Success",
          description: "Your profile has been updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, session, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
