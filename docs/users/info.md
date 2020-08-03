# GET USER'S DETAILS

---

```
@route:  {{url}}/user/info
@method: GET
```

> ### Request Headers
| key | value
| --- | ---- |
| `Authorization` | String: Bearer token

> #### Sample request header

```js
'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImlhdCI6MTU5MjkwOTczMywiZXhwIjoxNTk1NTAxNzMzfQ.j8A4ATecG00NP2KH9e5Ec-EDdi0bCVTxXUYxwfQityM' 
```

> #### Sample response

```json
{
    "confirmed": true,
    "blocked": false,
    "_id": "5f1d363f366c3c1865980cf6",
    "settings": null,
    "username": "someone",
    "email": "someone@example.me",
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
        { ... },
        { ... }
    ],
    "id": "5f1d363f366c3c1865980cf6"
}
```

> #### Request from client

```js
const uri = server + 'user/info'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImlhdCI6MTU5MjkwOTczMywiZXhwIjoxNTk1NTAxNzMzfQ.j8A4ATecG00NP2KH9e5Ec-EDdi0bCVTxXUYxwfQityM'

const config = {
    header: {
        Authorization: 'Bearer ' + token
    }
}

const {data} = await axios.get(uri, config)
```

> #### Success Response Status

```http
HTTP/1.1 200 OK
Vary: Origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
Content-Type: application/json; charset=utf-8
X-Powered-By: Strapi <strapi.io>
X-Response-Time: 39ms
Content-Length: 789
Date: Tue, 23 Jun 2020 10:55:58 GMT
Connection: close
```