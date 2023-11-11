# Donation API Spec

## Get All Donations
Endpoint : GET /api/donations

Query Params :
- status : [confirmed, not confirmed, canceled]
- sort_by : [donor, title, nominal, status, created_at]
- sort_value : [asc, desc]
```json
{
    "keyword": "",
    "size": "",
    "page": "",
    "sort_by": "",
    "sort_value": "",
    "status": "",
}
```

## Create Donation
Endpoint : POST /api/donations

Request Body :
```json
{
    "campaign_id": "",
    "user_id": "",
    "order_number": "",
    "anonim": "",
    "nominal": "",
    "support": "",
    "status": ""
}
```

## Get Donation
Endpoint : GET /api/donations/:id

## Update Donation
Endpoint : PUT /api/donations/:id

Request Body :
```json
{
    "campaign_id": "",
    "user_id": "",
    "order_number": "",
    "anonim": "",
    "nominal": "",
    "support": "",
    "status": ""
}
```

## Delete Donation
Endpoint : DELETE /api/donations/:id