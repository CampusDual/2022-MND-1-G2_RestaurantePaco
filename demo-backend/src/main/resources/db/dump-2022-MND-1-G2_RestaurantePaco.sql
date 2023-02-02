--
-- PostgreSQL database dump
--

-- Dumped from database version 11.16 (Debian 11.16-0+deb10u1)
-- Dumped by pg_dump version 14.2

-- Started on 2023-02-02 11:14:06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "Master_UDC_2022_G2";
--
-- TOC entry 2974 (class 1262 OID 204968)
-- Name: Master_UDC_2022_G2; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "Master_UDC_2022_G2" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


\connect "Master_UDC_2022_G2"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 2975 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

--
-- TOC entry 207 (class 1259 OID 205824)
-- Name: comanda; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comanda (
    id integer NOT NULL,
    menus character varying(255) NOT NULL,
    mesa integer NOT NULL
);


--
-- TOC entry 206 (class 1259 OID 205822)
-- Name: comanda_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comanda_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2976 (class 0 OID 0)
-- Dependencies: 206
-- Name: comanda_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comanda_id_seq OWNED BY public.comanda.id;


--
-- TOC entry 205 (class 1259 OID 205813)
-- Name: menus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menus (
    id_menu integer NOT NULL,
    nombre_menu character varying(255) NOT NULL,
    plato1 character varying(255) NOT NULL,
    plato2 character varying(255) NOT NULL,
    postre character varying(255) NOT NULL,
    precio integer NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 205811)
-- Name: menus_id_menu_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.menus_id_menu_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2977 (class 0 OID 0)
-- Dependencies: 204
-- Name: menus_id_menu_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.menus_id_menu_seq OWNED BY public.menus.id_menu;


--
-- TOC entry 197 (class 1259 OID 205206)
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id integer NOT NULL,
    description character varying(255),
    name character varying(255)
);


--
-- TOC entry 196 (class 1259 OID 205204)
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2978 (class 0 OID 0)
-- Dependencies: 196
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;


--
-- TOC entry 198 (class 1259 OID 205217)
-- Name: profiles_sections_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles_sections_map (
    profile_id integer NOT NULL,
    section_id integer NOT NULL
);


--
-- TOC entry 200 (class 1259 OID 205225)
-- Name: sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sections (
    id integer NOT NULL,
    alias character varying(255),
    description character varying(255),
    name character varying(255)
);


--
-- TOC entry 199 (class 1259 OID 205223)
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2979 (class 0 OID 0)
-- Dependencies: 199
-- Name: sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sections_id_seq OWNED BY public.sections.id;


--
-- TOC entry 202 (class 1259 OID 205240)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(255),
    name character varying(255),
    nif character varying(255),
    password character varying(255),
    surname1 character varying(255),
    surname2 character varying(255)
);


--
-- TOC entry 201 (class 1259 OID 205236)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2980 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 203 (class 1259 OID 205249)
-- Name: users_profiles_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_profiles_map (
    user_id integer NOT NULL,
    profile_id integer NOT NULL
);


--
-- TOC entry 2815 (class 2604 OID 205827)
-- Name: comanda id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comanda ALTER COLUMN id SET DEFAULT nextval('public.comanda_id_seq'::regclass);


--
-- TOC entry 2814 (class 2604 OID 205816)
-- Name: menus id_menu; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus ALTER COLUMN id_menu SET DEFAULT nextval('public.menus_id_menu_seq'::regclass);


--
-- TOC entry 2811 (class 2604 OID 205209)
-- Name: profiles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);


--
-- TOC entry 2812 (class 2604 OID 205230)
-- Name: sections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sections ALTER COLUMN id SET DEFAULT nextval('public.sections_id_seq'::regclass);


--
-- TOC entry 2813 (class 2604 OID 205243)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2968 (class 0 OID 205824)
-- Dependencies: 207
-- Data for Name: comanda; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comanda VALUES (2, 'Menú Coruña', 5);
INSERT INTO public.comanda VALUES (12, 'Menú Lisboa', 1);
INSERT INTO public.comanda VALUES (13, 'Menú Infantil', 1);
INSERT INTO public.comanda VALUES (14, 'Menú Ferrol', 2);
INSERT INTO public.comanda VALUES (17, 'Menú Infantil', 7);
INSERT INTO public.comanda VALUES (18, 'Menú Infantil', 6);
INSERT INTO public.comanda VALUES (11, 'Menú Valencia', 1);
INSERT INTO public.comanda VALUES (20, 'Menú Oviedo', 7);
INSERT INTO public.comanda VALUES (19, 'Menú Vigo', 5);
INSERT INTO public.comanda VALUES (21, 'Menú Infantil', 3);
INSERT INTO public.comanda VALUES (23, 'Menú Barcelona', 4);


--
-- TOC entry 2966 (class 0 OID 205813)
-- Dependencies: 205
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.menus VALUES (4, 'Menú Santiago', 'Pulpo', 'Arroz con bogavante', 'Tarta de Santiago', 35);
INSERT INTO public.menus VALUES (6, 'Menú Lisboa', 'Sardinas', 'Bacalao', 'Pasteles de Belén', 20);
INSERT INTO public.menus VALUES (7, 'Menú Ourense', 'Caldo', 'Churrasco', 'Queso con membrillo', 15);
INSERT INTO public.menus VALUES (9, 'Menú Pontevedra', 'Zamburiñas', 'Lenguado a la plancha', 'Milhojas', 23);
INSERT INTO public.menus VALUES (10, 'Menú Barcelona', 'Tosta', 'Arroz negro', 'Crema catalana', 13);
INSERT INTO public.menus VALUES (11, 'Menú Valencia', 'Esgarraet', 'Paella', 'Horchata', 20);
INSERT INTO public.menus VALUES (12, 'Menú Infantil', 'Croquetas', 'Milanesa con patatas', 'Helado', 10);
INSERT INTO public.menus VALUES (8, 'Menú Ferrol', 'Mejillones ', 'Carne ao caldeiro', 'Tiramisú', 14);
INSERT INTO public.menus VALUES (1, 'Menú Coruña', 'Callos', 'Raxo con patatas', 'Tarta de Queso', 26);
INSERT INTO public.menus VALUES (3, 'Menú Lugo', 'Empanada', 'Cocido', 'Tarta de la abuela', 18);
INSERT INTO public.menus VALUES (5, 'Menú Oviedo', 'Fabada', 'Cachopo', 'Arroz con leche', 27);
INSERT INTO public.menus VALUES (2, 'Menú Vigo', 'Tortilla', 'Lubina al horno', 'Flan', 20);


--
-- TOC entry 2958 (class 0 OID 205206)
-- Dependencies: 197
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.profiles VALUES (1, 'Acceso general', 'Administrador');
INSERT INTO public.profiles VALUES (2, 'Acceso general', 'Camarero');
INSERT INTO public.profiles VALUES (3, 'Acceso general', 'Cocinero');


--
-- TOC entry 2959 (class 0 OID 205217)
-- Dependencies: 198
-- Data for Name: profiles_sections_map; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.profiles_sections_map VALUES (1, 1);
INSERT INTO public.profiles_sections_map VALUES (3, 2);
INSERT INTO public.profiles_sections_map VALUES (2, 1);
INSERT INTO public.profiles_sections_map VALUES (3, 1);
INSERT INTO public.profiles_sections_map VALUES (1, 2);


--
-- TOC entry 2961 (class 0 OID 205225)
-- Dependencies: 200
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sections VALUES (1, 'CONTACTS', 'Perfiles y secciones a los que puede acceder cada perfil.', 'Contactos');
INSERT INTO public.sections VALUES (2, 'MENUS', 'Lista de menús', 'Menús');


--
-- TOC entry 2963 (class 0 OID 205240)
-- Dependencies: 202
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'demo', 'Demo', NULL, 'C5rCRzh9s2DPHYrnnLS/eg==', 'Demo', NULL);
INSERT INTO public.users VALUES (2, 'lugasan@gmail.com', 'Lucía', '28379103F', '97NOCbawv32dhs6mUySZ/g==', 'García', 'Sánchez');
INSERT INTO public.users VALUES (3, 'maferblan@gmail.com', 'Manuel', '29639263D', '6u1c4jxvo5djippAOSlruw==', 'Fernández', 'Blanco');


--
-- TOC entry 2964 (class 0 OID 205249)
-- Dependencies: 203
-- Data for Name: users_profiles_map; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users_profiles_map VALUES (1, 1);
INSERT INTO public.users_profiles_map VALUES (2, 2);
INSERT INTO public.users_profiles_map VALUES (3, 3);


--
-- TOC entry 2981 (class 0 OID 0)
-- Dependencies: 206
-- Name: comanda_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comanda_id_seq', 23, true);


--
-- TOC entry 2982 (class 0 OID 0)
-- Dependencies: 204
-- Name: menus_id_menu_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.menus_id_menu_seq', 17, true);


--
-- TOC entry 2983 (class 0 OID 0)
-- Dependencies: 196
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.profiles_id_seq', 1, true);


--
-- TOC entry 2984 (class 0 OID 0)
-- Dependencies: 199
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sections_id_seq', 1, true);


--
-- TOC entry 2985 (class 0 OID 0)
-- Dependencies: 201
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 2831 (class 2606 OID 205829)
-- Name: comanda comanda_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comanda
    ADD CONSTRAINT comanda_pkey PRIMARY KEY (id);


--
-- TOC entry 2829 (class 2606 OID 205821)
-- Name: menus menus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pkey PRIMARY KEY (id_menu);


--
-- TOC entry 2817 (class 2606 OID 205214)
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 2819 (class 2606 OID 205235)
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- TOC entry 2821 (class 2606 OID 205260)
-- Name: sections uk_3hhqmvx0pt70xjvmjdo5a76go; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT uk_3hhqmvx0pt70xjvmjdo5a76go UNIQUE (alias);


--
-- TOC entry 2823 (class 2606 OID 205262)
-- Name: users uk_ow0gan20590jrb00upg3va2fn; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_ow0gan20590jrb00upg3va2fn UNIQUE (login);


--
-- TOC entry 2825 (class 2606 OID 205248)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2827 (class 2606 OID 205256)
-- Name: users_profiles_map users_profiles_map_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles_map
    ADD CONSTRAINT users_profiles_map_pkey PRIMARY KEY (user_id, profile_id);


--
-- TOC entry 2835 (class 2606 OID 205278)
-- Name: users_profiles_map fkgu8qveimyui706fn78n4xbenf; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles_map
    ADD CONSTRAINT fkgu8qveimyui706fn78n4xbenf FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2832 (class 2606 OID 205263)
-- Name: profiles_sections_map fkkqferkfgrrnho62b21rya9ej9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles_sections_map
    ADD CONSTRAINT fkkqferkfgrrnho62b21rya9ej9 FOREIGN KEY (section_id) REFERENCES public.sections(id);


--
-- TOC entry 2833 (class 2606 OID 205268)
-- Name: profiles_sections_map fknbjkd2pgwcyijblewp1d33rox; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles_sections_map
    ADD CONSTRAINT fknbjkd2pgwcyijblewp1d33rox FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- TOC entry 2834 (class 2606 OID 205273)
-- Name: users_profiles_map fksv94wyv9yb3b2hmvr5f48o281; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles_map
    ADD CONSTRAINT fksv94wyv9yb3b2hmvr5f48o281 FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


-- Completed on 2023-02-02 11:14:09

--
-- PostgreSQL database dump complete
--

