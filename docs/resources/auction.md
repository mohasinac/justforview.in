# Auction Resource

Real-time auction system with bidding, auto-bid, and scheduled auctions.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/auction.schema.ts` - Firestore auction documents
- Snake_case fields (start_time, end_time, current_bid, winning_bidder_id)
- References: product_id, seller_id, shop_id

### UI Schema

- `src/schemas/ui/auction.ui.ts` - Frontend display with time formatting
- CamelCase fields (startTime, endTime, currentBid, winningBidderId)
- Computed fields: timeRemaining, formattedCurrentBid, bidCount, isLive, hasEnded, canBid
- Nested: product, seller, shop, winningSeller, bids[]

### Mapper

- `src/schemas/mappers/auction.mapper.ts` - Backend → UI + bid transformation
- Functions: mapAuctionToUI, mapBidToUI

## API Endpoints

- GET `/api/auctions` - List with filters
- GET `/api/auctions/[id]` - Auction detail
- GET `/api/auctions/featured` - Featured auctions
- GET `/api/auctions/live` - Currently active auctions
- GET `/api/auctions/[id]/bid` - Bid history
- POST `/api/auctions/[id]/bid` - Place bid
- GET `/api/auctions/my-bids` - User's bid history

## Service Layer

- `src/services/auctions.service.ts` - Returns AuctionUI types
- Methods: list(), getById(), getFeatured(), getLive(), getMyBids(), placeBid()

## Fields Reference

**Core**: id, title, description, productId, productName
**Timing**: startTime, endTime, duration, timeRemaining, status (scheduled/live/ended)
**Bidding**: startingBid, currentBid, minimumIncrement, bidCount, reservePrice, autoBidEnabled
**Participants**: winningSellerId, winningSellerName, winningBid
**Seller**: sellerId, sellerName, shopId, shopName
**Settings**: isPublished, isFeatured, isActive
**Timestamps**: createdAt, updatedAt, publishedAt

## Bid Fields

**BidUI**: id, auctionId, userId, userName, bidAmount, bidTime, isWinning, isAutoBid

## Filters

- Status (live/scheduled/ended), featured, price range, category, seller, time range

## Related Resources

- Product (auction item)
- User (bidders, winner)
- Shop (seller shop)
- Order (winning bid converts to order)
