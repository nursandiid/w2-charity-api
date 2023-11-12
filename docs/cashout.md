# Cashout API Spec

## Get All Cashouts
Endpoint : GET /api/cashouts

Query Params :
- keyword : [title, donor]
- status : [pending, success, rejected, canceled]
- sort_by : [title, status, donor]
- sort_value : [asc, desc]
```json
{
    "keyword": "",
    "size": "",
    "page": "",
    "sort_by": "",
    "sort_value": "",
    "status": ""
}
```

## Create Cashout
Endpoint : POST /api/cashouts

Request Body :
```json
{
    "campaign_id": "",
    "cashout_amount": "",
    "bank_id": ""
}
```

## Get Cashout
Endpoint : GET /api/cashouts/:id

## Update Cashout
Endpoint : PATCH /api/cashouts/:id

Request Body :
- status : [success, rejected, canceled]
```json
{
    "status": "",
    "reason_rejected": ""
}
```

## Delete Cashout
Endpoint : DELETE /api/cashouts/:id