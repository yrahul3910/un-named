# ORDER - PAYMENT PROCESS

---

```
@route:  {{url}}/order/:slug/:id
@method: POST
```

> ### Request Headers
>
> | key             | value                |
> | --------------- | -------------------- |
> | `Authorization` | String: Bearer token |

> #### Sample request header

```js
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImlhdCI6MTU5MjkwOTczMywiZXhwIjoxNTk1NTAxNzMzfQ.j8A4ATecG00NP2KH9e5Ec-EDdi0bCVTxXUYxwfQityM";
```

> #### Sample response

```json
{
  "profile": {
    "_id": "5f361f1207eb392cbcd73f24",
    "name": "Admin Profile",
    "description": "lorem ipsum 22",
    "createdAt": "2020-08-14T05:20:18.624Z",
    "updatedAt": "2020-08-14T16:43:38.265Z",
    "__v": 0,
    "event": {
      "settings": {
        "amount": 50000,
        "currency": "INR"
      },
      "_id": "5f2e87d60bb3e06d3f645c84",
      "createdAt": "2020-08-08T11:09:10.219Z",
      "updatedAt": "2020-08-08T11:09:28.859Z",
      "__v": 0,
      "created_by": "5f2e82909f47716585d7ffbe",
      "updated_by": "5f2e82909f47716585d7ffbe",
      "name": "Photography - 2020",
      "slug": "photography-2020",
      "id": "5f2e87d60bb3e06d3f645c84"
    },
    "user": {
      "confirmed": true,
      "blocked": false,
      "_id": "5f2e833b9f47716585d7ffc0",
      "fullname": "test devedu",
      "username": "test",
      "email": "test@devedu.tech",
      "provider": "local",
      "createdAt": "2020-08-08T10:49:31.959Z",
      "updatedAt": "2020-08-08T10:58:27.023Z",
      "__v": 0,
      "role": "5f2e82699f47716585d7fea3",
      "id": "5f2e833b9f47716585d7ffc0"
    },
    "isLive": true,
    "updated_by": { ... },
    "id": "5f361f1207eb392cbcd73f24"
  },
  "order": {
    "id": "order_FQiGJ1xStLfxfL",
    "entity": "order",
    "amount": 50000,
    "amount_paid": 0,
    "amount_due": 50000,
    "currency": "INR",
    "receipt": "orderID_5f361f1207eb392cbcd73f24",
    "offer_id": null,
    "status": "created",
    "attempts": 0,
    "notes": [],
    "created_at": 1597423418
  }
}
```

> **NOTE** : You will only recieve order object via this route. There is no other way to retrieve order object except when it is created.

> #### Request from client

```js
const uri = server + `/order/${slug}/${id}`;
const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};
const { data } = await axios.post(uri, config);
```

> #### Success Response Status

```http
HTTP/1.1 200 OK
Vary: Origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
Content-Type: application/json; charset=utf-8
X-Powered-By: Strapi <strapi.io>
X-Response-Time: 70ms
Content-Length: 859
Date: Fri, 14 Aug 2020 05:15:30 GMT
Connection: close
```
