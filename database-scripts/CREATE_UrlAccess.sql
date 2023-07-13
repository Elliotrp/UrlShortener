-- Table: public.UrlAccess

-- DROP TABLE IF EXISTS public."UrlAccess";

CREATE TABLE IF NOT EXISTS public."UrlAccess"
(
    "Id" bigint NOT NULL DEFAULT nextval('"UrlAccess_UrlAccessId_seq"'::regclass),
    "UrlId" bigint NOT NULL DEFAULT nextval('"UrlAccess_UrlId_seq"'::regclass),
    "AccessedDate" timestamp without time zone NOT NULL,
    "Browser" text COLLATE pg_catalog."default",
    "DeviceType" text COLLATE pg_catalog."default",
    "OperatingSystem" text COLLATE pg_catalog."default",
    "Location" point,
    "Authorised" boolean,
    "Country" text COLLATE pg_catalog."default",
    CONSTRAINT "UrlAccess_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "Foreign_UrlAccess_UrlId" FOREIGN KEY ("UrlId")
        REFERENCES public."Url" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UrlAccess"
    OWNER to postgres;