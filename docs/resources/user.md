# User Resource

User profiles with role-based access (admin/seller/customer), authentication, and preferences.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/user.schema.ts` - Firestore user documents
- Snake_case fields (display_name, email_verified, created_at)
- Roles: admin, seller, customer

### UI Schema

- `src/schemas/ui/user.ui.ts` - Frontend display with safe data
- CamelCase fields (displayName, emailVerified, createdAt)
- Nested objects: profile, settings, stats
- Computed fields: fullName, initials, avatarUrl
- Excludes: password, sensitive tokens

### Mapper

- `src/schemas/mappers/user.mapper.ts` - Backend → UI (strips sensitive data)
- Functions: mapUserToUI, mapUsersToUI

## API Endpoints

- GET `/api/user/profile` - Current user profile
- PATCH `/api/user/profile` - Update profile
- GET `/api/admin/users` - Admin user list
- PATCH `/api/admin/users/[id]` - Admin update user

## Service Layer

- `src/services/users.service.ts` - Returns UserUI types
- Methods: getMe(), updateMe(), list(), getById()

## Fields Reference

**Core**: id, email, displayName, phoneNumber, photoURL
**Profile**: firstName, lastName, bio, dateOfBirth, gender
**Role**: role (admin/seller/customer), permissions[]
**Verification**: emailVerified, phoneVerified, isApproved, isActive
**Stats**: totalOrders, totalSpent, totalEarned (for sellers)
**Settings**: language, currency, notifications
**Timestamps**: createdAt, updatedAt, lastLoginAt

## Filters

- Role, verified status, active status, date range

## Related Resources

- Address (user addresses)
- Order (user orders/seller orders)
- Shop (seller shop)
- Review (user reviews)
