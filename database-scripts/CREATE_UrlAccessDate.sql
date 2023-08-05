-- Table: public.UrlAccessDate

-- DROP TABLE IF EXISTS public."UrlAccessDate";

CREATE TABLE IF NOT EXISTS public."UrlAccessDate"
(
    "Id" bigint NOT NULL DEFAULT nextval('"UrlAccessDate_Id_seq"'::regclass),
    "UrlId" bigint NOT NULL,
    "Date" date NOT NULL,
    "Count" bigint NOT NULL,
    CONSTRAINT "UrlAccessDate_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "UrlId" FOREIGN KEY ("UrlId")
        REFERENCES public."Url" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UrlAccessDate"
    OWNER to postgres;