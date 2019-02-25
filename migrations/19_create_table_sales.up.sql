CREATE TABLE IF NOT EXISTS "sales"(
    "id" SERIAL primary key,
    "sale_datetime" VARCHAR,
    "sale_dispense_location" VARCHAR,
    "sale_dispense_datetime" VARCHAR,
    "sale_no" VARCHAR,
    "sale_details" VARCHAR,
    "sale_status" VARCHAR,
    "customer_id" INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);