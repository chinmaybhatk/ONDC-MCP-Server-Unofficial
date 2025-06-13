# BAP (Buyer App) Configuration Examples

This directory contains configuration examples for BAP (Buyer App Platform) implementations.

## 🛒 **What is a BAP?**

A **Buyer App Platform (BAP)** is a consumer-facing application that:
- Initiates transactions and searches for products/services
- Provides user interface for customers
- Handles order placement and tracking
- Examples: Grocery delivery apps, food ordering platforms, e-commerce sites

## 🔧 **BAP Environment Configuration**

### **Basic BAP Setup**
```bash
# .env for BAP
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BAP
ONDC_SUBSCRIBER_ID=mybuyer-app.example.com
ONDC_SUBSCRIBER_URL=https://mybuyer-app.example.com
ONDC_TYPE=BAP
ONDC_DOMAIN=ONDC:RET10
ONDC_CITY=std:080
ONDC_UNIQUE_KEY_ID=mybuyer-key-001

# Authentication Keys
ONDC_SIGNING_PRIVATE_KEY=your-ed25519-private-key
ONDC_ENCRYPTION_PRIVATE_KEY=your-encryption-private-key

# BAP Specific
BAP_ID=mybuyer-app.example.com
BAP_URI=https://mybuyer-app.example.com
BAP_CALLBACK_URL=/webhooks/ondc/buyer
```

## 🏪 **Domain-Specific BAP Examples**

### **Grocery Delivery App (ONDC:RET10)**
```bash
# Grocery BAP Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BAP
ONDC_SUBSCRIBER_ID=grocery-fresh.myapp.com
ONDC_SUBSCRIBER_URL=https://grocery-fresh.myapp.com
ONDC_TYPE=BAP
ONDC_DOMAIN=ONDC:RET10
ONDC_CITY=std:080
ONDC_CATEGORY=Grocery

# Business Details
BUSINESS_NAME=Fresh Groceries Pvt Ltd
GST_NUMBER=29AAAAA0000A1Z5
PAN_NUMBER=AAAAA0000A
CONTACT_EMAIL=support@myapp.com
CONTACT_PHONE=+919999999999
```

**Claude Usage:**
```
"Register my grocery delivery app as a BAP on ONDC staging for Bangalore"
"Search for organic vegetables available for delivery in Bangalore area code 560001"
"Find grocery stores with same-day delivery options"
```

### **Food Ordering App (ONDC:RET11)**
```bash
# Food Ordering BAP Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BAP
ONDC_SUBSCRIBER_ID=food-delivery.myapp.com
ONDC_SUBSCRIBER_URL=https://food-delivery.myapp.com
ONDC_TYPE=BAP
ONDC_DOMAIN=ONDC:RET11
ONDC_CITY=std:022
ONDC_CATEGORY=F&B

# Business Details
BUSINESS_NAME=Quick Eats Food Delivery
GST_NUMBER=27BBBBB1111B2Z6
PAN_NUMBER=BBBBB1111B
CONTACT_EMAIL=orders@quickeats.com
CONTACT_PHONE=+918888888888
```

**Claude Usage:**
```
"Register my food delivery app as a BAP for Mumbai restaurants"
"Search for pizza restaurants with delivery in Mumbai area code 400001"
"Find cloud kitchens serving healthy meals in Bangalore"
```

### **E-commerce Platform (ONDC:RET14)**
```bash
# Electronics E-commerce BAP Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BAP
ONDC_SUBSCRIBER_ID=electronics-shop.myapp.com
ONDC_SUBSCRIBER_URL=https://electronics-shop.myapp.com
ONDC_TYPE=BAP
ONDC_DOMAIN=ONDC:RET14
ONDC_CITY=std:011
ONDC_CATEGORY=Electronics

# Business Details
BUSINESS_NAME=Tech Hub Electronics
GST_NUMBER=07CCCCC2222C3Z7
PAN_NUMBER=CCCCC2222C
CONTACT_EMAIL=support@techhub.com
CONTACT_PHONE=+917777777777
```

**Claude Usage:**
```
"Register my electronics marketplace as a BAP for Delhi"
"Search for smartphones under ₹20,000 with warranty"
"Find laptop dealers with same-day delivery in Delhi NCR"
```

## 🚗 **Mobility BAP Example (ONDC:TRV10)**
```bash
# Mobility BAP Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BAP
ONDC_SUBSCRIBER_ID=ride-booking.myapp.com
ONDC_SUBSCRIBER_URL=https://ride-booking.myapp.com
ONDC_TYPE=BAP
ONDC_DOMAIN=ONDC:TRV10
ONDC_CITY=std:080
ONDC_CATEGORY=Mobility

# Business Details
BUSINESS_NAME=Swift Rides Pvt Ltd
GST_NUMBER=29DDDDD3333D4Z8
PAN_NUMBER=DDDDD3333D
CONTACT_EMAIL=support@swiftrides.com
CONTACT_PHONE=+916666666666
```

**Claude Usage:**
```
"Register my ride booking app as a BAP for Bangalore"
"Search for cab services from airport to city center"
"Find bike rental options in Goa for tourists"
```

## 🔄 **Complete BAP Workflow Examples**

### **Grocery Shopping Workflow**
```
1. "Search for fresh fruits in Mumbai on ONDC retail network"
2. "Select 2kg apples and 1kg oranges from seller organic-store.freshmart.com"
3. "Initialize order with billing address in Bandra, Mumbai"
4. "Confirm the order with UPI payment"
5. "Track the order delivery status"
6. "Rate the order 5 stars after delivery"
```

### **Restaurant Food Ordering**
```
1. "Find restaurants serving North Indian food in Delhi with delivery"
2. "Select 2 butter chicken and 3 naan from restaurant spice-kitchen.rest.com"
3. "Set delivery address to Connaught Place"
4. "Confirm order with cash on delivery"
5. "Track real-time delivery status"
6. "Rate the restaurant and delivery experience"
```

### **Electronics Purchase**
```
1. "Search for gaming laptops under ₹80,000 in Bangalore"
2. "Compare specifications from different electronics sellers"
3. "Select laptop from seller with best warranty terms"
4. "Initialize order with office address"
5. "Confirm with credit card payment"
6. "Track shipment until delivery"
```

## 📋 **BAP Registration with Claude**

### **Complete Registration Command**
```
"Register my grocery delivery app on ONDC staging with these details:
- Subscriber ID: grocery-fresh.myapp.com
- Type: BAP
- Domain: ONDC:RET10 (Grocery)
- City: Bangalore (std:080)
- Legal Entity: Fresh Groceries Pvt Ltd
- GST: 29AAAAA0000A1Z5
- PAN: AAAAA0000A
- Email: support@myapp.com
- Phone: +919999999999
- Callback URL: /webhooks/ondc/buyer"
```

## 🎯 **BAP-Specific API Usage**

### **Primary BAP APIs**
- `ondc_search` - Search for products/services
- `ondc_select` - Select items from catalog
- `ondc_init` - Initialize order with billing details
- `ondc_confirm` - Confirm and place order
- `ondc_status` - Check order status
- `ondc_track` - Track order fulfillment
- `ondc_cancel` - Cancel order
- `ondc_rating` - Rate seller/product
- `ondc_support` - Get customer support

### **BAP API Examples with Claude**
```
# Search Operations
"Search for organic milk brands available in Pune"
"Find electronics stores with express delivery in Chennai"
"Look for restaurants open now in Mumbai with online payment"

# Order Management
"Place order for 5kg basmati rice from seller rice-kingdom.com"
"Check status of my order ORD123456"
"Cancel order ORD789012 due to change of plans"

# Customer Service
"Rate my last order 4 stars with good product quality feedback"
"Get support for delayed delivery of order ORD345678"
"Report issue with damaged product in order ORD111222"
```

## 🔒 **BAP Security Configuration**

### **Authentication Setup**
```bash
# Generate BAP-specific keys
openssl genpkey -algorithm Ed25519 -out bap_signing_private.pem
openssl pkey -in bap_signing_private.pem -pubout -out bap_signing_public.pem

# Convert to base64 for environment variables
BAP_SIGNING_PRIVATE_KEY=$(openssl pkey -in bap_signing_private.pem -outform DER | base64 -w 0)
BAP_SIGNING_PUBLIC_KEY=$(openssl pkey -in bap_signing_public.pem -pubin -outform DER | base64 -w 0)
```

### **Webhook Security**
```bash
# BAP webhook endpoint configuration
BAP_WEBHOOK_URL=https://mybuyer-app.example.com/webhooks/ondc/buyer
BAP_WEBHOOK_SECRET=your-webhook-secret-key
BAP_WEBHOOK_TIMEOUT=30000
```

## 🧪 **BAP Testing**

### **Test BAP Configuration**
```
"Test my BAP registration on ONDC staging"
"Verify my BAP can search for products in configured domain"
"Simulate complete order flow from search to delivery"
"Test webhook endpoints for callback handling"
```

### **BAP Integration Testing**
```
"Test integration with payment gateway for order confirmation"
"Verify customer notification system for order updates"
"Test mobile app integration with ONDC BAP APIs"
"Validate order management dashboard functionality"
```

---

This configuration enables your application to act as a **Buyer App Platform** on the ONDC network, allowing customers to discover and purchase products/services from registered sellers. 🛒