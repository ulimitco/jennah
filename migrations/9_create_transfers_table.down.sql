CREATE TABLE IF NOT EXISTS "transfers"(
    "id" SERIAL primary key,
    "transfer_stn" VARCHAR,
    "transfer_datetime" TIMESTAMP,
    "user_id" INT,
    "branch_id" INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);