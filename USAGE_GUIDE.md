# How to Use ONDC MCP Server - Complete Guide

This guide walks you through setting up and using the ONDC MCP Server from installation to real-world usage.

## 🚀 **Quick Start Guide**

### Step 1: Clone and Install
```bash
git clone https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial.git
cd ONDC-MCP-Server-Unofficial
npm install
npm run build
```

### Step 2: Get ONDC Access
1. **Register**: Go to [ONDC Portal](https://portal.ondc.org)
2. **Complete Profile**: Fill 100% of your profile details
3. **Request Access**: Submit environment access requests
4. **Generate Keys**: Create Ed25519 signing and encryption keys

### Step 3: Configure Environment
Create `.env` file in project root:
```bash
# .env
ONDC_ENVIRONMENT=staging
ONDC_SUBSCRIBER_ID=your-app.example.com
ONDC_SUBSCRIBER_URL=https://your-app.example.com
ONDC_UNIQUE_KEY_ID=your-unique-key-id
ONDC_SIGNING_PRIVATE_KEY=your-ed25519-private-key
ONDC_ENCRYPTION_PRIVATE_KEY=your-encryption-private-key
```

### Step 4: Claude Desktop Integration
Add to Claude Desktop config:

**Config File Locations:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ondc-comprehensive": {
      "command": "node",
      "args": ["/absolute/path/to/ONDC-MCP-Server-Unofficial/build/index.js"],
      "env": {
        "NODE_ENV": "production",
        "ONDC_ENVIRONMENT": "staging"
      }
    }
  }
}
```

### Step 5: Restart Claude Desktop
Close and restart Claude Desktop completely to load the MCP server.

## 📱 **Natural Language Usage Examples**

Once integrated, you can use natural language with Claude to interact with ONDC:

### **🏪 Registry Operations**
```
"Register my grocery delivery app on ONDC staging environment with domain ONDC:RET10 for Bangalore operations"

"Look up all registered Buyer Apps in Mumbai for retail domain"

"Check my subscriber registration status on ONDC network"
```

### **🔍 Product Discovery**
```
"Search for organic vegetables available for delivery in Bangalore area code 560001"

"Find electronics stores selling smartphones under ₹20,000 in Chennai"

"Search for restaurants serving North Indian food in Delhi with home delivery"

"Look for logistics providers for pickup from Gurgaon to Noida"
```

### **🛒 Order Management**
```
"Check the status of order ORD123456 on the ONDC network"

"Track delivery for order ORD789012"

"Cancel order ORD345678 with reason 'customer request'"

"Update order ORD111222 to change delivery address"
```

### **⭐ Ratings & Reviews**
```
"Rate order ORD123456 with 4 stars for good service"

"Submit feedback for provider PRV789 regarding product quality"

"Check ratings for seller SEL456 in electronics category"
```

### **🎯 Issue Management**
```
"Raise an issue for order ORD123456 regarding delayed delivery with category FULFILLMENT"

"Check status of issue ISS789012"

"Report quality issue for order ORD345678 with photos"
```

## 🏗️ **Complete E-commerce Workflow Examples**

### **Scenario 1: Grocery Shopping**
```
1. "Search for fresh fruits in Mumbai on ONDC retail network"
2. "Select 2kg apples and 1kg oranges from seller SEL123"
3. "Initialize order with billing address in Bandra, Mumbai"
4. "Confirm the order with UPI payment"
5. "Track the order delivery status"
6. "Rate the order 5 stars after delivery"
```

### **Scenario 2: Restaurant Food Delivery**
```
1. "Find restaurants serving pizza in Bangalore with delivery"
2. "Select 2 pizzas from restaurant REST456"
3. "Set delivery address to Koramangala"
4. "Confirm order with cash on delivery"
5. "Track real-time delivery status"
```

### **Scenario 3: Electronics Purchase**
```
1. "Search for laptops under ₹50,000 in Delhi NCR"
2. "Compare specifications from different sellers"
3. "Select laptop from seller with best ratings"
4. "Initialize order with office address"
5. "Confirm with credit card payment"
6. "Track shipment until delivery"
```

## 🎯 **Domain-Specific Operations**

### **Retail (ONDC:RET10) - Grocery**
```
"Search for organic milk brands in Pune"
"Find vegetable vendors with same-day delivery in Hyderabad"
"Check availability of baby food products in Kolkata"
```

### **Food & Beverages (ONDC:RET11)**
```
"Find cloud kitchens serving healthy meals in Bangalore"
"Search for bakeries with custom cake options in Mumbai"
"Look for beverage suppliers for bulk orders in Delhi"
```

### **Fashion (ONDC:RET12)**
```
"Search for ethnic wear stores in Jaipur"
"Find shoe brands with size 9 availability in Chennai"
"Look for sustainable fashion brands on ONDC network"
```

### **Electronics (ONDC:RET14)**
```
"Find mobile phone dealers with warranty support in Gurgaon"
"Search for laptop service centers in Pune"
"Check availability of gaming accessories in Mumbai"
```

### **Logistics (ONDC:LOG10)**
```
"Find logistics partners for bulk shipments from Mumbai to Bangalore"
"Search for same-day delivery providers in Delhi NCR"
"Get quotes for interstate courier services"
```

### **Mobility (ONDC:TRV10)**
```
"Find cab services from airport to city center in Bangalore"
"Search for bike rental options in Goa"
"Look for bus booking options from Delhi to Agra"
```

## 🛠️ **Advanced Usage Patterns**

### **Multi-Step Business Operations**
```
# Inventory Management
"Check stock levels across all ONDC sellers for electronics category"

# Bulk Operations  
"Process 50 orders from my pending queue on ONDC network"

# Analytics
"Generate sales report for last month from all ONDC channels"

# Compliance
"Verify all my product listings meet ONDC catalog standards"
```

### **Customer Service Automation**
```
# Issue Resolution
"Help resolve customer complaint for order ORD789012 - delayed delivery"

# Bulk Customer Communication
"Send delivery updates to all customers with pending orders"

# Refund Processing
"Process refund for cancelled order ORD345678"
```

### **Business Intelligence**
```
# Performance Analysis
"Analyze top-performing products across all ONDC sellers this quarter"

# Market Research
"Compare pricing strategies of competitors in electronics domain"

# Trend Analysis
"Identify emerging product categories with high demand on ONDC"
```

## 🔧 **Development and Testing**

### **Testing in Staging Environment**
```bash
# Run in development mode
npm run dev

# Test specific APIs
"Test the ONDC lookup API to find all Buyer Apps in Bangalore"
"Verify my subscriber registration works correctly"
"Simulate a complete order flow in staging environment"
```

### **API Validation**
```
"Validate my product catalog format against ONDC standards"
"Test authentication with ONDC registry"
"Check if my webhook endpoints are working correctly"
```

## 🚨 **Troubleshooting Common Issues**

### **Server Issues**
```bash
# Check Node.js version (should be 18+)
node --version

# Rebuild the project
npm run build

# Check for errors
npm run dev
```

### **Claude Integration Issues**
1. **Server not recognized**: Check absolute path in Claude config
2. **APIs not working**: Verify ONDC credentials and environment
3. **Authentication errors**: Check subscriber ID and signing keys
4. **Network errors**: Verify ONDC environment endpoints

### **ONDC API Errors**
```
"Help debug why my ONDC search API is returning empty results"
"Check if my subscriber ID is properly whitelisted"
"Validate my request format against ONDC specifications"
```

## 📊 **Monitoring and Analytics**

### **Performance Monitoring**
```
"Monitor API response times for all ONDC endpoints"
"Track success rates for different API operations"
"Generate uptime reports for ONDC connectivity"
```

### **Business Metrics**
```
"Calculate conversion rates from search to order confirmation"
"Analyze customer satisfaction scores from ONDC orders"
"Track seller performance metrics across different domains"
```

## 🔄 **Production Deployment**

### **Pre-Production Checklist**
- [ ] Update authentication with real Ed25519 keys
- [ ] Configure production ONDC endpoints
- [ ] Set up SSL certificates
- [ ] Implement proper logging and monitoring
- [ ] Test all critical APIs in preprod environment

### **Production Commands**
```bash
# Install PM2 for production
npm install -g pm2

# Start in production mode
pm2 start build/index.js --name ondc-mcp-server

# Configure auto-restart
pm2 startup
pm2 save

# Monitor logs
pm2 logs ondc-mcp-server
```

## 🌟 **Best Practices**

### **Security**
- Never commit private keys to git
- Use environment variables for sensitive data
- Implement proper request validation
- Monitor for suspicious API usage

### **Performance**
- Cache frequently accessed data
- Implement retry logic for failed requests
- Monitor API rate limits
- Use connection pooling for high volume

### **Reliability**
- Implement comprehensive error handling
- Set up proper logging and monitoring
- Create backup and recovery procedures
- Test disaster recovery scenarios

## 🤝 **Getting Help**

### **Community Support**
- **GitHub Issues**: [Report bugs or request features](https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial/discussions)
- **ONDC Support**: [techsupport@ondc.org](mailto:techsupport@ondc.org)

### **Documentation**
- **ONDC Official Docs**: [GitHub](https://github.com/ONDC-Official/developer-docs)
- **Beckn Protocol**: [Documentation](https://developers.becknprotocol.io/)
- **MCP Protocol**: [Specification](https://modelcontextprotocol.io)

## 🚀 **Next Steps**

1. **Start with Staging**: Test all operations in staging environment
2. **Implement Authentication**: Add your real ONDC credentials
3. **Test Core Flows**: Verify search → select → init → confirm workflow
4. **Scale Gradually**: Move to preprod, then production
5. **Monitor & Optimize**: Track performance and optimize based on usage
6. **Contribute**: Share improvements with the community

---

**Ready to start?** Begin with the Quick Start Guide above and you'll be running ONDC operations through Claude in minutes! 🎉