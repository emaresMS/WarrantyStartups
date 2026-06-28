# API Contract

> **Canonical source of truth.** The TypeScript types in `shared/types/` define the API data shapes. The Flask backend mirrors these with Pydantic models — if the two diverge, this document and the TS types win.

---

## REST Conventions

- All routes are prefixed `/api/v1/`
- Protected routes require `Authorization: Bearer <supabase access token>` header
- Public API responses use UUID strings for IDs — never internal database integers
- Request and response bodies are `application/json`

### HTTP Status Codes

| Scenario | Code |
|---|---|
| Successful read | 200 OK |
| Resource created | 201 Created |
| Bad input shape | 400 Bad Request |
| Missing or invalid token | 401 Unauthorized |
| Authenticated but not allowed | 403 Forbidden |
| Resource not found | 404 Not Found |
| Semantically invalid input | 422 Unprocessable Entity |
| Unexpected server failure | 500 Internal Server Error |

### Error Response Shape (`ApiError`)

```ts
{ error: string; details?: unknown }
```

All non-2xx responses return this shape.

### Paginated List Shape (`Paginated<T>`)

```ts
{ data: T[]; total: number; page: number; pageSize: number }
```

---

## Inspection Endpoints

Base path: `/api/v1/inspections`

The `Inspection` DTO is defined in `shared/types/inspection.ts`. Status values come from `INSPECTION_STATUSES` in `shared/constants/inspection.ts` (`'draft' | 'submitted' | 'approved'`).

### List inspections

```
GET /api/v1/inspections
Authorization: Bearer <token>

Response 200: Paginated<Inspection>
```

### Get inspection

```
GET /api/v1/inspections/:id
Authorization: Bearer <token>

Response 200: Inspection
Response 404: ApiError
```

### Create inspection

```
POST /api/v1/inspections
Authorization: Bearer <token>
Body: CreateInspectionRequest

Response 201: Inspection
Response 422: ApiError
```

`CreateInspectionRequest` fields: `title`, `siteLabel`, `status`, `formData`. The server sets `id`, `userId`, `createdAt`, `updatedAt`.

### Update inspection

```
PATCH /api/v1/inspections/:id
Authorization: Bearer <token>
Body: UpdateInspectionRequest  (all fields optional)

Response 200: Inspection
Response 404: ApiError
Response 422: ApiError
```

`UpdateInspectionRequest` is a partial of `CreateInspectionRequest`. Callers may omit any field; omitted fields are unchanged.

### Submit inspection

```
POST /api/v1/inspections/:id/submit
Authorization: Bearer <token>

Response 200: Inspection  (status set to 'submitted')
Response 404: ApiError
Response 422: ApiError   (e.g. already submitted or approved)
```
