# BAP and BPP Implementation Guide for ONDC MCP Server

## 🏗️ Architecture Overview

This ONDC MCP Server supports both **BAP (Buyer Application Platform)** and **BPP (Buyer-side Platform Provider)** implementations, enabling comprehensive e-commerce functionality on the ONDC network.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│       BAP       │    │   ONDC Gateway  │    │       BPP       │
│  (Buyer App)    │◄──►│   (Registry)    │◄──►│ (Seller Platform)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  MCP BAP Tools  │    │  Network Layer  │    │  MCP BPP Tools  │
│  - Discovery    │    │  - Registry     │    │  - Catalog Mgmt │
│  - Order Mgmt   │    │  - Discovery    │    │  - Order Process│
│  - Payment      │    │  - Routing      │    │  - Fulfillment  │
│  - Tracking     │    │  - Auth/Sign    │    │  - Logistics    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛒 BAP (Buyer Application Platform) Implementation

### Core BAP Workflow
1. **Discovery**: Search for products/services across the network
2. **Selection**: Choose specific items and quantities
3. **Initialization**: Provide billing and shipping information
4. **Confirmation**: Finalize the order with payment
5. **Tracking**: Monitor order status and fulfillment
6. **Post-Order**: Handle cancellations, returns, and support

### BAP MCP Tools

#### 🔍 Product Discovery
```bash
# Search for products
"Search for organic vegetables in Bangalore on ONDC retail network"
"Find electronics stores in Mumbai with home delivery"
"Look for restaurants serving Italian food in Delhi NCR"
```

**MCP Tool**: `ondc_bap_search`
- **Purpose**: Discover products/services from multiple BPPs
- **Input**: Search intent, location, category filters
- **Output**: Catalog from matching providers

#### 📦 Item Selection  
```bash
# Select specific items
"Select 2kg apples and 1kg oranges from FreshMart store"
"Choose iPhone 15 Pro Max from Electronics Hub with warranty"
```

**MCP Tool**: `ondc_bap_select`
- **Purpose**: Get detailed quotes for selected items
- **Input**: Item IDs, quantities, delivery preferences
- **Output**: Itemized quote with pricing and availability

#### 🏠 Order Initialization
```bash
# Initialize with customer details
"Initialize order with billing address in Bandra Mumbai and delivery to Powai"
"Set up order for John Doe, phone 9876543210, email john@example.com"
```

**MCP Tool**: `ondc_bap_init`
- **Purpose**: Setup order with customer and delivery details
- **Input**: Billing info, shipping address, contact details
- **Output**: Order summary with payment terms

#### ✅ Order Confirmation
```bash
# Confirm and pay
"Confirm order with UPI payment method"
"Place order with COD payment for order total ₹2,500"
```

**MCP Tool**: `ondc_bap_confirm`
- **Purpose**: Finalize order with payment
- **Input**: Payment method, confirmation details
- **Output**: Order confirmation with tracking ID

#### 📱 Order Management
```bash
# Track and manage orders
"Check status of order ORD123456"
"Track delivery for order ORD789012"
"Cancel order ORD345678 due to address change"
```

**MCP Tools**: 
- `ondc_bap_status` - Get order status
- `ondc_bap_track` - Track fulfillment
- `ondc_bap_cancel` - Cancel orders
- `ondc_bap_update` - Modify orders

## 🏪 BPP (Buyer-side Platform Provider) Implementation

### Core BPP Workflow
1. **Catalog Management**: Maintain product/service inventory
2. **Order Processing**: Handle incoming orders from BAPs
3. **Fulfillment**: Manage delivery and logistics
4. **Inventory Sync**: Real-time stock updates
5. **Customer Support**: Handle queries and issues

### BPP MCP Tools

#### 📋 Catalog Management
```bash
# Manage product catalog
"Add new product 'Organic Tomatoes' to grocery catalog with price ₹80/kg"
"Update inventory for product ID PROD123 to 50 units"
"Set product PROD456 as out of stock"
```

**MCP Tools**:
- `ondc_bpp_catalog_create` - Add new products
- `ondc_bpp_catalog_update` - Modify existing products  
- `ondc_bpp_inventory_sync` - Update stock levels

#### 🔔 Webhook Handlers (BPP Responses)
```bash
# Handle incoming BAP requests
"Process search request for 'smartphones under 20000' in electronics category"
"Generate quote for 3x iPhone cases and 1x screen protector"
"Accept order ORD789 with estimated delivery in 2 days"
```

**MCP Tools**:
- `ondc_bpp_on_search` - Respond to discovery requests
- `ondc_bpp_on_select` - Provide quotes
- `ondc_bpp_on_init` - Send payment terms
- `ondc_bpp_on_confirm` - Accept/reject orders

#### 🚚 Fulfillment Management
```bash
# Manage order fulfillment
"Update order ORD123 status to 'Packed' with tracking number TRK456"
"Mark order ORD789 as 'Out for Delivery' with delivery agent contact"
"Complete order ORD456 as 'Delivered' with delivery confirmation"
```

**MCP Tools**:
- `ondc_bpp_fulfillment_update` - Update order status
- `ondc_bpp_tracking_sync` - Sync tracking information
- `ondc_bpp_delivery_confirm` - Confirm delivery

## 🔧 Configuration Examples

### Environment Setup for BAP
```env
# BAP Configuration
ONDC_PARTICIPANT_TYPE=BAP
ONDC_BAP_ID=your-bap-id
ONDC_BAP_URI=https://your-bap-domain.com
ONDC_SUBSCRIBER_ID=your-subscriber-id
ONDC_SUBSCRIBER_URI=https://your-subscriber-uri.com

# Network Configuration
ONDC_ENVIRONMENT=staging
ONDC_REGISTRY_URL=https://registry.ondc.org
ONDC_GATEWAY_URL=https://gateway.ondc.org

# Authentication
ONDC_PRIVATE_KEY=your-ed25519-private-key
ONDC_PUBLIC_KEY=your-ed25519-public-key
ONDC_KEY_ID=your-key-id
```

### Environment Setup for BPP
```env
# BPP Configuration  
ONDC_PARTICIPANT_TYPE=BPP
ONDC_BPP_ID=your-bpp-id
ONDC_BPP_URI=https://your-bpp-domain.com
ONDC_SUBSCRIBER_ID=your-subscriber-id
ONDC_SUBSCRIBER_URI=https://your-subscriber-uri.com

# Domain Configuration
ONDC_DOMAIN=ONDC:RET10  # or RET11, TRV10, etc.
ONDC_CITY_CODE=std:080  # Bangalore
ONDC_COUNTRY_CODE=IND

# Store Configuration
STORE_ID=your-store-id
STORE_NAME=Your Store Name
STORE_LOCATION_GPS=12.9716,77.5946
STORE_AREA_CODE=560001
```

## 🚀 Quick Start Examples

### Setting up as BAP (Buyer App)
```bash
# 1. Configure as BAP
export ONDC_PARTICIPANT_TYPE=BAP
export ONDC_ENVIRONMENT=staging

# 2. Register with ONDC
"Register my food delivery app on ONDC staging with domain ONDC:RET11"

# 3. Start discovering
"Search for pizza delivery in Bangalore area 560001"
"Find top rated restaurants near Koramangala"
```

### Setting up as BPP (Seller Platform)
```bash
# 1. Configure as BPP
export ONDC_PARTICIPANT_TYPE=BPP
export ONDC_DOMAIN=ONDC:RET10

# 2. Register your store
"Register my grocery store 'FreshMart' on ONDC with location Bangalore"

# 3. Add products
"Add organic vegetables category with tomatoes, onions, and potatoes"
"Set delivery radius to 5km from store location"
```

## 🌐 Multi-Domain Support

### Retail (ONDC:RET1X)
- **RET10**: Grocery & FMCG
- **RET11**: Food & Beverage  
- **RET12**: Fashion & Lifestyle
- **RET13**: Beauty & Personal Care
- **RET14**: Electronics & Appliances
- **RET15**: Home & Decor

### Transportation (ONDC:TRV10)
- Mobility services
- Ride booking
- Vehicle rentals

### Logistics (ONDC:LOG10)
- Last-mile delivery
- B2B logistics
- Freight services

### Financial Services (ONDC:FIS12)
- Digital lending
- Insurance
- Investment products

## 📊 Usage Analytics

### BAP Analytics
```bash
# Track buyer behavior
"Generate purchase analytics for last 30 days"
"Show top performing categories and providers"
"Analyze customer acquisition and retention metrics"
```

### BPP Analytics  
```bash
# Monitor seller performance
"Display order fulfillment metrics for last week"
"Show inventory turnover rate by category"
"Generate revenue report by product and region"
```

## 🔐 Security & Compliance

### Authentication Flow
1. **Key Generation**: ED25519 key pairs for signing
2. **Request Signing**: All API calls digitally signed
3. **Webhook Verification**: Validate incoming requests
4. **Environment Isolation**: Separate staging/production credentials

### Best Practices
- Never expose private keys in logs or code
- Use environment-specific configurations
- Implement proper error handling and retry logic
- Monitor API rate limits and usage quotas
- Ensure PCI compliance for payment processing

## 🤝 Contributing

When contributing BAP/BPP functionality:

1. **Follow ONDC Protocol**: Ensure compliance with latest Beckn specifications
2. **Add Tests**: Include unit tests for new MCP tools
3. **Update Docs**: Document new features and usage examples
4. **Environment Testing**: Test in staging before production deployment

## 📞 Support

For BAP/BPP implementation support:
- **Issues**: [GitHub Issues](https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial/issues)
- **Discussions**: [GitHub Discussions](https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial/discussions)
- **ONDC Docs**: [Official ONDC Documentation](https://docs.ondc.org)

---

**Note**: This is an unofficial implementation for educational and development purposes. Ensure compliance with ONDC's official guidelines when deploying to production.
