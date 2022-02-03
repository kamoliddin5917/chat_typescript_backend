import pg from "../../utils/pg";

const FIND_USER = `
SELECT
    user_id AS id,
    user_password AS password
 FROM users WHERE user_username = $1
`;

const findUser = (...values: any) => pg.pg(FIND_USER, values);

export default { findUser };
