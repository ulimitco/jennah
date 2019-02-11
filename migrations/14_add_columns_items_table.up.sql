ALTER TABLE items 
    ADD COLUMN "uom" VARCHAR,
    ADD COLUMN "packaging" VARCHAR,
    ADD COLUMN "package_qty" INT,
    ADD COLUMN "default_unit_cost" DOUBLE PRECISION,
    ADD COLUMN "default_srp" DOUBLE PRECISION,
    ADD COLUMN "markup_percent" DOUBLE PRECISION,
    ADD COLUMN "markup_amount" DOUBLE PRECISION,
    ADD COLUMN "stock_notify_limit" DOUBLE PRECISION,
    ADD COLUMN "stock_limit" DOUBLE PRECISION;

ALTER TABLE inventories
    DROP COLUMN IF EXISTS "uom",
    DROP COLUMN IF EXISTS "qty_pmeasure";