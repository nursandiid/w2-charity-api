# Donor API Spec

## Get All Donors
Endpoint : GET /api/donors

Query Params :
- sort_by : [name, created_at (joining_date), campaigns_total, donations_total]
- sort_value : [asc, desc]
```json
{
    "keyword": "",
    "rows": "",
    "paginate": "",
    "sort_by": "",
    "sort_value": ""
}
```

## Create Donor
Endpoint : POST /api/donors

Request Body :
```json
{
    "name": "Nursandi",
    "email": "nursandi@example.com",
    "password": "123",
    "password_confirmation": "123"
}
```

## Get Donor
Endpoint : GET /api/donors/:id

Request Body :
```json
{
    "name": "Nursandi",
    "email": "nursandi@example.com"
}
```

## Update Donor
Endpoint : POST /api/donors/:id

Request Body :
```json
{
    "name": "Nursandi",
    "email": "nursandi@example.com",
    "password": "",
    "password_confirmation": ""
}
```

## Delete Donor
Endpoint : DELETE /api/donors/:id