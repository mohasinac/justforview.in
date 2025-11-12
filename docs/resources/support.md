# Support Ticket Resource

Customer support system with ticketing, messaging, and status tracking.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/support.schema.ts` - Firestore support_tickets collection
- Snake_case fields (user_id, assigned_to, ticket_number)
- Status: open, in_progress, waiting_customer, resolved, closed
- Priority: low, medium, high, urgent

### UI Schema

- `src/schemas/ui/support.ui.ts` - Frontend display with user info
- CamelCase fields (userId, assignedTo, ticketNumber)
- Nested objects: user, assignedAgent, messages[]
- Computed fields: formattedStatus, timeAgo, messageCount

### Mapper

- `src/schemas/mappers/support.mapper.ts` - Backend → UI transformation
- Functions: mapSupportTicketToUI, mapTicketsToUI

## API Endpoints

- GET `/api/support` - User tickets
- POST `/api/support` - Create ticket
- GET `/api/support/[id]` - Ticket detail
- PATCH `/api/support/[id]` - Update ticket
- POST `/api/support/[id]/messages` - Add message
- GET `/api/admin/tickets` - Admin ticket list
- GET `/api/admin/tickets/[id]` - Admin ticket detail

## Service Layer

- `src/services/support.service.ts` - Returns SupportTicketUI types
- Methods: list(), getById(), create(), update(), addMessage()

## Fields Reference

**Core**: id, ticketNumber, subject, description, category
**Status**: status (open/in_progress/waiting_customer/resolved/closed), priority (low/medium/high/urgent)
**Participants**: userId, userName, userEmail, assignedTo, assignedAgentName
**Messages**: messages[]{userId, userType, message, attachments[], isInternal, createdAt}
**Meta**: tags[], category, orderId (if order-related)
**Timestamps**: createdAt, updatedAt, resolvedAt, closedAt

## Filters

- Status, priority, category, assigned agent, date range

## Related Resources

- User (ticket creator)
- User (assigned agent)
- Order (related order, if any)
