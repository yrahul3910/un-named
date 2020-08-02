# UPDATE PASSWORD

---

```
@route:  {{url}}/user/password
@method: POST
```

> ### Request Headers

| key             | value                |
| --------------- | -------------------- |
| `Authorization` | String: Bearer token |

> #### Sample request header

```js
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImlhdCI6MTU5MjkwOTczMywiZXhwIjoxNTk1NTAxNzMzfQ.j8A4ATecG00NP2KH9e5Ec-EDdi0bCVTxXUYxwfQityM";
```

> #### Sample request body

| key        | value                   |
| ---------- | ----------------------- |
| `password` | String: strong password |

```json
{
  "password": "new-strong-password"
}
```

> #### Sample response

```json
{
  "id": 41,
  "username": "admin",
  "email": "admin@sourcedigital.net",
  "provider": "local",
  "password": "$2a$10$M0p9LZtylalm82n8XZwa.eJDIjEktEVvsxAwXnEtsh04HDMows2k6",
  "resetPasswordToken": null,
  "confirmed": true,
  "blocked": null,
  "role": {
    "id": 1,
    "name": "Authenticated",
    "description": "Default role given to authenticated user.",
    "type": "authenticated"
  },
  "created_at": "2020-06-23T10:27:25.000Z",
  "updated_at": "2020-06-23T12:09:09.000Z",
  "settings": null,
  "name": null,
  "address": null,
  "city": null,
  "state": null,
  "zip": null,
  "userShipping": null,
  "userBilling": null,
  "AcceptEULA": null,
  "JSON_Field": null,
  "TestJSON": null,
  "lat": null,
  "long": null,
  "dob": null,
  "country": "USA",
  "phone": null,
  "userMedia": null,
  "photo": null,
  "organizations": [],
  "pulses": [],
  "storefronts": [],
  "activations": [],
  "distributions": [],
  "domains": [],
  "properties": []
}
```

> #### Request from client

```js
const uri = server + 'user/password'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImlhdCI6MTU5MjkwOTczMywiZXhwIjoxNTk1NTAxNzMzfQ.j8A4ATecG00NP2KH9e5Ec-EDdi0bCVTxXUYxwfQityM'

const config = {
    header = {
        Authorization: 'Bearer ' + token
    }
}

const {data} = await axios.post(uri, {password: password}, config)
```

> #### Success Response Status

```http
HTTP/1.1 200 OK
Vary: Origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
Content-Type: application/json; charset=utf-8
X-Powered-By: Strapi <strapi.io>
X-Response-Time: 156ms
Content-Length: 789
Date: Tue, 23 Jun 2020 12:09:09 GMT
Connection: close
```
