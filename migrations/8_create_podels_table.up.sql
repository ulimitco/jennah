CREATE TABLE IF NOT EXISTS "podels"(
    "id" SERIAL primary key,
    "po_datetime" TIMESTAMP,
    "po_tracking" VARCHAR,
    "po_user" INT,
    "dr_datetime" TIMESTAMP,
    "dr_tracking" VARCHAR,
    "dr_user" INT,
    "supplier_id" INT,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);