-- Table: public.Url

-- DROP TABLE IF EXISTS public."Url";

CREATE TABLE IF NOT EXISTS public."Url"
(
    "Id" bigint NOT NULL DEFAULT nextval('"Url_Id_seq"'::regclass),
    "ShortUrl" text COLLATE pg_catalog."default" NOT NULL,
    "CreatedDate" timestamp without time zone NOT NULL,
    "TargetUrl" text COLLATE pg_catalog."default" NOT NULL,
    "Password" text COLLATE pg_catalog."default",
    CONSTRAINT "Url_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "Unique_ShortUrl" UNIQUE ("ShortUrl")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Url"
    OWNER to postgres;