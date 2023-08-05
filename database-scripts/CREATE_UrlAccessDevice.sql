-- Table: public.UrlAccessDevice

-- DROP TABLE IF EXISTS public."UrlAccessDevice";

CREATE TABLE IF NOT EXISTS public."UrlAccessDevice"
(
    "Id" bigint NOT NULL DEFAULT nextval('"UrlAccessDevice_Id_seq"'::regclass),
    "UrlId" bigint NOT NULL,
    "Device" text COLLATE pg_catalog."default" NOT NULL,
    "Count" bigint NOT NULL,
    CONSTRAINT "UrlAccessDevice_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "UrlId" FOREIGN KEY ("UrlId")
        REFERENCES public."Url" ("Id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UrlAccessDevice"
    OWNER to postgres;