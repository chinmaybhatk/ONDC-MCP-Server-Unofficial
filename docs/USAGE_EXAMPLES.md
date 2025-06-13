# ONDC MCP Server Usage Examples

## 🛒 BAP (Buyer Application Platform) Examples

### 1. Grocery Shopping Flow

#### Discovery Phase
```bash
# Search for groceries in a specific area
"Search for organic vegetables in Bangalore area code 560034"

# More specific search
"Find fresh fruits and vegetables available for delivery in Koramangala, Bangalore with ratings above 4 stars"

# Search with price filter
"Search for groceries under ₹500 in Mumbai area code 400001"
```

**Expected Response:**
- List of available providers (stores)
- Product catalog with prices
- Delivery options and timings
- Store ratings and reviews

#### Selection Phase
```bash
# Select specific items from a store
"Select 2kg apples, 1kg oranges, and 500g grapes from FreshMart store ID STORE123"

# With customization
"Select 1kg organic tomatoes and 2kg red onions from GreenGrocer, ensure home delivery to Whitefield"
```

**Expected Response:**
- Itemized quote with individual prices
- Delivery charges and timings
- Total amount breakdown
- Terms and conditions

#### Order Initialization
```bash
# Provide customer details
"Initialize order with billing details: John Doe, phone 9876543210, email john@example.com, address 123 Main Street, Koramangala, Bangalore 560034"

# Separate delivery address
"Set billing address in Indiranagar and delivery address to Electronic City for the grocery order"
```

**Expected Response:**
- Order summary with all details
- Payment options available
- Estimated delivery time
- Final price confirmation

#### Order Confirmation
```bash
# Confirm with payment
"Confirm grocery order with UPI payment using phonepe@ybl"

# Cash on delivery
"Place order with cash on delivery payment method"
```

**Expected Response:**
- Order confirmation number
- Payment status
- Estimated delivery timeline
- Tracking information

### 2. Food Delivery Flow

#### Restaurant Discovery
```bash
# Search for restaurants
"Find restaurants serving South Indian food in HSR Layout, Bangalore with home delivery"

# Cuisine-specific search
"Search for pizza places open now in Bandra, Mumbai with delivery under 30 minutes"

# Search with dietary preferences
"Find vegetarian restaurants in Delhi NCR serving Jain food with 4+ star rating"
```

#### Menu Selection
```bash
# Order specific items
"Select 2 Margherita pizzas, 1 Caesar salad, and 2 Coke from Pizza Express restaurant ID REST456"

# With customizations
"Order 1 Chicken Biryani with extra raita, 1 Paneer Butter Masala, and 3 rotis from Spice Garden"
```

#### Special Instructions
```bash
# Add delivery instructions
"Add special delivery instructions: Ring doorbell twice, deliver to apartment 4B, avoid stairs"

# Dietary requirements
"Ensure the food is prepared without onions and garlic, mention allergies to nuts"
```

### 3. Electronics Shopping

#### Product Discovery
```bash
# Electronics search
"Search for smartphones under ₹20,000 in Electronics City, Bangalore with EMI options"

# Brand-specific search
"Find Apple iPhone 15 Pro Max available in Mumbai with same-day delivery"

# Category search
"Search for gaming laptops with RTX 4060 graphics card in Delhi with warranty"
```

#### Comparison Shopping
```bash
# Compare across stores
"Compare prices for Samsung Galaxy S24 across different electronics stores in Chennai"

# Feature comparison
"Find best smartphones under ₹30,000 with 12GB RAM and 256GB storage in Pune"
```

## 🏪 BPP (Seller Platform Provider) Examples

### 1. Grocery Store Management

#### Store Setup
```bash
# Register store on ONDC
"Register my grocery store 'FreshMart' on ONDC staging environment with store location in Koramangala, Bangalore"

# Set store details
"Set store description as 'Fresh organic groceries and daily essentials' with delivery radius 10km"

# Configure operating hours
"Set store operating hours from 8:00 AM to 10:00 PM, 7 days a week"
```

#### Catalog Management
```bash
# Add product categories
"Add categories: Fruits, Vegetables, Dairy, Beverages, Snacks to my grocery catalog"

# Add specific products
"Add product 'Organic Tomatoes' to vegetables category with price ₹80/kg, 50kg stock available"

# Update multiple products
"Add to fruits category: Apples ₹180/kg (30kg stock), Bananas ₹60/kg (20kg stock), Oranges ₹120/kg (25kg stock)"
```

#### Inventory Management
```bash
# Update stock levels
"Update inventory: Organic Tomatoes now 20kg available, Apples out of stock, add 40kg Mangoes at ₹200/kg"

# Bulk inventory update
"Set all dairy products as out of stock due to supplier delay"

# Price updates
"Increase price of all organic vegetables by 10% due to seasonal variation"
```

#### Fulfillment Setup
```bash
# Configure delivery options
"Set up home delivery with ₹50 delivery charge for orders under ₹500, free delivery above ₹500"

# Add pickup option
"Enable store pickup option with 15-minute preparation time"

# Set delivery timings
"Configure delivery slots: 9-12 PM, 12-3 PM, 3-6 PM, 6-9 PM for all weekdays"
```

### 2. Restaurant Management

#### Restaurant Setup
```bash
# Register restaurant
"Register my restaurant 'Spice Garden' on ONDC for food delivery in domain ONDC:RET11"

# Set cuisine and details
"Set restaurant cuisine as North Indian, South Indian with average meal cost ₹300 for 2 people"

# Configure service area
"Set delivery area covering Indiranagar, Koramangala, HSR Layout with 5km radius"
```

#### Menu Management
```bash
# Add menu categories
"Add menu categories: Starters, Main Course, Biryani, Desserts, Beverages"

# Add specific dishes
"Add to main course: Paneer Butter Masala ₹280, Chicken Curry ₹320, Dal Tadka ₹180"

# Add combo meals
"Create combo meal: Chicken Biryani + Raita + Pickle for ₹350 (regular price ₹400)"
```

#### Order Processing
```bash
# Accept incoming orders
"Accept order ORD123 for 2x Chicken Biryani, 1x Paneer Tikka with estimated preparation time 25 minutes"

# Update order status
"Update order ORD123 status to 'Food being prepared' with chef name Ramesh"

# Ready for pickup
"Mark order ORD123 as 'Ready for pickup' and notify delivery partner"

# Out for delivery
"Update order ORD123 to 'Out for delivery' with delivery partner Rajesh, phone 9876543210"
```

### 3. Electronics Store Management

#### Store Setup
```bash
# Register electronics store
"Register electronics store 'TechHub' on ONDC with specialization in smartphones, laptops, accessories"

# Set store categories
"Add categories: Smartphones, Laptops, Tablets, Accessories, Gaming, Audio"

# Configure warranties
"Set warranty policy: 1 year manufacturer warranty + 6 months extended warranty on all products"
```

#### Product Catalog
```bash
# Add smartphones
"Add iPhone 15 Pro Max 256GB in Natural Titanium color, price ₹1,34,900, 5 units in stock"

# Add laptops
"Add MacBook Air M2 13-inch 8GB/256GB, price ₹1,14,900, includes free sleeve and mouse"

# Add bulk products
"Add gaming category: PlayStation 5 ₹54,990 (2 units), Xbox Series X ₹52,990 (3 units)"
```

#### Sales Management
```bash
# Process orders
"Accept order ORD456 for iPhone 15 Pro Max, verify customer documents, generate invoice"

# Handle customizations
"Process laptop order ORD789 with additional RAM upgrade to 16GB, revised price ₹1,34,900"

# Track deliveries
"Update order ORD456 with courier tracking AWB123456789, estimated delivery tomorrow"
```

## 🚀 Advanced Usage Scenarios

### 1. Multi-Store Operations

#### Chain Management
```bash
# Register multiple locations
"Register FreshMart chain with stores in Koramangala, Indiranagar, and HSR Layout"

# Centralized inventory
"Set shared inventory across all FreshMart locations with automatic stock balancing"

# Location-specific pricing
"Set different pricing for FreshMart HSR: premium location with 5% higher prices"
```

#### Cross-Store Fulfillment
```bash
# Transfer inventory
"Transfer 20kg apples from Koramangala store to HSR Layout store due to high demand"

# Nearest store fulfillment
"For order in Whitefield, fulfill from nearest store (HSR Layout) instead of Koramangala"
```

### 2. Promotional Campaigns

#### Discount Management
```bash
# Create promotional offers
"Create 20% discount on all fruits for weekend sale, valid Saturday-Sunday"

# Combo offers
"Create buy-2-get-1-free offer on all beverages category"

# Customer-specific discounts
"Apply 10% loyalty discount for customers with 10+ previous orders"
```

#### Seasonal Campaigns
```bash
# Festival offers
"Create Diwali special: 25% off on all sweets and snacks category"

# Flash sales
"Start 2-hour flash sale: 30% off on electronics with limited quantities"
```

### 3. Analytics and Reporting

#### BAP Analytics
```bash
# Customer behavior analysis
"Generate customer purchase pattern report for last 30 days"

# Popular products
"Show top 10 most ordered products across all categories this month"

# Revenue analysis
"Generate revenue breakdown by category, provider, and payment method"
```

#### BPP Analytics
```bash
# Sales performance
"Show daily sales report for last 7 days with order count and revenue"

# Inventory turnover
"Generate inventory turnover report showing fast and slow-moving products"

# Customer ratings
"Display average ratings and reviews summary for my store"
```

### 4. Customer Support Scenarios

#### Issue Resolution
```bash
# Handle complaints
"Process complaint for order ORD123: customer received wrong items, initiate replacement"

# Refund processing
"Process refund for order ORD456: customer cancelled within 1 hour, refund ₹1,250"

# Quality issues
"Handle quality complaint for damaged fruits in order ORD789, offer 50% refund or replacement"
```

#### Support Requests
```bash
# Delivery issues
"Customer unable to receive order ORD234, reschedule delivery for tomorrow 2-4 PM"

# Payment problems
"Order ORD567 payment failed, send new payment link to customer"
```

## 🔧 Integration Examples

### 1. Existing E-commerce Platform

#### Platform Migration
```bash
# Import existing catalog
"Import my existing WooCommerce catalog to ONDC BPP with 500+ products"

# Sync inventory
"Set up real-time inventory sync between my Shopify store and ONDC catalog"

# Order management
"Configure order sync: all ONDC orders should appear in my existing order management system"
```

### 2. POS System Integration

#### Retail Integration
```bash
# Connect POS system
"Integrate ONDC with my retail POS system for unified inventory management"

# In-store and online sync
"Sync in-store sales with ONDC inventory to prevent overselling"
```

### 3. Logistics Integration

#### Delivery Partners
```bash
# Third-party logistics
"Integrate with Dunzo for last-mile delivery within 2-hour slots"

# Multiple delivery options
"Offer both own delivery fleet and third-party logistics based on order value"
```

## 📱 Mobile App Integration

### 1. Customer App Features

#### In-App Experience
```bash
# Location-based search
"Show nearby restaurants and grocery stores based on user's current GPS location"

# Voice search
"Enable voice search: 'Order 2kg apples and 1kg oranges from nearby store'"

# Push notifications
"Send push notification when order status changes or delivery partner is nearby"
```

### 2. Merchant App Features

#### Store Management
```bash
# Quick inventory updates
"Mobile app quick update: mark 'Organic Tomatoes' as out of stock"

# Order notifications
"Send mobile notification to store manager when new order received"

# Sales dashboard
"Show today's sales summary: 45 orders, ₹12,500 revenue, 4.8 average rating"
```

## 🔍 Troubleshooting Examples

### Common BAP Issues
```bash
# Search not returning results
"Debug search for 'organic food' in Bangalore - check if any BPPs are registered in that area"

# Order stuck in pending
"Check order ORD123 status - verify BPP response and payment confirmation"

# Payment failures
"Retry payment for order ORD456 with alternative payment method"
```

### Common BPP Issues
```bash
# Not receiving search requests
"Verify BPP registration status and webhook URL configuration"

# Inventory sync issues
"Debug inventory update failures - check API rate limits and authentication"

# Order processing delays
"Investigate order processing bottlenecks and optimize fulfillment workflow"
```

---

**Next Steps**: Try these examples in your ONDC MCP Server setup. Start with simple scenarios and gradually move to complex multi-store operations. For more examples, check the [GitHub Discussions](https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial/discussions).
