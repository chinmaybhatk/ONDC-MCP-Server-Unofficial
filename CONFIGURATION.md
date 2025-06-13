# ONDC Configuration Guide

This guide explains how to configure the ONDC MCP Server for different roles (BAP/BPP) and environments.

## 🎯 **Understanding BAP vs BPP**

### **BAP (Buyer App Platform)**
- **Role**: Consumer-facing applications
- **Purpose**: Initiates transactions, searches for products/services
- **Examples**: Grocery delivery app, food ordering app, e-commerce platform
- **Primary APIs**: `search`, `select`, `init`, `confirm`, `status`, `track`, `cancel`

### **BPP (Seller App Platform)**  
- **Role**: Provider/seller applications
- **Purpose**: Responds to transactions, provides catalog and fulfillment
- **Examples**: Restaurant POS, grocery store system, logistics provider
- **Primary APIs**: `on_search`, `on_select`, `on_init`, `on_confirm`, `on_status`, `on_track`

## 🔧 **Environment Configuration**

### **For BAP (Buyer App)**

Create `.env` file:
```bash
# BAP Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BAP
ONDC_SUBSCRIBER_ID=mybuyer-app.example.com
ONDC_SUBSCRIBER_URL=https://mybuyer-app.example.com
ONDC_TYPE=BAP
ONDC_DOMAIN=ONDC:RET10
ONDC_CITY=std:080
ONDC_UNIQUE_KEY_ID=mybuyer-key-001
ONDC_SIGNING_PRIVATE_KEY=your-ed25519-private-key
ONDC_ENCRYPTION_PRIVATE_KEY=your-encryption-private-key

# BAP Specific
BAP_ID=mybuyer-app.example.com
BAP_URI=https://mybuyer-app.example.com
BAP_CALLBACK_URL=/webhooks/ondc/buyer
```

**Claude Usage Examples for BAP:**
```
"Register my grocery delivery app as a BAP on ONDC staging for Bangalore"
"Search for organic vegetables available for delivery in Bangalore"
"Place an order for 2kg apples from seller fresh-mart-store.example.com"
```

### **For BPP (Seller App)**

Create `.env` file:
```bash
# BPP Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BPP
ONDC_SUBSCRIBER_ID=myseller-app.example.com
ONDC_SUBSCRIBER_URL=https://myseller-app.example.com
ONDC_TYPE=BPP
ONDC_DOMAIN=ONDC:RET10
ONDC_CITY=std:080
ONDC_UNIQUE_KEY_ID=myseller-key-001
ONDC_SIGNING_PRIVATE_KEY=your-ed25519-private-key
ONDC_ENCRYPTION_PRIVATE_KEY=your-encryption-private-key

# BPP Specific
BPP_ID=myseller-app.example.com
BPP_URI=https://myseller-app.example.com
BPP_CALLBACK_URL=/webhooks/ondc/seller
```

**Claude Usage Examples for BPP:**
```
"Register my grocery store as a BPP on ONDC staging for Bangalore"
"Handle incoming search request for vegetables and send catalog response"
"Confirm order ORD123456 with delivery details"
```

### **For Dual Role (BAP + BPP)**

If you're building a marketplace or platform that acts as both buyer and seller:

```bash
# Dual Role Configuration
ONDC_ENVIRONMENT=staging
ONDC_ROLE=BOTH
ONDC_DEFAULT_ROLE=BAP

# BAP Configuration
BAP_SUBSCRIBER_ID=myplatform-buyer.example.com
BAP_SUBSCRIBER_URL=https://myplatform-buyer.example.com
BAP_UNIQUE_KEY_ID=platform-bap-key-001
BAP_SIGNING_PRIVATE_KEY=your-bap-ed25519-private-key
BAP_ENCRYPTION_PRIVATE_KEY=your-bap-encryption-private-key

# BPP Configuration  
BPP_SUBSCRIBER_ID=myplatform-seller.example.com
BPP_SUBSCRIBER_URL=https://myplatform-seller.example.com
BPP_UNIQUE_KEY_ID=platform-bpp-key-001
BPP_SIGNING_PRIVATE_KEY=your-bpp-ed25519-private-key
BPP_ENCRYPTION_PRIVATE_KEY=your-bpp-encryption-private-key

# Common
ONDC_DOMAIN=ONDC:RET10
ONDC_CITY=std:080
```

**Claude Usage Examples for Dual Role:**
```
"Register as BAP for my consumer marketplace operations"
"Register as BPP for my merchant onboarding services"  
"Switch to BPP mode and handle incoming catalog requests"
```

## 🏪 **Domain-Specific Configurations**

### **Retail/Grocery (ONDC:RET10)**
```bash
ONDC_DOMAIN=ONDC:RET10
ONDC_CATEGORY=Grocery
# Examples: Supermarkets, grocery stores, vegetable vendors
```

### **Food & Beverages (ONDC:RET11)**
```bash
ONDC_DOMAIN=ONDC:RET11  
ONDC_CATEGORY=F&B
# Examples: Restaurants, cloud kitchens, beverage suppliers
```

### **Fashion (ONDC:RET12)**
```bash
ONDC_DOMAIN=ONDC:RET12
ONDC_CATEGORY=Fashion
# Examples: Clothing stores, footwear, accessories
```

### **Electronics (ONDC:RET14)**
```bash
ONDC_DOMAIN=ONDC:RET14
ONDC_CATEGORY=Electronics  
# Examples: Mobile stores, computer retailers, gadget shops
```

### **Logistics (ONDC:LOG10)**
```bash
ONDC_DOMAIN=ONDC:LOG10
ONDC_CATEGORY=Logistics
# Examples: Delivery services, courier companies, freight
```

### **Mobility (ONDC:TRV10)**
```bash
ONDC_DOMAIN=ONDC:TRV10
ONDC_CATEGORY=Mobility
# Examples: Cab services, bike rentals, bus booking
```

## 🌍 **Environment-Specific Settings**

### **Staging Environment**
```bash
ONDC_ENVIRONMENT=staging
ONDC_REGISTRY_URL=https://staging.registry.ondc.org
ONDC_GATEWAY_URL=https://pilot-gateway-1.beckn.nsdl.co.in
ONDC_PUBLIC_KEY=MCowBQYDK2VuAyEAduMuZgmtpjdCuxv+Nc49K0cB6tL/Dj3HZetvVN7ZekM=
```

### **Pre-Production Environment**
```bash
ONDC_ENVIRONMENT=preprod
ONDC_REGISTRY_URL=https://preprod.registry.ondc.org
ONDC_GATEWAY_URL=https://preprod.gateway.ondc.org
ONDC_PUBLIC_KEY=MCowBQYDK2VuAyEAa9Wbpvd9SsrpOZFcynyt/TO3x0Yrqyys4NUGIvyxX2Q=
```

### **Production Environment**
```bash
ONDC_ENVIRONMENT=prod
ONDC_REGISTRY_URL=https://prod.registry.ondc.org
ONDC_GATEWAY_URL=https://prod.gateway.ondc.org
ONDC_PUBLIC_KEY=MCowBQYDK2VuAyEAvVEyZY91O2yV8w8/CAwVDAnqIZDJJUPdLUUKwLo3K0M=
```

## 🔑 **Key Generation Guide**

### **Generate Ed25519 Keys**
```bash
# Install OpenSSL if not available
# Generate signing key pair
openssl genpkey -algorithm Ed25519 -out signing_private_key.pem
openssl pkey -in signing_private_key.pem -pubout -out signing_public_key.pem

# Generate encryption key pair  
openssl genpkey -algorithm Ed25519 -out encryption_private_key.pem
openssl pkey -in encryption_private_key.pem -pubout -out encryption_public_key.pem

# Convert to base64 for ONDC
echo "Signing Private Key:"
openssl pkey -in signing_private_key.pem -outform DER | base64 -w 0

echo "Signing Public Key:"
openssl pkey -in signing_public_key.pem -pubin -outform DER | base64 -w 0

echo "Encryption Private Key:"
openssl pkey -in encryption_private_key.pem -outform DER | base64 -w 0

echo "Encryption Public Key:"
openssl pkey -in encryption_public_key.pem -pubin -outform DER | base64 -w 0
```

## 📋 **Complete Registration Examples**

### **BAP Registration with Claude**
```
"Register my grocery delivery app on ONDC staging with these details:
- Subscriber ID: grocery-fresh.myapp.com
- Type: BAP
- Domain: ONDC:RET10  
- City: Bangalore (std:080)
- Legal Entity: Fresh Groceries Pvt Ltd
- GST: 29AAAAA0000A1Z5
- Email: support@myapp.com"
```

### **BPP Registration with Claude**
```
"Register my organic grocery store on ONDC staging with these details:
- Subscriber ID: organic-store.freshmart.com
- Type: BPP
- Domain: ONDC:RET10
- City: Mumbai (std:022)  
- Legal Entity: Fresh Mart Organic Foods
- GST: 27BBBBB1111B2Z6
- Email: orders@freshmart.com"
```

## 🔧 **Configuration Validation**

Before going live, test your configuration:

```
# Test registry lookup
"Look up my subscriber registration status on ONDC"

# Test BAP operations
"Search for test products in my configured city"

# Test BPP operations  
"Simulate handling an incoming search request"

# Test authentication
"Verify my signing keys are working correctly"
```

## 🚨 **Security Best Practices**

1. **Never commit private keys** to version control
2. **Use different keys** for staging/preprod/production
3. **Rotate keys regularly** in production
4. **Store keys securely** using environment variables or key management services
5. **Monitor key usage** and API access logs

## 📞 **Getting Help**

- **ONDC Portal**: [https://portal.ondc.org](https://portal.ondc.org)
- **Technical Support**: [techsupport@ondc.org](mailto:techsupport@ondc.org)
- **Developer Community**: [ONDC GitHub Discussions](https://github.com/ONDC-Official/developer-docs/discussions)

---

Choose your configuration based on your business role and start building on ONDC! 🚀