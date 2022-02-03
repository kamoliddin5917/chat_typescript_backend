url = localhost:777

# register

url/v1/auth/register - body : { firstName, lastName, username, password } --- token

# login

url/v1/auth/login - body : { username, password } --- token

# message

1. GET
   url/v1/api/message - headers : { token } --- messages chat
2. POST
   url/v1/api/message - headers : { token }, body : { message, file, id } --- create message chat
3. DELETE
   url/v1/api/message/{messageId} - headers : { token } --- delete message

# users

1. GET
   url/v1/api/user - headers : { token } --- all users
