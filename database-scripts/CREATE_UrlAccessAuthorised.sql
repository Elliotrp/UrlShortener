-- Table: public.UrlAccessAuthorised

-- DROP TABLE IF EXISTS public."UrlAccessAuthorised";

CREATE TABLE IF NOT EXISTS public."UrlAccessAuthorised"
(
    "Id" bigint NOT NULL DEFAULT nextval('"UrlAccessAuthorisation_Id_seq"'::regclass),
    "UrlId" bigint NOT NULL,
    "Authorised" boolean NOT NULL,
    "Count" bigint NOT NULL,
    CONSTRAINT "UrlAccessAuthorisation_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "UrlId" FOREIGN KEY ("UrlId")
        REFERENCES public."Url" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UrlAccessAuthorised"
    OWNER to postgres;