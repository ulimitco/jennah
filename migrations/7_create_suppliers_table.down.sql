CREATE TABLE IF NOT EXISTS "suppliers"(
    "id" SERIAL primary key,
    "supplier_code" VARCHAR,
    "supplier_description" VARCHAR,
    "supplier_contact_person" VARCHAR,
    "supplier_contact" VARCHAR,
    "supplier_email" VARCHAR
);