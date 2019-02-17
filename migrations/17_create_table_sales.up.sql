CREATE TABLE IF NOT EXISTS "transactions"(
    "id" SERIAL primary key,
    "transaction_datetime" VARCHAR,
    "transaction_customer" VARCHAR,
    "transaction_dispense_location" VARCHAR,
    "transaction_dispense_datetime" VARCHAR,
    "transaction_no" VARCHAR,
    "transaction_details" VARCHAR,
    "transaction_type" VARCHAR
);