# Campaign API Spec

## Get All Campaigns
Endpoint : GET /api/campaigns

Query Params :
- status : [publish, pending, archived]
- sort_by : [title, publish_date, status]
- sort_value : [asc, desc]
```json
{
    "keyword": "",
    "size": "",
    "page": "",
    "sort_by": "",
    "sort_value": "",
    "status": "",
    "start_date": "",
    "end_date": ""
}
```

## Create Campaign
Endpoint : POST /api/campaigns

Request Body :
- status : [publish, archived]
- receiver : [Saya Sendiri, Keluarga / Kerabat, Organisasi / Lembaga, Lainnya]
```json
{
    "user_id": "",
    "title": "",
    "slug": "",
    "short_description": "",
    "body": "",
    "status": "",
    "nominal": "",
    "goal": "",
    "end_date": "",
    "note": "",
    "receiver": "",
    "path_image": "",
    "publish_date": ""
}
```

## Get Campaign
Endpoint : GET /api/campaigns/:id

## Update Campaign
Endpoint : PUT /api/campaigns/:id

Request Body :
- status : [publish, archived]
- receiver : [Saya Sendiri, Keluarga / Kerabat, Organisasi / Lembaga, Lainnya]
```json
{
    "user_id": "",
    "title": "",
    "slug": "",
    "short_description": "",
    "body": "",
    "status": "",
    "nominal": "",
    "goal": "",
    "end_date": "",
    "note": "",
    "receiver": "",
    "path_image": "",
    "publish_date": ""
}
```

## Delete Campaign
Endpoint : DELETE /api/campaigns/:id