// src/lib/supabase.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export interface Category {
  id?: string;
  key: string;
  label: string;
  desc?: string;
}

export interface PortfolioItem {
  id: string;
  category: string;
  categoryLabel?: string;
  image: string;
  alt: string;
  title?: string;
  sizeClass?: string;
  created_at?: string;
}

export interface ContactSettings {
  whatsapp?: string;
  phone?: string;
  instagram?: string;
  address?: string;
  hours?: string;
}

// 1. Datos iniciales de catálogo Bauhaus (Seed de respaldo oficial)
export const DEFAULT_CATEGORIES: Category[] = [
  { key: 'retratos', label: 'Retratos', desc: 'Retratos personales y fotografía de estudio editorial' },
  { key: 'corporativo', label: 'Empresas & Negocios', desc: 'Fotografía comercial para instalaciones y marcas' },
  { key: 'hoteles', label: 'Hoteles & Espacios', desc: 'Turismo, hostelería y arquitectura' },
  { key: 'dron', label: 'Dron & Aéreo', desc: 'Tomas panorámicas aéreas de paisajes y propiedades' }
];

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p1',
    category: 'retratos',
    categoryLabel: 'Retratos',
    image: '/imagenes/8892d99e-b592-440d-b1f6-8f44f9d1ece1.jpg',
    alt: 'Retrato editorial — sesión fotográfica profesional',
    title: 'Retrato Editorial'
  },
  {
    id: 'p2',
    category: 'hoteles',
    categoryLabel: 'Eventos',
    image: '/imagenes/1ffc9d4d-dd7c-46d2-9018-0d03835c1030.jpg',
    alt: 'Ceremonias y eventos — fotografía de boda en exterior',
    sizeClass: 'portfolio__item--wide',
    title: 'Eventos en Exteriores'
  },
  {
    id: 'p3',
    category: 'retratos',
    categoryLabel: 'Retratos',
    image: '/imagenes/c7282eb5-83ca-4c6a-ba60-21c7d1e503e9.jpg',
    alt: 'Retrato de estudio — sesión individual',
    title: 'Retrato en Estudio'
  },
  {
    id: 'p4',
    category: 'retratos',
    categoryLabel: 'Retratos',
    image: '/imagenes/5c400274-ebb6-4011-a660-000f9726e8d8.jpg',
    alt: 'Retrato creativo — fotografía editorial',
    sizeClass: 'portfolio__item--tall',
    title: 'Retrato Creativo'
  },
  {
    id: 'p5',
    category: 'corporativo',
    categoryLabel: 'Corporativo',
    image: '/imagenes/dbf740b7-4147-45c8-8663-60e345891e77.jpg',
    alt: 'Evento corporativo — fotografía de pareja',
    title: 'Comercial & Pareja'
  },
  {
    id: 'p6',
    category: 'retratos',
    categoryLabel: 'Retratos',
    image: '/imagenes/e7c0f339-ae49-41b0-8fad-61c3415914de.jpg',
    alt: 'Retrato editorial — luz natural y expresión',
    title: 'Luz Natural'
  },
  {
    id: 'p7',
    category: 'hoteles',
    categoryLabel: 'Hoteles',
    image: '/imagenes/85060db9-4bcd-45bf-bc06-72ae9053dc8b.jpg',
    alt: 'Fotografía de hotel — espacios y detalles',
    title: 'Espacios Hoteleros'
  },
  {
    id: 'p8',
    category: 'corporativo',
    categoryLabel: 'Corporativo',
    image: '/imagenes/40b5dc37-3a9d-444f-8a4c-a47219818668.jpg',
    alt: 'Producción audiovisual — detrás de cámaras',
    title: 'Producción Audiovisual'
  },
  {
    id: 'p9',
    category: 'retratos',
    categoryLabel: 'Retratos',
    image: '/imagenes/592403512_18033143426770155_1529202580814031402_n.jpg',
    alt: 'Sesión fotográfica profesional de retrato',
    title: 'HAUS Identidad'
  }
];

export const DEFAULT_SETTINGS: ContactSettings = {
  whatsapp: '593960447114',
  phone: '+593 96 044 7114',
  instagram: 'https://www.instagram.com/haus_cm',
  address: 'Mindo, Los Bancos — Pichincha, Ecuador',
  hours: 'Lunes a Viernes: 08:00 - 18:00 | Sábados: 08:00 - 14:00'
};

// 2. Obtener credenciales de Supabase
export function getSupabaseCredentials(): { url: string; key: string } {
  let envUrl = '';
  let envKey = '';

  try {
    envUrl = (import.meta.env.PUBLIC_SUPABASE_URL || '').trim();
    envKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '').trim();
  } catch (e) {}

  if (typeof window !== 'undefined') {
    const overrideUrl = localStorage.getItem('haus_supabase_url');
    const overrideKey = localStorage.getItem('haus_supabase_key');
    if (overrideUrl && overrideKey) {
      envUrl = overrideUrl.trim();
      envKey = overrideKey.trim();
    }
  }

  // Asegurar protocolo https:// si el usuario ingresó únicamente el dominio
  if (envUrl && !envUrl.startsWith('http://') && !envUrl.startsWith('https://')) {
    envUrl = `https://${envUrl}`;
  }

  return {
    url: envUrl || '',
    key: envKey || ''
  };
}

// 3. Verificación de configuración de Supabase
// Se valida la presencia de las variables de entorno sin bloqueos arbitrarios
export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseCredentials();
  return Boolean(
    url &&
    key &&
    (url.startsWith('https://') || url.startsWith('http://')) &&
    key.length > 5
  );
}

// 4. Instancia de cliente Supabase singleton
let clientInstance: SupabaseClient | null = null;
let lastUrl = '';
let lastKey = '';

export function getSupabaseClient(): SupabaseClient {
  const { url, key } = getSupabaseCredentials();
  if (!clientInstance || lastUrl !== url || lastKey !== key) {
    lastUrl = url;
    lastKey = key;
    clientInstance = createClient(
      url || 'https://tu-proyecto.supabase.co',
      key || 'tu-anon-public-key-aqui',
      {
        auth: { persistSession: false }
      }
    );
  }
  return clientInstance;
}

export const supabase = getSupabaseClient();

// ============================================================
// 5. OPERACIONES CRUD EN TABLAS POSTGRESQL (PERSISTENCIA REAL)
// ============================================================

// --- CATEGORÍAS ---
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    try {
      const sb = getSupabaseClient();
      const { data, error } = await sb
        .from('categories')
        .select('*')
        .order('label', { ascending: true });

      if (error) {
        console.warn('[Supabase getCategories DB Error]:', error.message);
        return DEFAULT_CATEGORIES;
      }

      if (data && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          key: item.key,
          label: item.label,
          desc: item.description || item.desc || ''
        }));
      }
    } catch (err: any) {
      console.warn('[Supabase getCategories Exception]:', err?.message);
    }
  }
  return DEFAULT_CATEGORIES;
}

export async function createCategory(cat: { key: string; label: string; desc?: string }): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase no está configurado. Por favor configura PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY en tu .env.' };
  }
  try {
    const sb = getSupabaseClient();
    const { error } = await sb.from('categories').insert([
      {
        key: cat.key,
        label: cat.label,
        description: cat.desc || ''
      }
    ]);
    if (error) {
      console.error('[Supabase createCategory Error]:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('[Supabase createCategory Exception]:', err);
    return { success: false, error: err?.message || 'Error inesperado al conectar con Supabase' };
  }
}

export async function updateCategory(originalKey: string, cat: { key: string; label: string; desc?: string }): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase no está configurado.' };
  }
  try {
    const sb = getSupabaseClient();
    const { error } = await sb.from('categories').update({
      key: cat.key,
      label: cat.label,
      description: cat.desc || ''
    }).eq('key', originalKey);

    if (error) {
      console.error('[Supabase updateCategory Error]:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('[Supabase updateCategory Exception]:', err);
    return { success: false, error: err?.message || 'Error al actualizar categoría en Supabase' };
  }
}

export async function deleteCategory(key: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase no está configurado.' };
  }
  try {
    const sb = getSupabaseClient();
    const { error } = await sb.from('categories').delete().eq('key', key);
    if (error) {
      console.error('[Supabase deleteCategory Error]:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('[Supabase deleteCategory Exception]:', err);
    return { success: false, error: err?.message || 'Error al eliminar categoría en Supabase' };
  }
}

// --- PORTAFOLIO / FOTOGRAFÍAS ---
export async function getPortfolio(): Promise<PortfolioItem[]> {
  if (isSupabaseConfigured()) {
    try {
      const sb = getSupabaseClient();
      const { data, error } = await sb
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[Supabase getPortfolio DB Error]:', error.message);
        return DEFAULT_PORTFOLIO;
      }

      if (data) {
        return data.map((item: any) => {
          const catMatch = DEFAULT_CATEGORIES.find(c => c.key === item.category);
          return {
            id: String(item.id),
            category: item.category || 'general',
            categoryLabel: item.category_label || (catMatch ? catMatch.label : item.category) || 'General',
            image: item.image_url || item.image || '',
            alt: item.alt || item.title || '',
            title: item.title || item.alt || '',
            sizeClass: item.size_class || '',
            created_at: item.created_at
          };
        });
      }
    } catch (err: any) {
      console.warn('[Supabase getPortfolio Exception]:', err?.message);
    }
  }
  return DEFAULT_PORTFOLIO;
}

export async function createPortfolioItem(item: PortfolioItem): Promise<{ success: boolean; item?: PortfolioItem; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase no está configurado. Por favor configura tus credenciales.' };
  }
  try {
    const sb = getSupabaseClient();
    
    // 1. Intentar inserción con esquema completo
    const payloadFull: any = {
      id: item.id,
      title: item.title || '',
      category: item.category,
      category_label: item.categoryLabel || item.category,
      image: item.image,
      image_url: item.image,
      alt: item.alt,
      size_class: item.sizeClass || ''
    };

    let { data, error } = await sb.from('portfolio').insert([payloadFull]).select();

    // 2. Si falla por columnas que no existen en el schema cache (como alt o image), usar esquema compatible
    if (error && (error.code === 'PGRST204' || error.message.includes('column'))) {
      const payloadCompat: any = {
        id: item.id,
        title: item.title || item.alt || '',
        category: item.category,
        image_url: item.image
      };
      const retry = await sb.from('portfolio').insert([payloadCompat]).select();
      error = retry.error;
      data = retry.data;
    }

    if (error) {
      console.error('[Supabase createPortfolioItem DB Error]:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, item };
  } catch (err: any) {
    console.error('[Supabase createPortfolioItem Exception]:', err);
    return { success: false, error: err?.message || 'Error al insertar registro en la tabla portfolio' };
  }
}

export async function updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase no está configurado.' };
  }
  try {
    const sb = getSupabaseClient();
    const payloadFull: any = {};
    if (updates.title !== undefined) payloadFull.title = updates.title;
    if (updates.category !== undefined) payloadFull.category = updates.category;
    if (updates.categoryLabel !== undefined) payloadFull.category_label = updates.categoryLabel;
    if (updates.alt !== undefined) payloadFull.alt = updates.alt;
    if (updates.sizeClass !== undefined) payloadFull.size_class = updates.sizeClass;
    if (updates.image !== undefined) {
      payloadFull.image = updates.image;
      payloadFull.image_url = updates.image;
    }

    let { error } = await sb.from('portfolio').update(payloadFull).eq('id', id);

    // Si falla por columna no existente en schema cache, reintentar con esquema compatible
    if (error && (error.code === 'PGRST204' || error.message.includes('column'))) {
      const payloadCompat: any = {};
      if (updates.title !== undefined) payloadCompat.title = updates.title;
      if (updates.category !== undefined) payloadCompat.category = updates.category;
      if (updates.image !== undefined) payloadCompat.image_url = updates.image;

      const retry = await sb.from('portfolio').update(payloadCompat).eq('id', id);
      error = retry.error;
    }

    if (error) {
      console.error('[Supabase updatePortfolioItem Error]:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('[Supabase updatePortfolioItem Exception]:', err);
    return { success: false, error: err?.message || 'Error al actualizar fotografía en Supabase' };
  }
}

export async function deletePortfolioItem(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase no está configurado.' };
  }
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Supabase deletePortfolioItem Error]:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('[Supabase deletePortfolioItem Exception]:', err);
    return { success: false, error: err?.message || 'Error al eliminar fotografía en Supabase' };
  }
}

// --- SUBIDA FÍSICA DE IMÁGENES A SUPABASE STORAGE ---
export async function uploadPortfolioImage(file: File): Promise<{ url?: string; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { error: 'Supabase no está configurado. Por favor configura las variables de entorno de Supabase.' };
  }
  try {
    const sb = getSupabaseClient();
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${cleanFileName}`;

    // 1. Subida física al bucket 'portfolio' de Supabase Storage
    const { data: uploadData, error: uploadError } = await sb.storage
      .from('portfolio')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      // 2. Reintento en raíz del bucket
      const { data: retryData, error: retryError } = await sb.storage
        .from('portfolio')
        .upload(cleanFileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (retryError) {
        console.error('[Supabase Storage Upload Error]:', retryError);
        return { error: `Error en Storage de Supabase (${retryError.message}). Asegúrate de haber ejecutado 'supabase-setup.sql' y que el bucket 'portfolio' sea público.` };
      }

      const { data: urlData } = sb.storage.from('portfolio').getPublicUrl(cleanFileName);
      if (!urlData?.publicUrl) {
        return { error: 'No se pudo obtener la URL pública de la imagen en Supabase Storage.' };
      }
      return { url: urlData.publicUrl };
    }

    // 3. Obtener URL pública oficial
    const { data: urlData } = sb.storage.from('portfolio').getPublicUrl(filePath);
    if (!urlData?.publicUrl) {
      return { error: 'No se pudo generar la URL pública de la fotografía en Supabase Storage.' };
    }

    return { url: urlData.publicUrl };
  } catch (err: any) {
    console.error('[Supabase Storage Upload Exception]:', err);
    return { error: err?.message || 'Error inesperado durante la subida al Storage de Supabase' };
  }
}

// --- CONFIGURACIÓN DE CONTACTO Y REDES SOCIALES ---
export async function getSettings(): Promise<ContactSettings> {
  const currentSettings: ContactSettings = { ...DEFAULT_SETTINGS };
  if (isSupabaseConfigured()) {
    try {
      const sb = getSupabaseClient();
      const { data, error } = await sb.from('settings').select('*');
      if (error) {
        console.warn('[Supabase getSettings Error]:', error.message);
        return currentSettings;
      }
      if (data && data.length > 0) {
        data.forEach((row: any) => {
          if (row.key === 'whatsapp') currentSettings.whatsapp = String(row.value || '').replace(/\D/g, '');
          if (row.key === 'phone') currentSettings.phone = row.value;
          if (row.key === 'instagram') currentSettings.instagram = row.value;
          if (row.key === 'address') currentSettings.address = row.value;
          if (row.key === 'hours') currentSettings.hours = row.value;
        });
        return currentSettings;
      }
    } catch (err: any) {
      console.warn('[Supabase getSettings Exception]:', err?.message);
    }
  }
  return currentSettings;
}

export async function saveAllSettings(settings: ContactSettings): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase no está configurado.' };
  }
  try {
    const sb = getSupabaseClient();
    const cleanWa = String(settings.whatsapp || DEFAULT_SETTINGS.whatsapp || '').replace(/\D/g, '');
    const rows = [
      { key: 'whatsapp', value: cleanWa, updated_at: new Date().toISOString() },
      { key: 'phone', value: settings.phone || DEFAULT_SETTINGS.phone || '', updated_at: new Date().toISOString() },
      { key: 'instagram', value: settings.instagram || DEFAULT_SETTINGS.instagram || '', updated_at: new Date().toISOString() },
      { key: 'address', value: settings.address || DEFAULT_SETTINGS.address || '', updated_at: new Date().toISOString() },
      { key: 'hours', value: settings.hours || DEFAULT_SETTINGS.hours || '', updated_at: new Date().toISOString() }
    ];

    const { error } = await sb.from('settings').upsert(rows, { onConflict: 'key' });
    if (error) {
      console.error('[Supabase saveAllSettings Error]:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('[Supabase saveAllSettings Exception]:', err);
    return { success: false, error: err?.message || 'Error al persistir la configuración en la base de datos de Supabase' };
  }
}

export async function updateSetting(key: string, value: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase no está configurado.' };
  }
  try {
    const sb = getSupabaseClient();
    const { error } = await sb.from('settings').upsert({
      key,
      value,
      updated_at: new Date().toISOString()
    }, { onConflict: 'key' });

    if (error) {
      console.error(`[Supabase updateSetting Error (${key})]:`, error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || `Error al actualizar ${key}` };
  }
}
