CREATE TABLE IF NOT EXISTS "sale_items"(
    "id" SERIAL primary key,
    "srp" DOUBLE PRECISION,
    "qty" INT,
    "status" VARCHAR,
    "item_id" INT,
    "sale_id" INT,
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);