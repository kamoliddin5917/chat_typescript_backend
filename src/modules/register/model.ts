import pg from "../../utils/pg";

const CREATED_USER = `
INSERT INTO users (user_firstname, user_lastname, user_username, user_password) VALUES ($1, $2, $3, $4) RETURNING
 user_id AS id,
 user_firstname AS first_name,
 user_lastname AS last_name,
 user_username AS username,
 user_date AS date
`;

const createdUser = (...values: any) => pg.pg(CREATED_USER, values);

export default { createdUser };
