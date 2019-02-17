CREATE TABLE IF NOT EXISTS "sales"(
    "id" SERIAL primary key,
    "order_datetime" VARCHAR,
    "customer_name" VARCHAR,
    "transaction_no" VARCHAR,
    "pickup_datetime" VARCHAR,
    "pickup_person" VARCHAR,
    "pickup_person_contact" VARCHAR,
    "transaction_details" VARCHAR
);