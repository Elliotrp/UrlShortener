-- Table: public.UrlAccessCountry

-- DROP TABLE IF EXISTS public."UrlAccessCountry";

CREATE TABLE IF NOT EXISTS public."UrlAccessCountry"
(
    "Id" bigint NOT NULL DEFAULT nextval('"UrlAccessCountry_Id_seq"'::regclass),
    "UrlId" bigint NOT NULL,
    "CountryCode" character varying(3) COLLATE pg_catalog."default" NOT NULL,
    "Count" bigint NOT NULL,
    CONSTRAINT "UrlAccessCountry_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "UrlId" FOREIGN KEY ("UrlId")
        REFERENCES public."Url" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UrlAccessCountry"
    OWNER to postgres;