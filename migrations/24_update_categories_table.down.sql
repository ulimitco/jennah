ALTER TABLE categories
    DROP COLUMN "description",
    ADD COLUMN "category_description" VARCHAR;