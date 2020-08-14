# FIND USER PROFILE

---

> ### Find all profiles

```
@route:  {{url}}/profiles
@method: GET
```

> ### Find all profiles of specific event

```
@route:  {{url}}/profiles?event.slug=slug
@method: GET
```

> ### Find all **live** profiles

```
@route:  {{url}}/profiles?isLive=true
@method: GET
```

> ### Find all profiles of logged in user.


```
@route:  {{url}}/profiles/my
@method: GET
```

> ##### Request Headers
>
> | key             | value                |
> | --------------- | -------------------- |
> | `Authorization` | String: Bearer token |

> ##### Sample request header

```js
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsImlhdCI6MTU5MjkwOTczMywiZXhwIjoxNTk1NTAxNzMzfQ.j8A4ATecG00NP2KH9e5Ec-EDdi0bCVTxXUYxwfQityM";
```

> ##### Sample response

```json
[
    {
    "_id": "5f2f9c87f0ffc81b7182d25e",
    "name": "Test Profile",
    "isLive": true,
    "description": "This is a test profile.",
    "createdAt": "2020-08-09T06:49:43.552Z",
    "updatedAt": "2020-08-09T16:28:43.591Z",
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
    "created_by": { ... },
    "updated_by": { ... },
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
    "user_media": {
      "files": [
        { ... },
        {
          "_id": "5f30443449fe668e567486fb",
          "name": "assassins_creed_valhalla_4-wallpaper-1920x1080.jpg",
          "alternativeText": null,
          "caption": null,
          "hash": "assassins_creed_valhalla_4_wallpaper_1920x1080_fb8acff72a",
          "ext": ".jpg",
          "mime": "image/jpeg",
          "size": 303.16,
          "width": 1920,
          "height": 1080,
          "url": "/uploads/assassins_creed_valhalla_4_wallpaper_1920x1080_fb8acff72a.jpg",
          "formats": {
            "thumbnail": { ... },
            "large": { ... },
            "medium": { ... },
            "small": { ... }
          },
          "provider": "local",
          "related": [
            "5f30243b49fe668e567486f8"
          ],
          "createdAt": "2020-08-09T18:45:08.055Z",
          "updatedAt": "2020-08-09T18:45:08.062Z",
          "__v": 0,
          "id": "5f30443449fe668e567486fb"
        }
      ],
      "_id": "5f30243b49fe668e567486f8",
      "createdAt": "2020-08-09T16:28:43.576Z",
      "updatedAt": "2020-08-09T19:02:48.532Z",
      "__v": 0,
      "created_by": "5f2e82909f47716585d7ffbe",
      "profile": "5f2f9c87f0ffc81b7182d25e",
      "updated_by": "5f2e82909f47716585d7ffbe",
      "id": "5f30243b49fe668e567486f8"
    },
    "id": "5f2f9c87f0ffc81b7182d25e"
  },
    { ... },
    { ... },
    { ... }
]


```

> ##### Success HTTP Response Status

```http
HTTP/1.1 200 OK
Vary: Origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
Content-Type: application/json; charset=utf-8
X-Powered-By: Strapi <strapi.io>
X-Response-Time: 395ms
Content-Length: 9408
Date: Fri, 14 Aug 2020 16:36:04 GMT
Connection: close
```