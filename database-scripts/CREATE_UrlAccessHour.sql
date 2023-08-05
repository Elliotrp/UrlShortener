-- Table: public.UrlAccessHour

-- DROP TABLE IF EXISTS public."UrlAccessHour";

CREATE TABLE IF NOT EXISTS public."UrlAccessHour"
(
    "Id" bigint NOT NULL DEFAULT nextval('"UrlAccessHour_Id_seq"'::regclass),
    "UrlId" bigint NOT NULL,
    "Hour" integer NOT NULL,
    "Count" bigint NOT NULL,
    CONSTRAINT "UrlAccessHour_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "UrlId" FOREIGN KEY ("UrlId")
        REFERENCES public."Url" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UrlAccessHour"
    OWNER to postgres;