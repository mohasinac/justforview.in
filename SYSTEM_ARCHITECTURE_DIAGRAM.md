# 🎮 Complete System Architecture: Admin Game Settings

```
┌──────────────────────────────────────────────────────────────────────┐
│                       ADMIN INTERFACE                                │
│                   /admin/settings/game                                │
└──────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────┐
    │  Game Settings (Tabbed Interface)                   │
    │  ┌───────────────────┬─────────────────────┐        │
    │  │ 🎯 Beyblade Mgmt │ Future: Balance      │        │
    │  └───────────────────┴─────────────────────┘        │
    │                                                      │
    │  Search: [______]  Type: [All ▼]  [Refresh]        │
    │                                                      │
    │  ┌────────────┬────────────┬────────────┐           │
    │  │ Dragoon GT │ Valkyrie   │ Pegasus    │           │
    │  │ [📷 Image] │ [📷 Image] │ [📷 Image] │           │
    │  │ Type: ATK  │ Type: ATK  │ Type: ATK  │           │
    │  │ A:130 D:90 │ A:125 D:85 │ A:135 D:75 │           │
    │  │ ⚡ Special │ ⚡ Special │ ⚡ Special │           │
    │  └────────────┴────────────┴────────────┘           │
    │  ... 5 more cards ...                               │
    └─────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │   Firebase   │
                    │   Firestore  │
                    └──────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                     GAME INTERFACE                                   │
│                /game/beyblade-battle                                 │
└──────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────┐
    │  Beyblade Selection                                 │
    │                                                      │
    │  ┌────────────────────────────────────────────────┐ │
    │  │ Your Beyblade: [Dragoon GT ▼]                 │ │
    │  │ ┌───┬───────────────────────────────────────┐ │ │
    │  │ │ D │ Dragoon GT  [ATK]                     │ │ │
    │  │ └───┴───────────────────────────────────────┘ │ │
    │  │                                                │ │
    │  │ Preview:                                       │ │
    │  │ ┌────┐  Dragoon GT           [ATK] [LEFT ↺]  │ │
    │  │ │ 🎯 │  Attack:  130 ████████████░░░          │ │
    │  │ └────┘  Defense:  90 ██████░░░░░░░░           │ │
    │  │         Stamina: 100 ███████░░░░░░░           │ │
    │  │                                                │ │
    │  │ ⚡ SPECIAL MOVE                                │ │
    │  │ Storm Attack                                   │ │
    │  │ Unleash devastating rapid attacks              │ │
    │  └────────────────────────────────────────────────┘ │
    │                                                      │
    │         [🎮 New Battle 🎮]                          │
    │                                                      │
    │  ┌────────────────────────────────────────────────┐ │
    │  │ AI Opponent: [Spriggan ▼]                     │ │
    │  │ (Similar rich preview)                         │ │
    │  └────────────────────────────────────────────────┘ │
    └─────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │ useBeyblades │
                    │     Hook     │
                    └──────────────┘
                            │
                            ▼
                  GET /api/beyblades
                            │
                            ▼
                    ┌──────────────┐
                    │   Firebase   │
                    │   Firestore  │
                    └──────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                   GAME LOOP (60 FPS)                                 │
└──────────────────────────────────────────────────────────────────────┘

    Every Frame:

    1. UPDATE SPECIAL MOVES
       ┌─────────────────────────────────────┐
       │ updateSpecialMoves()                │
       │ • Check duration expired            │
       │ • Apply continuous effects:         │
       │   - healSpin                        │
       │   - cannotMove (keep frozen)        │
       │ • Remove effects when done          │
       └─────────────────────────────────────┘

    2. MOVEMENT SYSTEM
       ┌─────────────────────────────────────┐
       │ for each beyblade:                  │
       │   if (cannotMove(id)):              │
       │     velocity = {0, 0}  ← FROZEN     │
       │     continue                        │
       │                                     │
       │   if (!isFrozen):                   │
       │     applyForces()                   │
       │     updatePosition()                │
       └─────────────────────────────────────┘

    3. FORCE FIELDS
       ┌─────────────────────────────────────┐
       │ for each beyblade:                  │
       │   gravity = getGravityPull(id)      │
       │   push = getPushAway(id)            │
       │                                     │
       │   if (gravity > 0):                 │
       │     pullNearbyBeyblades()           │
       │                                     │
       │   if (push > 0):                    │
       │     pushNearbyBeyblades()           │
       └─────────────────────────────────────┘

    4. COLLISION DETECTION
       ┌─────────────────────────────────────┐
       │ for each pair:                      │
       │   if (isPhasing(id1) || isPhasing(id2)): │
       │     continue  ← SKIP COLLISION      │
       │                                     │
       │   radius1 *= getRadiusMultiplier(id1) │
       │   radius2 *= getRadiusMultiplier(id2) │
       │                                     │
       │   if (checkCollision()):            │
       │     resolveCollision()              │
       │     calculateDamageWithSpecialMoves() │
       └─────────────────────────────────────┘

    5. RENDERING
       ┌─────────────────────────────────────┐
       │ for each beyblade:                  │
       │   scale = getVisualScale(id)        │
       │   ctx.scale(scale, scale)           │
       │   drawBeybladeImage()               │
       │                                     │
       │   if (isFrozen):                    │
       │     drawFrozenEffect() ← Red aura   │
       │                                     │
       │   if (isPhasing):                   │
       │     drawPhasingEffect() ← Transparent │
       │                                     │
       │   if (gravityPull > 0):             │
       │     drawGravityRings() ← Blue rings │
       │                                     │
       │   if (pushAway > 0):                │
       │     drawPushRings() ← Red rings     │
       └─────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                  SPECIAL MOVE EFFECTS                                │
└──────────────────────────────────────────────────────────────────────┘

    Effect: cannotMove = true
    ┌─────────────────────────┐
    │  Beyblade Properties:   │
    │  • isFrozen = true      │
    │  • velocity = {0, 0}    │
    │                         │
    │  Visual:                │
    │  • Red pulsing border   │
    │  • "FROZEN" text        │
    └─────────────────────────┘

    Effect: phasing = true
    ┌─────────────────────────┐
    │  Beyblade Properties:   │
    │  • isPhasing = true     │
    │  • collisionSkip = true │
    │                         │
    │  Visual:                │
    │  • 50% opacity          │
    │  • Blur effect          │
    │  • Ghost trail          │
    └─────────────────────────┘

    Effect: radiusMultiplier = 1.5
    ┌─────────────────────────┐
    │  Beyblade Properties:   │
    │  • baseRadius stored    │
    │  • radius *= 1.5        │
    │  • hitbox enlarged      │
    │                         │
    │  Visual:                │
    │  • Glowing aura         │
    │  • Size indicator       │
    └─────────────────────────┘

    Effect: visualScale = 1.3
    ┌─────────────────────────┐
    │  Beyblade Properties:   │
    │  • visualScale = 1.3    │
    │  • rendering scaled     │
    │  • hitbox unchanged     │
    │                         │
    │  Visual:                │
    │  • Larger appearance    │
    │  • Independent from     │
    │    collision radius     │
    └─────────────────────────┘

    Effect: gravityPull = 150
    ┌─────────────────────────┐
    │  Force Field:           │
    │  • Radius: 150px        │
    │  • Pull opponents       │
    │    toward center        │
    │                         │
    │  Visual:                │
    │  • Blue concentric      │
    │    rings pulsing in     │
    │  • Particle effects     │
    └─────────────────────────┘

    Effect: pushAway = 100
    ┌─────────────────────────┐
    │  Force Field:           │
    │  • Radius: 100px        │
    │  • Push opponents       │
    │    away from center     │
    │                         │
    │  Visual:                │
    │  • Red concentric       │
    │    rings pulsing out    │
    │  • Shockwave effect     │
    └─────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                     DATA STRUCTURES                                  │
└──────────────────────────────────────────────────────────────────────┘

BeybladeStats (Firebase)
┌──────────────────────────────────┐
│ id: "dragoon-gt"                 │
│ name: "Dragoon GT"               │
│ type: "attack"                   │
│ imageUrl: "https://..."          │
│ typeDistribution: {              │
│   attack: 130                    │
│   defense: 90                    │
│   stamina: 100                   │
│ }                                │
│ specialMove: {                   │
│   name: "Storm Attack"           │
│   powerCost: 15                  │
│   flags: {                       │
│     damageMultiplier: 2.5        │
│     speedBoost: 1.8              │
│     radiusMultiplier: 1.2        │
│     duration: 3                  │
│     cooldown: 10                 │
│   }                              │
│ }                                │
└──────────────────────────────────┘
         │
         ▼
GameBeyblade (Runtime)
┌──────────────────────────────────┐
│ id: "player-beyblade"            │
│ name: "dragoon-gt"               │
│ position: {x: 400, y: 400}       │
│ velocity: {x: 2, y: 1}           │
│ spin: 2500                       │
│ power: 18                        │
│ radius: 42                       │
│ baseRadius: 42                   │
│ isFrozen: false                  │
│ isPhasing: false                 │
│ visualScale: 1.0                 │
│ ...                              │
└──────────────────────────────────┘
         │
         ▼
ActiveSpecialMove (Manager)
┌──────────────────────────────────┐
│ beybladeId: "player-beyblade"    │
│ moveId: "storm-attack"           │
│ startTime: 1234567890            │
│ endTime: 1234567893000           │
│ cooldownEndTime: 1234567900000   │
│ isActive: true                   │
│ flags: {                         │
│   damageMultiplier: 2.5          │
│   speedBoost: 1.8                │
│   radiusMultiplier: 1.2          │
│   ...                            │
│ }                                │
└──────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                  HELPER FUNCTIONS                                    │
└──────────────────────────────────────────────────────────────────────┘

Special Move Manager Exports:
• activateSpecialMove(beyblade, stats, time)
• updateSpecialMoves(beyblades, stats, time, deltaTime)
• canActivateSpecialMove(beyblade, stats, time)
• hasActiveSpecialMove(beybladeId)
• isImmuneToKnockback(beybladeId)
• isPhasing(beybladeId)              ← NEW
• cannotMove(beybladeId)             ← NEW
• getRadiusMultiplier(beybladeId)    ← NEW
• getVisualScale(beybladeId)         ← NEW
• getGravityPull(beybladeId)         ← NEW
• getPushAway(beybladeId)            ← NEW
• calculateDamageWithSpecialMoves(attacker, defender, damage)
• calculateReflectedDamage(defender, damage)
• getRemainingCooldown(beybladeId, time)
• clearAllSpecialMoves()

┌──────────────────────────────────────────────────────────────────────┐
│                 COMPLETE FLOW EXAMPLE                                │
└──────────────────────────────────────────────────────────────────────┘

1. Admin uploads Dragoon GT image
   ↓
2. Image stored in Firebase Storage
   ↓
3. imageUrl saved to Firestore
   ↓
4. Player opens game
   ↓
5. useBeyblades() fetches from /api/beyblades
   ↓
6. BeybladeSelect dropdown populates
   ↓
7. Player selects "Dragoon GT"
   ↓
8. Preview shows: Attack 130, Defense 90, Stamina 100
   ↓
9. Special Move: "Storm Attack" displayed
   ↓
10. Player clicks "New Battle"
    ↓
11. createBeyblade() loads full stats from database
    ↓
12. GameBeyblade created with properties:
    - radius: 42
    - baseRadius: 42 (stored)
    - mass: 18
    - typeDistribution applied
    ↓
13. Game loop starts (60 FPS)
    ↓
14. Player builds power: 0 → 5 → 10 → 15
    ↓
15. Power >= 15 (powerCost met)
    ↓
16. activateSpecialMove() called:
    - Deduct 15 power
    - Apply flags:
      • radiusMultiplier: 1.2
        → radius = 42 * 1.2 = 50.4
      • speedBoost: 1.8
        → velocity *= 1.8
      • damageMultiplier: 2.5
        → stored in ActiveSpecialMove
    ↓
17. Every frame for 3 seconds:
    - updateSpecialMoves() runs
    - Beyblade moves 1.8x faster
    - Hitbox is 1.2x larger (50.4px)
    - Damage dealt is 2.5x normal
    - Visual effects render:
      • Glowing aura
      • Speed trails
      • Size indicator
    ↓
18. After 3 seconds:
    - removeSpecialMoveEffects():
      • radius = baseRadius (42)
      • velocity /= 1.8
    - Move goes on cooldown: 10 seconds
    ↓
19. Cooldown expires after 10 seconds
    ↓
20. Can activate again when power >= 15

```

---

**System Complete and Ready! 🎉**

All components integrated and documented.
Ready for deployment and testing! 🚀
