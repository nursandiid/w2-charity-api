# Contact API Spec

## Get All Contacts
Endpoint : GET /api/contacts

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