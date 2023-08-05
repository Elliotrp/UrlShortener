-- Table: public.UrlAccessOperatingSystem

-- DROP TABLE IF EXISTS public."UrlAccessOperatingSystem";

CREATE TABLE IF NOT EXISTS public."UrlAccessOperatingSystem"
(
    "Id" bigint NOT NULL DEFAULT nextval('"UrlAccessOperatingSystem_Id_seq"'::regclass),
    "UrlId" bigint NOT NULL,
    "OperatingSystem" text COLLATE pg_catalog."default" NOT NULL,
    "Count" bigint NOT NULL,
    CONSTRAINT "UrlAccessOperatingSystem_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "UrlId" FOREIGN KEY ("UrlId")
        REFERENCES public."Url" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UrlAccessOperatingSystem"
    OWNER to postgres;