# Contact API Spec

## Get All Contacts
Endpoint : GET /api/contacts

Query Params :
- keyword : [name, subject, message]
- sort_by : [name, created_at]
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

## Create Contact
Endpoint : POST /api/contacts

Request Body :
```json
{
    "name": "",
    "phone": "",
    "email": "",
    "subject": "",
    "message": ""
}
```

## Delete Contact
Endpoint : DELETE /api/contacts/:id