-- Table: public.UrlAccessBrowser

-- DROP TABLE IF EXISTS public."UrlAccessBrowser";

CREATE TABLE IF NOT EXISTS public."UrlAccessBrowser"
(
    "Id" bigint NOT NULL DEFAULT nextval('"UrlAccessBrowser_Id_seq"'::regclass),
    "UrlId" bigint NOT NULL,
    "Browser" text COLLATE pg_catalog."default" NOT NULL,
    "Count" bigint NOT NULL,
    CONSTRAINT "UrlAccessBrowser_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "UrlId" FOREIGN KEY ("UrlId")
        REFERENCES public."Url" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UrlAccessBrowser"
    OWNER to postgres;