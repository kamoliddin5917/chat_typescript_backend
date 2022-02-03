CREATE DATABASE chat;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    user_firstname varchar(30) not null,
    user_lastname varchar(50) not null,
    user_username varchar(50) unique not null,
    user_password text not null,
    user_date timestamp with time zone not null default current_timestamp,
    user_status boolean not null default true 
);


CREATE TABLE messages(
    message_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    message_date timestamp with time zone not null default current_timestamp,
    message_text text not null,
    message_media text not null,
    message_status boolean not null default true,
    message_author uuid not null,
    message_user uuid not null,
    CONSTRAINT fk_message_user
        FOREIGN KEY(message_user)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);

