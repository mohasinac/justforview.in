# Address Resource

User address management with default address, validation, and multiple address support.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/address.schema.ts` - Firestore address documents
- Snake_case fields (user_id, address_line1, is_default)
- References: user_id

### UI Schema

- `src/schemas/ui/address.ui.ts` - Frontend display with formatted address
- CamelCase fields (userId, addressLine1, isDefault)
- Computed fields: fullAddress, formattedAddress, displayLabel

### Mapper

- `src/schemas/mappers/address.mapper.ts` - Backend → UI transformation
- Functions: mapAddressToUI, mapAddressesToUI

## API Endpoints

- GET `/api/user/addresses` - User addresses
- GET `/api/user/addresses/[id]` - Address detail
- POST `/api/user/addresses` - Create address
- PATCH `/api/user/addresses/[id]` - Update address
- DELETE `/api/user/addresses/[id]` - Delete address
- POST `/api/user/addresses/[id]/set-default` - Set default

## Service Layer

- `src/services/address.service.ts` - Returns AddressUI types
- Methods: list(), getById(), create(), update(), delete(), setDefault()

## Fields Reference

**Core**: id, userId, type (home/work/other), label
**Address**: addressLine1, addressLine2, city, state, country, zipCode, landmark
**Contact**: fullName, phoneNumber, alternatePhone
**Status**: isDefault, isActive
**Timestamps**: createdAt, updatedAt

## Filters

- Type, default status, active status

## Related Resources

- User (address owner)
- Order (shipping/billing address)
