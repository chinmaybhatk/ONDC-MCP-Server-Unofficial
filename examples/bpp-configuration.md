# BPP (Seller App) Configuration Examples

This directory contains configuration examples for BPP (Seller App Platform) implementations.

## 🏪 **What is a BPP?**

A **Seller App Platform (BPP)** is a provider-facing application that:
- Responds to customer searches with product catalogs
- Manages inventory and order fulfillment
- Handles order processing and delivery
- Examples: Restaurant POS systems, grocery store management, logistics providers

## 🔧 **BPP Environment Configuration**

### **Basic BPP Setup**
```bash
# .env for BPP
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BPP
ONDC_SUBSCRIBER_ID=myseller-app.example.com
ONDC_SUBSCRIBER_URL=https://myseller-app.example.com
ONDC_TYPE=BPP
ONDC_DOMAIN=ONDC:RET10
ONDC_CITY=std:080
ONDC_UNIQUE_KEY_ID=myseller-key-001

# Authentication Keys
ONDC_SIGNING_PRIVATE_KEY=your-ed25519-private-key
ONDC_ENCRYPTION_PRIVATE_KEY=your-encryption-private-key

# BPP Specific
BPP_ID=myseller-app.example.com
BPP_URI=https://myseller-app.example.com
BPP_CALLBACK_URL=/webhooks/ondc/seller
```

## 🏪 **Domain-Specific BPP Examples**

### **Grocery Store (ONDC:RET10)**
```bash
# Grocery Store BPP Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BPP
ONDC_SUBSCRIBER_ID=organic-store.freshmart.com
ONDC_SUBSCRIBER_URL=https://organic-store.freshmart.com
ONDC_TYPE=BPP
ONDC_DOMAIN=ONDC:RET10
ONDC_CITY=std:022
ONDC_CATEGORY=Grocery

# Business Details
BUSINESS_NAME=Fresh Mart Organic Foods
GST_NUMBER=27BBBBB1111B2Z6
PAN_NUMBER=BBBBB1111B
CONTACT_EMAIL=orders@freshmart.com
CONTACT_PHONE=+918888888888
STORE_ADDRESS=Shop 123, Organic Market, Mumbai
```

**Claude Usage:**
```
"Register my organic grocery store as a BPP on ONDC staging for Mumbai"
"Handle incoming search request for organic vegetables and send catalog"
"Confirm order ORD123456 with delivery details for organic produce"
```

### **Restaurant (ONDC:RET11)**
```bash
# Restaurant BPP Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BPP
ONDC_SUBSCRIBER_ID=spice-kitchen.restaurant.com
ONDC_SUBSCRIBER_URL=https://spice-kitchen.restaurant.com
ONDC_TYPE=BPP
ONDC_DOMAIN=ONDC:RET11
ONDC_CITY=std:011
ONDC_CATEGORY=F&B

# Business Details
BUSINESS_NAME=Spice Kitchen Restaurant
GST_NUMBER=07CCCCC2222C3Z7
PAN_NUMBER=CCCCC2222C
CONTACT_EMAIL=orders@spicekitchen.com
CONTACT_PHONE=+917777777777
RESTAURANT_ADDRESS=Plot 456, Food Street, Delhi
CUISINE_TYPE=North Indian
```

**Claude Usage:**
```
"Register my North Indian restaurant as a BPP for Delhi food delivery"
"Handle search request for North Indian food and send menu catalog"
"Process order ORD789012 for 2 butter chicken and 3 naan with estimated preparation time"
```

### **Electronics Store (ONDC:RET14)**
```bash
# Electronics Store BPP Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BPP
ONDC_SUBSCRIBER_ID=tech-world.electronics.com
ONDC_SUBSCRIBER_URL=https://tech-world.electronics.com
ONDC_TYPE=BPP
ONDC_DOMAIN=ONDC:RET14
ONDC_CITY=std:080
ONDC_CATEGORY=Electronics

# Business Details
BUSINESS_NAME=Tech World Electronics
GST_NUMBER=29DDDDD3333D4Z8
PAN_NUMBER=DDDDD3333D
CONTACT_EMAIL=sales@techworld.com
CONTACT_PHONE=+916666666666
STORE_ADDRESS=Shop 789, Electronics Complex, Bangalore
SPECIALIZATION=Mobile Phones, Laptops, Accessories
```

**Claude Usage:**
```
"Register my electronics store as a BPP for Bangalore"
"Handle search for smartphones under ₹20,000 and send available inventory"
"Process laptop order ORD345678 with warranty and delivery details"
```

## 🚚 **Logistics Provider (ONDC:LOG10)**
```bash
# Logistics BPP Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BPP
ONDC_SUBSCRIBER_ID=swift-logistics.delivery.com
ONDC_SUBSCRIBER_URL=https://swift-logistics.delivery.com
ONDC_TYPE=BPP
ONDC_DOMAIN=ONDC:LOG10
ONDC_CITY=std:022
ONDC_CATEGORY=Logistics

# Business Details
BUSINESS_NAME=Swift Logistics Pvt Ltd
GST_NUMBER=27EEEEE4444E5Z9
PAN_NUMBER=EEEEE4444E
CONTACT_EMAIL=dispatch@swiftlogistics.com
CONTACT_PHONE=+915555555555
SERVICE_AREAS=Mumbai, Pune, Nashik
DELIVERY_TYPES=Same Day, Next Day, Express
```

**Claude Usage:**
```
"Register my logistics company as a BPP for Mumbai delivery services"
"Handle search for same-day delivery from Bandra to Andheri and provide quote"
"Confirm pickup order ORD111222 with estimated delivery time"
```

## 🔄 **Complete BPP Workflow Examples**

### **Grocery Store Order Processing**
```
1. "Handle incoming search for fresh vegetables from BAP grocery-fresh.myapp.com"
2. "Send catalog with available vegetables, prices, and delivery options"
3. "Process selection of 2kg tomatoes and 1kg onions"
4. "Provide quote with total amount including delivery charges"
5. "Confirm order ORD123456 with preparation and delivery timeline"
6. "Update order status as 'being prepared' then 'out for delivery'"
7. "Mark order as delivered and request customer rating"
```

### **Restaurant Order Fulfillment**
```
1. "Handle search request for North Indian food with delivery to Connaught Place"
2. "Send menu catalog with available dishes and estimated preparation time"
3. "Process order for 2 butter chicken, 3 naan, 1 dal tadka"
4. "Confirm order ORD789012 with 45-minute preparation and delivery time"
5. "Update status: order received → preparing → ready for pickup → out for delivery"
6. "Complete delivery and collect customer feedback"
```

### **Electronics Store Sales Process**
```
1. "Handle search for gaming laptops under ₹80,000 with warranty"
2. "Send catalog with available laptops, specifications, and warranty terms"
3. "Process selection of specific laptop model with accessories"
4. "Provide quote including product, accessories, and delivery charges"
5. "Confirm order ORD345678 with delivery timeline and warranty details"
6. "Update status: order confirmed → packed → shipped → delivered"
```

## 📋 **BPP Registration with Claude**

### **Complete Registration Command**
```
"Register my organic grocery store on ONDC staging with these details:
- Subscriber ID: organic-store.freshmart.com
- Type: BPP
- Domain: ONDC:RET10 (Grocery)
- City: Mumbai (std:022)
- Legal Entity: Fresh Mart Organic Foods
- GST: 27BBBBB1111B2Z6
- PAN: BBBBB1111B
- Email: orders@freshmart.com
- Phone: +918888888888
- Store Address: Shop 123, Organic Market, Mumbai
- Callback URL: /webhooks/ondc/seller"
```

## 🎯 **BPP-Specific API Usage**

### **Primary BPP APIs (Callbacks)**
- `ondc_on_search` - Send catalog in response to search
- `ondc_on_select` - Provide quote for selected items
- `ondc_on_init` - Send payment terms and final quote
- `ondc_on_confirm` - Confirm order and provide order details
- `ondc_on_status` - Send order status updates
- `ondc_on_track` - Provide tracking information
- `ondc_on_cancel` - Handle order cancellation
- `ondc_on_rating` - Acknowledge customer ratings
- `ondc_on_support` - Provide customer support

### **BPP API Examples with Claude**
```
# Catalog Management
"Handle search request for organic vegetables and send my store catalog"
"Respond to search for North Indian food with my restaurant menu"
"Send available smartphone inventory for price range ₹15,000-₹25,000"

# Order Processing
"Process order selection for 5kg basmati rice and provide quote"
"Confirm order ORD123456 with estimated delivery time"
"Update order ORD789012 status to 'out for delivery'"

# Customer Service
"Handle cancellation request for order ORD345678"
"Provide tracking information for order ORD111222"
"Acknowledge 5-star rating for excellent service"
```

## 🏪 **BPP Inventory Management**

### **Product Catalog Setup**
```bash
# Product catalog configuration
CATALOG_UPDATE_FREQUENCY=15  # minutes
INVENTORY_SYNC_ENABLED=true
PRICE_UPDATE_REALTIME=true
AVAILABILITY_CHECK_STRICT=true

# Fulfillment options
DELIVERY_AVAILABLE=true
PICKUP_AVAILABLE=true
SAME_DAY_DELIVERY=true
EXPRESS_DELIVERY=false
```

### **Catalog Management with Claude**
```
"Update my product catalog with new seasonal vegetables"
"Mark laptop model XYZ as out of stock in inventory"
"Add new North Indian dishes to my restaurant menu"
"Update delivery charges for orders above ₹500"
```

## 🔒 **BPP Security Configuration**

### **Authentication Setup**
```bash
# Generate BPP-specific keys
openssl genpkey -algorithm Ed25519 -out bpp_signing_private.pem
openssl pkey -in bpp_signing_private.pem -pubout -out bpp_signing_public.pem

# Convert to base64 for environment variables
BPP_SIGNING_PRIVATE_KEY=$(openssl pkey -in bpp_signing_private.pem -outform DER | base64 -w 0)
BPP_SIGNING_PUBLIC_KEY=$(openssl pkey -in bpp_signing_public.pem -pubin -outform DER | base64 -w 0)
```

### **Webhook Security**
```bash
# BPP webhook endpoint configuration
BPP_WEBHOOK_URL=https://myseller-app.example.com/webhooks/ondc/seller
BPP_WEBHOOK_SECRET=your-webhook-secret-key
BPP_WEBHOOK_TIMEOUT=30000
BPP_SIGNATURE_VERIFICATION=true
```

## 🧪 **BPP Testing**

### **Test BPP Configuration**
```
"Test my BPP registration on ONDC staging"
"Verify my BPP can receive and respond to search requests"
"Simulate complete order flow from catalog to delivery"
"Test webhook endpoints for incoming requests"
```

### **BPP Integration Testing**
```
"Test integration with inventory management system"
"Verify order processing workflow with POS system"
"Test delivery partner integration for order fulfillment"
"Validate payment reconciliation process"
```

## 📊 **BPP Analytics and Monitoring**

### **Business Metrics Tracking**
```
"Track daily order volume and revenue through ONDC"
"Monitor inventory turnover and stock levels"
"Analyze customer ratings and feedback trends"
"Generate sales report for last month from ONDC orders"
```

### **Operational Monitoring**
```
"Monitor average order preparation time"
"Track delivery success rate and customer satisfaction"
"Analyze peak ordering hours and staff planning"
"Monitor API response times and system performance"
```

## 🎯 **BPP Best Practices**

### **Catalog Management**
- Keep inventory updated in real-time
- Provide accurate product descriptions and images
- Set realistic delivery timelines
- Maintain competitive pricing

### **Order Fulfillment**
- Respond quickly to incoming orders
- Provide regular status updates
- Ensure quality packaging and delivery
- Handle cancellations gracefully

### **Customer Service**
- Respond promptly to customer queries
- Maintain high service quality standards
- Collect and act on customer feedback
- Build long-term customer relationships

---

This configuration enables your business to act as a **Seller App Platform** on the ONDC network, allowing you to receive orders from customers across different buyer applications. 🏪