# Subscriber API Spec

## Get All Subscribers
Endpoint : GET /api/subscribers

Query Params :
- keyword : [email]
- sort_by : [email, created_at]
- sort_value : [asc, desc]
```json
{
    "keyword": "",
    "size": "",
    "page": "",
    "sort_by": "",
    "sort_value": "",
}
```

## Create Subscriber
Endpoint : POST /api/subscribers

Request Body :
```json
{
    "email": ""
}
```

## Delete Subscriber
Endpoint : DELETE /api/subscribers/:id