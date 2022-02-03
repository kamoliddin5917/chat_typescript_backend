import pg from "../../utils/pg";

const FIND_USERS = `
SELECT
    user_id AS id,
    user_firstname AS first_name,
    user_lastname AS last_name,
    user_username AS username,
    user_date AS date
 FROM users 
`;

const findUsers = (...values: any) => pg.pgAll(FIND_USERS, values);

export default { findUsers };
