-- Table: public.UrlAccessDay

-- DROP TABLE IF EXISTS public."UrlAccessDay";

CREATE TABLE IF NOT EXISTS public."UrlAccessDay"
(
    "Id" bigint NOT NULL DEFAULT nextval('"UrlAccessDay_Id_seq"'::regclass),
    "UrlId" bigint NOT NULL,
    "Day" integer,
    "Count" bigint,
    CONSTRAINT "UrlAccessDay_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "UrlId" FOREIGN KEY ("UrlId")
        REFERENCES public."Url" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UrlAccessDay"
    OWNER to postgres;