# DELETE MEDIA FILE

---

```
@route:  {{url}}/media/:profile/:id
@method: DELETE
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
    "_id": "5f30243849fe668e567486f7",
    "name": "assassins_creed_valhalla_4-wallpaper-1920x1080.jpg",
    "alternativeText": "",
    "caption": "",
    "hash": "assassins_creed_valhalla_4_wallpaper_1920x1080_11df0a4b21",
    "ext": ".jpg",
    "mime": "image/jpeg",
    "size": 303.16,
    "width": 1920,
    "height": 1080,
    "url": "/uploads/assassins_creed_valhalla_4_wallpaper_1920x1080_11df0a4b21.jpg",
    "formats": { ... },
    "provider": "local",
    "related": [
        "5f30243b49fe668e567486f8"
    ],
    "createdAt": "2020-08-09T16:28:40.694Z",
    "updatedAt": "2020-08-09T16:28:43.585Z",
    "__v": 0,
    "created_by": "5f2e82909f47716585d7ffbe",
    "updated_by": "5f2e82909f47716585d7ffbe",
    "id": "5f30243849fe668e567486f7"
}
```

> #### Request from client

```js
const uri = server + `/media/${profile}/${id}`;
const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};
const { data } = await axios.delete(uri, config);
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
Date: Sun, 10 Aug 2020 13:52:16 GMT
Connection: close
```
