# Login

---

```
@route:  {{url}}/auth/local
@method: POST
```

> ### Request Body
| key | value
| --- | ---- |
| `identifier` | `String`: username or email ( any )
| `password` | `String`: strong password


> #### Sample Request

```json
{
    "identifier": "someone",
    "password": "secretPassword123"
}
```

> #### Sample response

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmU4MzNiOWY0NzcxNjU4NWQ3ZmZjMCIsImlhdCI6MTU5Njg4Nzc4MywiZXhwIjoxNTk5NDc5NzgzfQ.CqvlUVO2eIpkVOclOlGalbmOg14QhrNzWt-0OauMtd0",
  "user": {
    "confirmed": true,
    "blocked": false,
    "_id": "5f2e833b9f47716585d7ffc0",
    "fullname": "Someone Admin",
    "username": "someone",
    "email": "someone@example.com",
    "provider": "local",
    "createdAt": "2020-08-08T10:49:31.959Z",
    "updatedAt": "2020-08-08T10:58:27.023Z",
    "__v": 0,
    "role": {
      "_id": "5f2e82699f47716585d7fea3",
      "name": "Authenticated",
      "description": "Default role given to authenticated user.",
      "type": "authenticated",
      "createdAt": "2020-08-08T10:46:01.700Z",
      "updatedAt": "2020-08-08T11:30:43.561Z",
      "__v": 0,
      "id": "5f2e82699f47716585d7fea3"
    },
    "profiles": [
      { ... },
      { ... }
    ],
    "id": "5f2e833b9f47716585d7ffc0"
  }
}
```

> _The **token** returned should be passed with further request in the request headers as Bearer token_

```
`Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImlhdCI6MTU5MjkwMjQwMCwiZXhwIjoxNTk1NDk0NDAwfQ.ZB8MURbxPflSToO2Lq0wkTde16cuXeWfF6JnktaE8BA`
```

> #### Success Response Status

```http
HTTP/1.1 200 OK
Vary: Origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1596887958
Content-Type: application/json; charset=utf-8
X-Powered-By: Strapi <strapi.io>
X-Response-Time: 217ms
Content-Length: 741
Date: Sat, 08 Aug 2020 11:58:17 GMT
Connection: close
```