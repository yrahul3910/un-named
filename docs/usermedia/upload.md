# UPLOAD USER MEDIA

---

```
@route:  {{url}}/media/:profile
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

> #### Sample request body

`MULTIPART DATA` `FORM DATA`

| key           | value            |
| ------------- | ---------------- |
| `files.files` | random_file.jpeg |
| `data`        | `{}`             |

> #### Sample response

```json
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
    "thumbnail": {
      "name": "thumbnail_assassins_creed_valhalla_4-wallpaper-1920x1080.jpg",
      "hash": "thumbnail_assassins_creed_valhalla_4_wallpaper_1920x1080_fb8acff72a",
      "ext": ".jpg",
      "mime": "image/jpeg",
      "width": 245,
      "height": 138,
      "size": 8.88,
      "path": null,
      "url": "/uploads/thumbnail_assassins_creed_valhalla_4_wallpaper_1920x1080_fb8acff72a.jpg"
    },
    "large": { ... },
    "medium": { ... },
    "small": { ... }
  },
  "provider": "local",
  "related": ["5f30243b49fe668e567486f8"],
  "createdAt": "2020-08-09T18:45:08.055Z",
  "updatedAt": "2020-08-09T18:45:08.062Z",
  "__v": 0,
  "id": "5f30443449fe668e567486fb"
}
```

> #### Request from client

```html
<!-- VUE QUASAR.DEV TEMPLATE -->
 <q-uploader
    :url="config.server + '/media/' + profile"
    label="Upload"
    color="grey-2"
    text-color="grey-10"
    style="width: 100%;"
    :headers="[{name: 'Authorization', value: 'Bearer ' + token}]"
    class="full-height"
    :field-name="(file) => 'files.files'"
    :form-fields="[{name: 'data', value: '{}'}]"
/>
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
