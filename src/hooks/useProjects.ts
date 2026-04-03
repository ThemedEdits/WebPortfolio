import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { onSnapshot } from 'firebase/firestore';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  images?: string[];
  techStack: string[];
  liveUrl?: string;
  featured?: boolean;
  priority?: number;       // lower = shown first in featured section
  category: string;
  features?: string[];
  createdAt?: any;
}

/** Convert a project title into a URL-safe slug */
export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Project));
      setProjects(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  setLoading(true);

  const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(
    q,
    (snap) => {
      const data = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      } as Project));

      setProjects(data);
      setLoading(false);
    },
    (err) => {
      setError(err.message);
      setLoading(false);
    }
  );

  return () => unsubscribe();
}, []);

  return { projects, loading, error, refetch: fetchProjects };
}

/** Fetch a single project by its slug field */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const q = query(collection(db, 'projects'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Project;
}

/** Fallback: fetch by Firestore doc ID */
export async function getProject(id: string): Promise<Project | null> {
  const ref = doc(db, 'projects', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Project;
}

export async function addProject(data: Omit<Project, 'id'>) {
  return addDoc(collection(db, 'projects'), { ...data, createdAt: serverTimestamp() });
}

export async function updateProject(id: string, data: Partial<Project>) {
  return updateDoc(doc(db, 'projects', id), data);
}

export async function deleteProject(id: string) {
  return deleteDoc(doc(db, 'projects', id));
}

/** Batch-update priority for multiple projects at once (drag-to-reorder) */
export async function updateProjectPriorities(updates: { id: string; priority: number }[]) {
  const batch = writeBatch(db);
  updates.forEach(({ id, priority }) => {
    batch.update(doc(db, 'projects', id), { priority });
  });
  return batch.commit();
}