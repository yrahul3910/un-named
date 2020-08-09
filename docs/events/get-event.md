# GET EVENT DETAILS

---

```
@route:  {{url}}/events/:slug
@method: GET
```

**_No authorization required_**

> #### Sample response

```json
{
  "settings": {
    "amount": 50000,
    "currency": "INR"
  },
  "_id": "5f2e87d60bb3e06d3f645c84",
  "createdAt": "2020-08-08T11:09:10.219Z",
  "updatedAt": "2020-08-08T11:09:28.859Z",
  "__v": 0,
  "created_by": { ... },
  "updated_by": { ... },
  "name": "Photography - 2020",
  "slug": "photography-2020",
  "id": "5f2e87d60bb3e06d3f645c84"
}
```

> #### Request from client

```js
const uri = server + 'events/photography-2020'

const {data} = await axios.get(uri)
```

> #### Success Response Status

```http
HTTP/1.1 200 OK
Vary: Origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
Content-Type: application/json; charset=utf-8
X-Powered-By: Strapi <strapi.io>
X-Response-Time: 32ms
Content-Length: 697
Date: Sun, 09 Aug 2020 13:52:16 GMT
Connection: close
```