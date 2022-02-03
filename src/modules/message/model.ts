import pg from "../../utils/pg";

const FIND_MESSAGES = `
SELECT
    message_id AS id,
    message_text AS message,
    message_media AS file,
    message_user AS user_id,
    message_author AS author_id,
    message_date AS date
FROM messages WHERE message_author = $1 OR message_user = $1
`;
const CREATE_MESSAGE = `
INSERT INTO messages (message_text, message_media, message_user, message_author) VALUES ($1, $2, $3, $4) RETURNING
message_id AS id,
message_text AS message,
message_media AS file,
message_user AS user_id,
message_author AS author_id,
message_date AS date
`;
const DELETE_MESSAGE = `
DELETE FROM messages WHERE message_id = $1 AND message_author = $2 RETURNING
message_id AS id,
message_media AS file,
message_user AS user_id
`;

const findMessages = (...values: any) => pg.pgAll(FIND_MESSAGES, values);
const createMessage = (...values: any) => pg.pg(CREATE_MESSAGE, values);
const deleteMessage = (...values: any) => pg.pg(DELETE_MESSAGE, values);

export default { findMessages, createMessage, deleteMessage };
