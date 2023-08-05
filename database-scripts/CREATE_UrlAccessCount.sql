-- Table: public.UrlAccessCount

-- DROP TABLE IF EXISTS public."UrlAccessCount";

CREATE TABLE IF NOT EXISTS public."UrlAccessCount"
(
    "Id" bigint NOT NULL DEFAULT nextval('"UrlAccessCount_Id_seq"'::regclass),
    "UrlId" bigint NOT NULL,
    "Count" bigint NOT NULL,
    CONSTRAINT "UrlAccessCount_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "UrlId" FOREIGN KEY ("UrlId")
        REFERENCES public."Url" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UrlAccessCount"
    OWNER to postgres;