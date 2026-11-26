import { createClient } from '@supabase/supabase-js';
import { IndustryCategory, ClientProject, EnquirySubmission, SiteContent } from './types';
import { INITIAL_CATEGORIES, INITIAL_CLIENT_PROJECTS, INITIAL_SITE_CONTENT } from './seedData';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://quslrmacqonpxucolgil.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1c2xybWFjcW9ucHh1Y29sZ2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0MTI0NTcsImV4cCI6MjExMDk4ODQ1N30.1zcaafbKNErzpIpnnhQZyWjWyJivTSQtxsFQNOSbVdo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// In-memory fallback caches
let memoryCategories: IndustryCategory[] = [...INITIAL_CATEGORIES];
let memoryProjects: ClientProject[] = [...INITIAL_CLIENT_PROJECTS];
let memoryEnquiries: EnquirySubmission[] = [];
let memoryContent: SiteContent = { ...INITIAL_SITE_CONTENT };

// ==========================================
// CATEGORIES
// ==========================================

export async function getPublishedCategories(): Promise<IndustryCategory[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('isi_categories')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as IndustryCategory[];
      }
    } catch (e) {
      console.warn('Supabase getPublishedCategories fallback:', e);
    }
  }

  return memoryCategories
    .filter((c) => c.is_published)
    .sort((a, b) => a.display_order - b.display_order);
}

export async function getAllCategories(): Promise<IndustryCategory[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('isi_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as IndustryCategory[];
      }
    } catch (e) {
      console.warn('Supabase getAllCategories fallback:', e);
    }
  }

  return [...memoryCategories].sort((a, b) => a.display_order - b.display_order);
}

export async function createCategory(
  category: Omit<IndustryCategory, 'id' | 'created_at' | 'updated_at'>
): Promise<IndustryCategory> {
  const newId = 'cat-' + Date.now();
  const newCat: IndustryCategory = {
    ...category,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('isi_categories')
        .insert([newCat])
        .select()
        .single();

      if (!error && data) {
        return data as IndustryCategory;
      }
    } catch (e) {
      console.warn('Supabase createCategory error:', e);
    }
  }

  memoryCategories.push(newCat);
  return newCat;
}

export async function updateCategory(
  id: string,
  updates: Partial<IndustryCategory>
): Promise<IndustryCategory | null> {
  const payload = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('isi_categories')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return data as IndustryCategory;
      }
    } catch (e) {
      console.warn('Supabase updateCategory error:', e);
    }
  }

  const idx = memoryCategories.findIndex((c) => c.id === id);
  if (idx !== -1) {
    memoryCategories[idx] = { ...memoryCategories[idx], ...payload };
    return memoryCategories[idx];
  }

  return null;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('isi_categories').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase deleteCategory error:', e);
    }
  }

  const prevLen = memoryCategories.length;
  memoryCategories = memoryCategories.filter((c) => c.id !== id);
  return memoryCategories.length < prevLen;
}

// ==========================================
// CLIENT PROJECTS
// ==========================================

export async function getPublishedProjects(): Promise<ClientProject[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('isi_projects')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as ClientProject[];
      }
    } catch (e) {
      console.warn('Supabase getPublishedProjects fallback:', e);
    }
  }

  return memoryProjects
    .filter((p) => p.is_published)
    .sort((a, b) => a.display_order - b.display_order);
}

export async function getAllProjects(): Promise<ClientProject[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('isi_projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as ClientProject[];
      }
    } catch (e) {
      console.warn('Supabase getAllProjects fallback:', e);
    }
  }

  return [...memoryProjects].sort((a, b) => a.display_order - b.display_order);
}

export async function createClientProject(
  project: Omit<ClientProject, 'id' | 'created_at' | 'updated_at'>
): Promise<ClientProject> {
  const newId = 'proj-' + Date.now();
  const newProj: ClientProject = {
    ...project,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('isi_projects')
        .insert([newProj])
        .select()
        .single();

      if (!error && data) {
        return data as ClientProject;
      }
    } catch (e) {
      console.warn('Supabase createClientProject error:', e);
    }
  }

  memoryProjects.push(newProj);
  return newProj;
}

export async function updateClientProject(
  id: string,
  updates: Partial<ClientProject>
): Promise<ClientProject | null> {
  const payload = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('isi_projects')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return data as ClientProject;
      }
    } catch (e) {
      console.warn('Supabase updateClientProject error:', e);
    }
  }

  const idx = memoryProjects.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryProjects[idx] = { ...memoryProjects[idx], ...payload };
    return memoryProjects[idx];
  }

  return null;
}

export async function deleteClientProject(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('isi_projects').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase deleteClientProject error:', e);
    }
  }

  const prevLen = memoryProjects.length;
  memoryProjects = memoryProjects.filter((p) => p.id !== id);
  return memoryProjects.length < prevLen;
}

// ==========================================
// ENQUIRIES
// ==========================================

export async function getEnquiries(): Promise<EnquirySubmission[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('isi_enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as EnquirySubmission[];
      }
    } catch (e) {
      console.warn('Supabase getEnquiries fallback:', e);
    }
  }

  return [...memoryEnquiries].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function createEnquiry(
  enquiry: Omit<EnquirySubmission, 'id' | 'status' | 'created_at' | 'updated_at'>
): Promise<EnquirySubmission> {
  const newId = 'enq-' + Date.now();
  const newEnq: EnquirySubmission = {
    ...enquiry,
    id: newId,
    status: 'New',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('isi_enquiries')
        .insert([newEnq])
        .select()
        .single();

      if (!error && data) {
        return data as EnquirySubmission;
      }
    } catch (e) {
      console.warn('Supabase createEnquiry error:', e);
    }
  }

  memoryEnquiries.unshift(newEnq);
  return newEnq;
}

export async function updateEnquiryStatus(
  id: string,
  status: 'New' | 'Contacted' | 'Completed'
): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('isi_enquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (!error) return true;
    } catch (e) {
      console.warn('Supabase updateEnquiryStatus error:', e);
    }
  }

  const enq = memoryEnquiries.find((e) => e.id === id);
  if (enq) {
    enq.status = status;
    enq.updated_at = new Date().toISOString();
    return true;
  }
  return false;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('isi_enquiries').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase deleteEnquiry error:', e);
    }
  }

  const prev = memoryEnquiries.length;
  memoryEnquiries = memoryEnquiries.filter((e) => e.id !== id);
  return memoryEnquiries.length < prev;
}

// ==========================================
// SITE CONTENT
// ==========================================

export async function getSiteContent(): Promise<SiteContent> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('isi_content').select('*');
      if (!error && data && data.length > 0) {
        const content: SiteContent = { ...INITIAL_SITE_CONTENT };
        data.forEach((row: { key: string; value: string }) => {
          if (row.key === 'custom_socials') {
            try {
              (content as any)[row.key] = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
            } catch {
              (content as any)[row.key] = [];
            }
          } else {
            (content as any)[row.key] = row.value;
          }
        });

        // Ensure custom_socials is always an array
        if (!Array.isArray(content.custom_socials)) {
          content.custom_socials = [];
        }

        return content;
      }
    } catch (e) {
      console.warn('Supabase getSiteContent fallback:', e);
    }
  }

  const fallback: SiteContent = { ...INITIAL_SITE_CONTENT, ...memoryContent };
  if (typeof fallback.custom_socials === 'string') {
    try {
      fallback.custom_socials = JSON.parse(fallback.custom_socials);
    } catch {
      fallback.custom_socials = [];
    }
  }
  if (!Array.isArray(fallback.custom_socials)) {
    fallback.custom_socials = [];
  }
  return fallback;
}

export async function updateSiteContent(
  key: keyof SiteContent,
  value: any
): Promise<boolean> {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value ?? '');
  if (supabase) {
    try {
      const { error } = await supabase
        .from('isi_content')
        .upsert({ key, value: stringValue, updated_at: new Date().toISOString() });

      if (!error) return true;
    } catch (e) {
      console.warn('Supabase updateSiteContent error:', e);
    }
  }

  (memoryContent as any)[key] = typeof value === 'object' ? value : value;
  return true;
}
