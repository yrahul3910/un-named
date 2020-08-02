# Login

---

```
@route  = {{url}}/auth/local
@method = POST
```

> ### Request Body
| key | value
| --- | ---- |
| `identifier` | `String`: username or email ( any )
| `password` | `String`: strong password


> #### Sample Request

```json
{
    "identifier": "admin",
    "password": "secretPassword123"
}
```

> #### Sample response

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImlhdCI6MTU5MjkwODUxMSwiZXhwIjoxNTk1NTAwNTExfQ.Osf6XODtvtYpcfEpoovBLxxbyRXGGh7fzu2ILARzbaY",
  "user": {
    "id": 41,
    "username": "admin",
    "email": "admin@sourcedigital.net",
    "provider": "local",
    "confirmed": true,
    "blocked": null,
    "role": {
      "id": 1,
      "name": "Authenticated",
      "description": "Default role given to authenticated user.",
      "type": "authenticated"
    },
    "created_at": "2020-06-23T10:27:25.000Z",
    "updated_at": "2020-06-23T10:27:25.000Z",
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
X-RateLimit-Reset: 1592908826
Content-Type: application/json; charset=utf-8
X-Powered-By: Strapi <strapi.io>
X-Response-Time: 186ms
Content-Length: 848
Date: Tue, 23 Jun 2020 10:39:25 GMT
Connection: close
```