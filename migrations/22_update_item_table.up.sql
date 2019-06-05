ALTER TABLE items
    ADD COLUMN "brand" VARCHAR,
    DROP COLUMN "packaging",
    DROP COLUMN "package_qty";