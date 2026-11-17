-- ============================================================
-- HAUS COMMUNITY FOTOGRAFÍA - Supabase Database Schema & Setup
-- ============================================================
-- Este script configura la base de datos completa para persistencia real:
-- Tablas: categories, portfolio, settings
-- Políticas de seguridad RLS (Row Level Security)
-- Bucket de almacenamiento para fotografías
-- Datos iniciales (Seed) del catálogo Bauhaus
-- ============================================================

-- 1. TABLA DE CATEGORÍAS
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    description TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABLA DE PORTAFOLIO / FOTOGRAFÍAS
CREATE TABLE IF NOT EXISTS public.portfolio (
    id TEXT PRIMARY KEY,
    title TEXT DEFAULT '',
    category TEXT NOT NULL,
    category_label TEXT NOT NULL,
    image TEXT NOT NULL,
    alt TEXT NOT NULL,
    size_class TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA DE CONFIGURACIÓN Y CONTACTO
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- HABILITACIÓN DE SEGURIDAD RLS (ROW LEVEL SECURITY)
-- ============================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (cualquier visitante del sitio web puede leer)
DROP POLICY IF EXISTS "Permitir lectura publica de categorias" ON public.categories;
CREATE POLICY "Permitir lectura publica de categorias" 
    ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir lectura publica de portafolio" ON public.portfolio;
CREATE POLICY "Permitir lectura publica de portafolio" 
    ON public.portfolio FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir lectura publica de configuracion" ON public.settings;
CREATE POLICY "Permitir lectura publica de configuracion" 
    ON public.settings FOR SELECT USING (true);

-- Políticas de escritura (inserción, actualización, eliminación) para el admin
-- (Permite a la clave pública/anon de la aplicación realizar operaciones CRUD)
DROP POLICY IF EXISTS "Permitir insertar categorias" ON public.categories;
CREATE POLICY "Permitir insertar categorias" 
    ON public.categories FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualizar categorias" ON public.categories;
CREATE POLICY "Permitir actualizar categorias" 
    ON public.categories FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir eliminar categorias" ON public.categories;
CREATE POLICY "Permitir eliminar categorias" 
    ON public.categories FOR DELETE USING (true);

DROP POLICY IF EXISTS "Permitir insertar portafolio" ON public.portfolio;
CREATE POLICY "Permitir insertar portafolio" 
    ON public.portfolio FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualizar portafolio" ON public.portfolio;
CREATE POLICY "Permitir actualizar portafolio" 
    ON public.portfolio FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir eliminar portafolio" ON public.portfolio;
CREATE POLICY "Permitir eliminar portafolio" 
    ON public.portfolio FOR DELETE USING (true);

DROP POLICY IF EXISTS "Permitir insertar configuracion" ON public.settings;
CREATE POLICY "Permitir insertar configuracion" 
    ON public.settings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualizar configuracion" ON public.settings;
CREATE POLICY "Permitir actualizar configuracion" 
    ON public.settings FOR UPDATE USING (true);

-- ============================================================
-- CONFIGURACIÓN DE STORAGE BUCKET PARA FOTOGRAFÍAS
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Permitir acceso publico a imagenes" ON storage.objects;
CREATE POLICY "Permitir acceso publico a imagenes" 
    ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Permitir subida de imagenes" ON storage.objects;
CREATE POLICY "Permitir subida de imagenes" 
    ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Permitir eliminar imagenes" ON storage.objects;
CREATE POLICY "Permitir eliminar imagenes" 
    ON storage.objects FOR DELETE USING (bucket_id = 'portfolio');

-- ============================================================
-- DATOS INICIALES (SEED DATA DE HAUS COMMUNITY)
-- ============================================================

-- Categorías
INSERT INTO public.categories (key, label, description) VALUES
    ('retratos', 'Retratos', 'Retratos personales y fotografía de estudio editorial'),
    ('corporativo', 'Empresas & Negocios', 'Fotografía comercial para instalaciones y marcas'),
    ('hoteles', 'Hoteles & Espacios', 'Turismo, hostelería y arquitectura'),
    ('dron', 'Dron & Aéreo', 'Tomas panorámicas aéreas de paisajes y propiedades')
ON CONFLICT (key) DO UPDATE 
SET label = EXCLUDED.label, description = EXCLUDED.description;

-- Fotografías del Portafolio
INSERT INTO public.portfolio (id, category, category_label, image, alt, size_class, title) VALUES
    ('p1', 'retratos', 'Retratos', '/imagenes/8892d99e-b592-440d-b1f6-8f44f9d1ece1.jpg', 'Retrato editorial — sesión fotográfica profesional', '', 'Retrato Editorial'),
    ('p2', 'hoteles', 'Eventos', '/imagenes/1ffc9d4d-dd7c-46d2-9018-0d03835c1030.jpg', 'Ceremonias y eventos — fotografía de boda en exterior', 'portfolio__item--wide', 'Eventos en Exteriores'),
    ('p3', 'retratos', 'Retratos', '/imagenes/c7282eb5-83ca-4c6a-ba60-21c7d1e503e9.jpg', 'Retrato de estudio — sesión individual', '', 'Retrato en Estudio'),
    ('p4', 'retratos', 'Retratos', '/imagenes/5c400274-ebb6-4011-a660-000f9726e8d8.jpg', 'Retrato creativo — fotografía editorial', 'portfolio__item--tall', 'Retrato Creativo'),
    ('p5', 'corporativo', 'Corporativo', '/imagenes/dbf740b7-4147-45c8-8663-60e345891e77.jpg', 'Evento corporativo — fotografía de pareja', '', 'Comercial & Pareja'),
    ('p6', 'retratos', 'Retratos', '/imagenes/e7c0f339-ae49-41b0-8fad-61c3415914de.jpg', 'Retrato editorial — luz natural y expresión', '', 'Luz Natural'),
    ('p7', 'hoteles', 'Hoteles', '/imagenes/85060db9-4bcd-45bf-bc06-72ae9053dc8b.jpg', 'Fotografía de hotel — espacios y detalles', '', 'Espacios Hoteleros'),
    ('p8', 'corporativo', 'Corporativo', '/imagenes/40b5dc37-3a9d-444f-8a4c-a47219818668.jpg', 'Producción audiovisual — detrás de cámaras', '', 'Producción Audiovisual'),
    ('p9', 'retratos', 'Retratos', '/imagenes/592403512_18033143426770155_1529202580814031402_n.jpg', 'Sesión fotográfica profesional de retrato', '', 'HAUS Identidad')
ON CONFLICT (id) DO UPDATE 
SET category = EXCLUDED.category, category_label = EXCLUDED.category_label, image = EXCLUDED.image, alt = EXCLUDED.alt, size_class = EXCLUDED.size_class, title = EXCLUDED.title;

-- Ajustes de Contacto
INSERT INTO public.settings (key, value) VALUES
    ('whatsapp', '593999999999'),
    ('phone', '+593 99 999 9999'),
    ('instagram', 'https://www.instagram.com/haus_cm'),
    ('address', 'Mindo, Los Bancos — Pichincha, Ecuador'),
    ('hours', 'Lunes a Viernes: 08:00 - 18:00 | Sábados: 08:00 - 14:00')
ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value, updated_at = timezone('utc'::text, now());

