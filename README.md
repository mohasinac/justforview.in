# JustForView E-commerce Platform

## 📖 Overview

**JustForView** is a modern, enterprise-grade e-commerce platform with **comprehensive authentication** and **role-based access control** built for scalability and security.

### 🎯 Key Features

- ✅ \*\*Enhanced Authentication Syste## 🔄 Recent Updates

### Navigation & Deployment Enhancements (inventory-management)

- ✅ **Navigation Reorganization**: Categories moved to admin dashboard, deals to seller profile
- ✅ **Seller Dashboard**: Complete seller interface with deals management
- ✅ **Automated Environment Setup**: Script for Vercel environment variables
- ✅ **Production Deployment**: Fully deployed with proper environment configuration
- ✅ **Enhanced Documentation**: Comprehensive guides for setup and deployment

### Authentication Enhancement (auth-part-2)

- ✅ Complete authentication system overhaul
- ✅ JWT cookies with claims-based authorization
- ✅ Role-based access control (RBAC)
- ✅ Cookie consent & GDPR compliance
- ✅ Enhanced security measures
- ✅ Comprehensive session management

### Development Status

- **Current Branch**: `inventory-management`
- **Deployment**: Production-ready on Vercel with automated environment setup
- **Features**: Navigation restructured, seller dashboard complete
- **Documentation**: Comprehensive guides in `docs/` folder including Vercel setup with claims-based authorization
- ✅ **Role-Based Access Control (RBAC)** - Admin, Seller, Customer roles with granular permissions
- ✅ **Cookie Consent & GDPR Compliance** - Full consent management with storage preferences
- ✅ **Server-Side Security** - HTTP-only cookies, CSRF protection, secure session management
- ✅ **Independent RESTful API** - Multi-platform ready architecture
- ✅ **Full TypeScript** - Type-safe throughout with enhanced type definitions
- ✅ **Product Management** - Full CRUD with inventory tracking
- ✅ **Auction System** - Live bidding with auto-bid functionality
- ✅ **Payment Integration** - Razorpay integration
- ✅ **Shipping Integration** - Shiprocket API
- ✅ **SEO Optimized** - Next.js App Router with dynamic metadata

## 🚦 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd justforview.in

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in your Firebase, Razorpay, and other API keys

# For Vercel deployment, set environment variables automatically
node set-vercel-env.js

# Initialize Firebase (if needed)
npm run firebase:init

# Run development server
npm run dev

# Visit http://localhost:3000
```

### Environment Variables Setup

The project includes an automated script to set up Vercel environment variables:

1. **Local Development**: Copy `.env.example` to `.env.local` and fill in your API keys
2. **Vercel Deployment**: Use `node set-vercel-env.js` to automatically set all environment variables from `vercel.json`

See [Vercel Environment Setup Guide](docs/VERCEL_ENV_SETUP.md) for detailed instructions.

## 🌐 Live Demo

**Production URL:** https://justforview-f7msczfiv-mohasin-ahamed-chinnapattans-projects.vercel.app

### Test Accounts

- **Customer:** customer@example.com / password123
- **Seller:** seller@example.com / password123
- **Admin:** admin@example.com / password123

## 📚 Documentation

All documentation has been organized in the `docs/` folder:

- **[Setup Guide](docs/SETUP_GUIDE.md)** - Complete installation and configuration
- **[API Documentation](docs/API_DOCUMENTATION.md)** - Comprehensive API reference
- **[Authentication Guide](docs/AUTHENTICATION_ENHANCEMENT_COMPLETE.md)** - Enhanced auth system details
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[Vercel Environment Setup](docs/VERCEL_ENV_SETUP.md)** - Automated environment variables configuration

## 🏗️ Architecture

```
Client → Enhanced Auth Context → JWT Middleware → API Routes → Services → Firebase/External APIs
                ↓
        Cookie Consent & RBAC → Role-Based Access Control → Secure Session Management
```

### Project Structure

```
justforview.in/
├── docs/                       # Documentation
│   ├── API_DOCUMENTATION.md   # Complete API reference
│   ├── AUTHENTICATION_ENHANCEMENT_COMPLETE.md
│   ├── DEPLOYMENT_GUIDE.md    # Production deployment
│   ├── VERCEL_ENV_SETUP.md    # Environment variables setup
│   └── SETUP_GUIDE.md         # Installation guide
├── scripts/                    # Build and deployment scripts
│   ├── build-static.js
│   ├── fix-api-routes.js
│   ├── init-firebase.js
│   └── setup-vercel-env.js
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── (auth)/             # Authentication pages
│   │   │   ├── forgot-password/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (shop)/             # Shop pages
│   │   │   └── products/
│   │   ├── admin/              # Admin dashboard
│   │   │   ├── categories/
│   │   │   ├── coupons/
│   │   │   ├── dashboard/
│   │   │   ├── orders/
│   │   │   └── products/
│   │   ├── seller/             # Seller dashboard
│   │   │   ├── deals/
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   └── dashboard/
│   │   ├── api/                # API Routes (Backend)
│   │   │   ├── auth/
│   │   │   ├── admin/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── payment/
│   │   │   └── shipping/
│   │   ├── auctions/           # Auction system
│   │   ├── cart/               # Shopping cart
│   │   ├── checkout/           # Checkout process
│   │   ├── profile/            # User profile
│   │   ├── orders/             # Order management
│   │   ├── wishlist/           # User wishlist
│   │   └── [other pages]/      # Additional pages
│   ├── components/
│   │   ├── admin/              # Admin components
│   │   ├── auth/               # Auth components
│   │   │   ├── RoleGuard.tsx
│   │   │   └── CookieConsent.tsx
│   │   ├── categories/         # Category components
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── products/           # Product components
│   │   ├── seller/             # Seller components
│   │   │   └── SellerSidebar.tsx
│   │   └── ui/                 # UI components
│   ├── contexts/
│   │   ├── AuthContext.tsx     # Enhanced authentication
│   │   ├── CartContext.tsx     # Shopping cart state
│   │   └── CategoriesContext.tsx
│   ├── hooks/
│   │   ├── useEnhancedAuth.ts  # Auth hook
│   │   ├── useAuthRedirect.ts  # Auth redirects
│   │   ├── useCategories.ts    # Categories hook
│   │   ├── useFirebase.ts      # Firebase hook
│   │   └── useProducts.ts      # Products hook
│   ├── lib/
│   │   ├── api/                # API services
│   │   ├── auth/               # JWT, roles, middleware
│   │   │   ├── jwt.ts
│   │   │   ├── roles.ts
│   │   │   └── middleware.ts
│   │   ├── config/             # Configuration
│   │   │   ├── firebase.ts
│   │   │   └── payment.ts
│   │   ├── firebase/           # Firebase services
│   │   │   ├── admin.ts
│   │   │   └── client.ts
│   │   ├── services/           # Business logic
│   │   │   ├── auth.service.ts
│   │   │   ├── product.service.ts
│   │   │   ├── razorpay.ts
│   │   │   └── shiprocket.ts
│   │   ├── storage/            # Storage utilities
│   │   ├── utils/              # Utility functions
│   │   └── validations/        # Zod schemas
│   └── types/
│       └── index.ts            # TypeScript definitions
├── firebase.json               # Firebase configuration
├── vercel.json                 # Vercel deployment config
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS config
└── package.json                # Dependencies
```

## 🔐 Enhanced Security Features

### Authentication & Authorization

- **JWT Cookies**: HTTP-only cookies with secure flags
- **Claims-Based Auth**: Rich user claims with permissions
- **Role-Based Access Control**: Admin, Seller, Customer roles
- **Session Management**: Secure session handling with automatic refresh
- **Password Security**: bcrypt hashing (12 rounds)

### Privacy & Compliance

- **Cookie Consent**: GDPR-compliant consent management
- **Storage Preferences**: Granular storage permissions
- **Data Protection**: Secure data handling with user consent
- **Fallback Storage**: localStorage fallback when cookies disabled

### Security Measures

- **CSRF Protection**: Cross-site request forgery prevention
- **Secure Redirects**: Safe redirect handling
- **Input Validation**: Comprehensive Zod schema validation
- **Rate Limiting**: API endpoint protection
- **Error Handling**: Secure error responses

## 📱 Using the Enhanced Authentication

### React Components

```typescript
import { useEnhancedAuth } from "@/hooks/useEnhancedAuth";

function MyComponent() {
  const { user, isAuthenticated, hasPermission, hasRole, login, logout } =
    useEnhancedAuth();

  if (hasRole("admin")) {
    return <AdminDashboard />;
  }

  if (hasPermission("products", "create")) {
    return <CreateProduct />;
  }

  return <CustomerView />;
}
```

### Role-Based Access Control

```typescript
import { RoleGuard } from "@/components/auth/RoleGuard";

<RoleGuard
  roles={["admin", "seller"]}
  permissions={[{ resource: "products", action: "manage" }]}
>
  <ProductManagement />
</RoleGuard>;
```

### API Usage

```bash
# Login (sets HTTP-only cookie)
curl -X POST https://yoursite.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Subsequent requests use cookies automatically
curl -X GET https://yoursite.com/api/user/profile \
  -H "Cookie: auth-token=<cookie-value>"
```

## 🌟 Tech Stack

### Frontend

- **Next.js 16.0.0** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5.6** - Full type safety
- **Tailwind CSS** - Utility-first styling

### Backend & Database

- **Firebase Firestore** - NoSQL database
- **Firebase Authentication** - User management
- **Firebase Storage** - File storage
- **Firebase Admin SDK** - Server-side operations

### Authentication & Security

- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **HTTP-only cookies** - Secure token storage
- **Zod** - Runtime validation

### Integrations

- **Razorpay** - Payment processing
- **Shiprocket** - Shipping management
- **Vercel** - Hosting and deployment

## � Recent Updates

### Authentication Enhancement (auth-part-2)

- ✅ Complete authentication system overhaul
- ✅ JWT cookies with claims-based authorization
- ✅ Role-based access control (RBAC)
- ✅ Cookie consent & GDPR compliance
- ✅ Enhanced security measures
- ✅ Comprehensive session management

### Development Status

- **Current Branch**: `auth-part-2`
- **Deployment**: Production-ready on Vercel
- **Test Coverage**: Authentication system fully tested
- **Documentation**: Organized in `docs/` folder

## �📄 License

MIT License

---

**Built with ❤️ for modern e-commerce needs**
