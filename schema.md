# Amazon Clone - Database Schema & Backend Architecture

This document describes the expected backend architecture, API endpoints, and database schema to support the fully functional Amazon clone on the backend. This includes user management, product catalogue, orders, tracking, payment simulation, and admin workflows.

## Data Models

The following JSON/Firebase NoSQL schemas represent the primary collections in the database.

### 1. `users`

Stores user profile information, addresses, and settings.

```json
{
  "_id": "user_id_123",
  "email": "user@example.com",
  "firstName": "Nicolas",
  "lastName": "Theato",
  "stripeCustomerId": "cus_12345",
  "defaultPaymentMethodId": "pm_12345",
  "addresses": [
    {
      "id": "addr_1",
      "fullName": "NICOLAS K THEATO",
      "line1": "20, LIMES AVENUE",
      "line2": "LONDON, SW13 0HF",
      "city": "London",
      "state": "London",
      "zip": "SW13 0HF",
      "country": "UK",
      "isDefault": true,
      "deliveryInstructions": "Leave by the front door"
    }
  ],
  "primeStatus": {
    "isActive": true,
    "renewalDate": "2026-06-01T00:00:00.000Z"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 2. `products`

Stores the catalogue of items available to buy.

```json
{
  "_id": "prod_123",
  "title": "CORSAIR RM850x Fully Modular Low-Noise ATX Power Supply",
  "description": "ATX 3.1 Compliant - PCIe 5.1 Support - Cybernetics Gold...",
  "price": 104.99,
  "currency": "GBP",
  "category": "Electronics",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "stockCount": 1500,
  "specs": {
    "brand": "Corsair",
    "wattage": "850W"
  },
  "seller": {
    "name": "Amazon.co.uk",
    "shipsFrom": "Amazon EU Sarl"
  },
  "rating": {
    "average": 4.8,
    "count": 1240
  },
  "promotions": {
    "discountPercent": 29,
    "isLimitedTimeDeal": true
  },
  "primeEligible": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 3. `orders`

Stores user purchases, including the cart items at the time of purchase, the final price, delivery information, and tracking status.

```json
{
  "_id": "order_123",
  "userId": "user_id_123",
  "status": "SHIPPED", // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
  "payment": {
    "stripePaymentIntentId": "pi_12345",
    "status": "SUCCEEDED",
    "methodId": "pm_12345", // The card used
    "cardLast4": "9906",
    "cardBrand": "Visa"
  },
  "delivery": {
    "addressSnapshot": {
      "fullName": "NICOLAS K THEATO",
      "line1": "20, LIMES AVENUE",
      "line2": "LONDON, SW13 0HF",
      "country": "UK"
    },
    "shippingMethod": "PREMIUM", // STANDARD, PREMIUM
    "shippingCost": 4.99,
    "estimatedDeliveryDate": "2026-04-29T00:00:00.000Z",
    "trackingEvents": [
      {
        "status": "ORDERED",
        "timestamp": "2026-04-26T10:15:00.000Z"
      },
      {
        "status": "SHIPPED",
        "timestamp": "2026-04-26T22:00:00.000Z"
      }
    ],
    "packagingPreference": "MANUFACTURER_BOX"
  },
  "items": [
    {
      "productId": "prod_123",
      "title": "CORSAIR RM850x Fully Modular Low-Noise ATX Power Supply",
      "priceAtPurchase": 104.99,
      "quantity": 1,
      "imageUrl": "https://example.com/image1.jpg"
    }
  ],
  "totals": {
    "subtotal": 104.99,
    "tax": 21.00,
    "shipping": 4.99,
    "grandTotal": 109.98
  },
  "createdAt": "2026-04-26T10:15:00.000Z",
  "updatedAt": "2026-04-26T22:00:00.000Z"
}
```

### 4. `carts`

A temporary collection for active user sessions. Alternatively stored directly in `users` subcollection `users/{userId}/cart`.

```json
{
  "_id": "cart_123",
  "userId": "user_id_123", // Null if guest
  "items": [
    {
      "productId": "prod_123",
      "quantity": 1,
      "addedAt": "2026-04-27T08:00:00.000Z"
    }
  ],
  "updatedAt": "2026-04-27T08:00:00.000Z"
}
```

### 5. `homepage_config` (Admin Configuration)

Stores dynamic settings for the home page (hero images, promoted categories, deals).

```json
{
  "_id": "config_homepage",
  "heroImages": [
    "https://example.com/hero1.jpg",
    "https://example.com/hero2.jpg"
  ],
  "dealsEndingSoon": ["prod_1", "prod_2", "prod_3", "prod_4"],
  "categoriesGrid": [
    { "title": "Electronics", "imageUrl": "...", "link": "/cat/electronics" },
    ...
  ]
}
```

---

## Core API Endpoints

If using a REST/Express layout, the following endpoints would be necessary. If using Firebase SDKs, these represent the required serverless functions (Callables) and access patterns.

### Authentication & Users
- `POST /api/auth/register` - Create a new user and initialize Stripe Customer.
- `GET /api/users/me` - Fetch profile, addresses, prime status.
- `PUT /api/users/me/addresses` - Add/Update delivery address.

### Product Catalogue
- `GET /api/products?category=X&search=Y` - Fetch products with filtering, search and pagination.
- `GET /api/products/:id` - Fetch single product details.

### Cart & Checkout
- `GET /api/cart` - Retrieve current user cart.
- `POST /api/cart/items` - Add item to cart or update quantity.
- `DELETE /api/cart/items/:productId` - Remove item.
- `POST /api/checkout/create-payment-intent` - Generates a Stripe client secret for the frontend to confirm payment. Takes cart contents, verifies prices, calculates tax & shipping.

### Orders & Tracking
- `POST /api/orders` - Called via Stripe Webhook upon successful payment, creates the order object.
- `GET /api/orders` - Fetch user's order history.
- `GET /api/orders/:id` - Fetch specific order details & tracking.
- `PUT /api/orders/:id/cancel` - Cancel order if status is still PENDING.

### Admin
- `POST /api/admin/products` - Add/Edit products (requires ADMIN role).
- `PUT /api/admin/homepage` - Update homepage configuration banners.

## Stripe Integration Notes
- **Customer Object:** Each user should have a `stripeCustomerId` generated on creation to allow saving payment methods ("Tick this box to default to these payment options in the future").
- **Payment Intents:** The checkout process triggers a Payment Intent for the total cart amount. Once confirmed, a webhook (`checkout.session.completed` or `charge.succeeded`) triggers the final `Order` generation logic to convert the Cart to an Order.
