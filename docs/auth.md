# Auth API Spec

## Register
Endpoint : POST /api/auth/register

Request Body :
```json
{
    "name": "Nursandi",
    "email": "nursandi@example.com",
    "password": "123",
    "password_confirmation": "123"
}
```

## Login
Endpoint : POST /api/auth/login

Request Body :
```json
{
    "name": "Nursandi",
    "email": "nursandi@example.com"
}
```

## Get Current Profile
Endpoint : GET /api/auth/current

## Update Profile
Endpoint : PUT /api/auth/current

Request Body :
```json
{
    "name": "Nursandi",
    "email": "nursandi@example.com",
    "phone": "",
    "gender": "",
    "birth_date": "",
    "job": "",
    "address": "",
    "about": "",
    "path_image": ""
}
```

## Update Password
Endpoint : PATCH /api/auth/password

Request Body :
```json
{
    "current_password": "",
    "password": "",
    "password_confirmation": "",
}
```