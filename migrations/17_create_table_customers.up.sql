CREATE TABLE IF NOT EXISTS "customers"(
    "id" SERIAL primary key,
    "customer_name" VARCHAR,
    "customer_number" VARCHAR,
    "customer_address" VARCHAR,
    "customer_email" VARCHAR
);