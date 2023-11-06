# Category API Spec

## Get All Categories
Endpoint : GET /api/categories

Query Params :
- sort_by : [name]
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

## Create Category
Endpoint : POST /api/categories

Request Body :
```json
{
    "name": "Balita & Anak Sakit"
}
```

## Get Category
Endpoint : GET /api/categories/:id

## Update Category
Endpoint : PUT /api/categories/:id

Request Body :
```json
{
    "name": "Balita & Anak Sakit"
}
```

## Delete Category
Endpoint : DELETE /api/categories/:id