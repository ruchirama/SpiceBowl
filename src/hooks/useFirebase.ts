// hooks/useFirebase.ts
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { User } from 'firebase/auth';


export function useFirebase() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { auth, db, user };
}