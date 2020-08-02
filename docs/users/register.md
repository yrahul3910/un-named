# REGISTER

--- 
```
  @route:  {{url}}/auth/local/register
  @method: POST
```

> ### Request Body
| key | value
| --- | ---- |
| `username` | String: unique user identifier
| `email` | String: unique user email
| `password` | String: strong password


> #### Sample Request

```json
{
  "username": "someone",
  "email": "someone@example.com",
  "password": "secretPassword123"
}
```

> #### Sample response

```json
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWQzNjNmMzY2YzNjMTg2NTk4MGNmNiIsImlhdCI6MTU5NjM1Mjc3OSwiZXhwIjoxNTk4OTQ0Nzc5fQ.YPN-05-ya3CVwXqvLAWD3H-R9j2aSu8YZdyW18PAVSk",
    "user": {
        "confirmed": true,
        "blocked": false,
        "_id": "5f1d363f366c3c1865980cf6",
        "settings": null,
        "username": "someone",
        "email": "someone@example.com",
        "provider": "local",
        "createdAt": "2020-07-26T07:52:31.892Z",
        "updatedAt": "2020-08-01T19:59:28.258Z",
        "__v": 0,
        "role": {
            "_id": "5f146cb4c3b390337c51edc7",
            "name": "Authenticated",
            "description": "Default role given to authenticated user.",
            "type": "authenticated",
            "createdAt": "2020-07-19T15:54:28.943Z",
            "updatedAt": "2020-08-02T07:19:27.056Z",
            "__v": 0,
            "id": "5f146cb4c3b390337c51edc7"
        },
        "profile_photo": null,
        "profiles": [
            {
                "_id": "5f266599293dbe299dc28ea0",
                "createdAt": "2020-08-02T07:04:57.698Z",
                "updatedAt": "2020-08-02T07:15:02.970Z",
                "__v": 0,
                "user": "5f1d363f366c3c1865980cf6",
                "id": "5f266599293dbe299dc28ea0",
                ...
            },
            {...}
        ],
        "id": "5f1d363f366c3c1865980cf6"
    }
}
```

> _The **token** returned should be passed with further request in the request headers as Bearer token_

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImlhdCI6MTU5MjkwMjQwMCwiZXhwIjoxNTk1NDk0NDAwfQ.ZB8MURbxPflSToO2Lq0wkTde16cuXeWfF6JnktaE8BA`
```

> #### Success Response Status

```http
HTTP/1.1 200 OK
Vary: Origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1592908826
Content-Type: application/json; charset=utf-8
X-Powered-By: Strapi <strapi.io>
X-Response-Time: 186ms
Content-Length: 848
Date: Tue, 23 Jun 2020 10:39:25 GMT
Connection: close
```
