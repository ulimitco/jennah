CREATE TABLE IF NOT EXISTS "items"(
    "id" SERIAL primary key,
    "item" VARCHAR,
    "description" VARCHAR,
    "stock_code" VARCHAR,
    "barcode" VARCHAR,
    "category_id" INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);