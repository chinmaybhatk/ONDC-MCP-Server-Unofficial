# ONDC MCP Server - Comprehensive & Unofficial

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

A **comprehensive Model Context Protocol (MCP) server** for ONDC (Open Network for Digital Commerce) APIs. This server provides complete Beckn protocol compliance with **25+ API endpoints** covering e-commerce, logistics, mobility, and financial services.

> **⚠️ Unofficial Implementation**: This is a community-driven, unofficial implementation of ONDC APIs for educational and development purposes.

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial.git
cd ONDC-MCP-Server-Unofficial
npm install && npm run build

# 2. Configure Claude Desktop (see USAGE_GUIDE.md for details)
# Add server config to claude_desktop_config.json

# 3. Start using with Claude!
# "Search for organic vegetables in Bangalore on ONDC network"
```

📖 **[Complete Setup Guide →](USAGE_GUIDE.md)**

## 🎯 BAP and BPP Support

This MCP server now supports both **BAP (Buyer Application Platform)** and **BPP (Buyer-side Platform Provider)** implementations:

### 🛒 BAP Features (Buyer Applications)
- Product discovery across ONDC network
- Order management and tracking  
- Payment processing integration
- Multi-domain support (retail, food, mobility)
- Real-time order status updates

### 🏪 BPP Features (Seller Platforms) 
- Catalog management and inventory sync
- Order processing and fulfillment
- Multi-location store management
- Analytics and reporting tools
- Webhook handling for BAP requests

### 📚 Documentation
- **[BAP/BPP Implementation Guide](docs/BAP_BPP_IMPLEMENTATION.md)** - Complete implementation details
- **[Usage Examples](docs/USAGE_EXAMPLES.md)** - Practical usage scenarios

### 🚀 Quick Start
```bash
# For BAP (Buyer App) setup
cp templates/.env.bap.template .env

# For BPP (Seller Platform) setup  
cp templates/.env.bpp.template .env

# Build and start
npm install && npm run build && npm start
```

### 💬 Usage with Claude
Once configured, use natural language with Claude:

**BAP Examples:**
- "Search for organic vegetables in Bangalore on ONDC network"
- "Select 2kg apples from FreshMart and place order with UPI payment"

**BPP Examples:**  
- "Add organic tomatoes to my grocery catalog with price ₹80/kg"
- "Update order ORD123 status to 'Out for delivery' with tracking info"

## 🌟 Features

### Complete API Coverage (25+ Endpoints)

#### 🔧 **Registry APIs**
- `ondc_subscribe` - Network Participant registration
- `ondc_lookup` - Registry participant lookup

#### 🛒 **Core Transaction APIs (BAP → BPP)**
- `ondc_search` - Discovery of products/services
- `ondc_select` - Selection of items from catalog
- `ondc_init` - Initialize order with billing/shipping
- `ondc_confirm` - Confirm the order
- `ondc_status` - Check order status
- `ondc_track` - Track order/fulfillment
- `ondc_cancel` - Cancel order
- `ondc_update` - Update order
- `ondc_rating` - Rate and review
- `ondc_support` - Get support information

#### 📞 **Callback APIs (BPP → BAP)**
- `ondc_on_search` - Catalog response handling
- `ondc_on_select` - Quote response handling
- `ondc_on_init` - Payment terms response
- `ondc_on_confirm` - Order confirmation response
- `ondc_on_status` - Status update response
- `ondc_on_track` - Tracking information response
- `ondc_on_cancel` - Cancellation confirmation
- `ondc_on_update` - Update acknowledgment
- `ondc_on_rating` - Rating acknowledgment
- `ondc_on_support` - Support information response

#### 🎯 **Issue Management APIs**
- `ondc_issue` - Raise an issue/dispute
- `ondc_issue_status` - Check issue status
- `ondc_on_issue` - Issue acknowledgment response
- `ondc_on_issue_status` - Issue status response

### 🌍 **Multi-Environment Support**
- **Staging** - Development & testing
- **Pre-Production** - Final validation
- **Production** - Live ONDC network

### 🏪 **Domain Support**
- **ONDC:RET10** - Grocery
- **ONDC:RET11** - Food & Beverages
- **ONDC:RET12** - Fashion
- **ONDC:RET13** - Beauty & Personal Care
- **ONDC:RET14** - Electronics
- **ONDC:RET15** - Home & Decor
- **ONDC:TRV10** - Mobility/Transportation
- **ONDC:FIS12** - Financial Services
- **ONDC:LOG10** - Logistics

### 🔐 **Built-in Security**
- Ed25519 signature authentication
- Environment-specific endpoint configuration
- Proper request validation and error handling
- Digital signing for all transactions

## 🎯 Natural Language Usage Examples

Once set up, use Claude with natural language:

### **Registry Operations**
```
"Register my grocery delivery app on ONDC staging environment with domain ONDC:RET10 for Bangalore operations"
```

### **Product Discovery**
```
"Search for organic vegetables available for delivery in Bangalore area code 560001"
"Find electronics stores selling smartphones under ₹20,000 in Chennai"
"Look for restaurants serving North Indian food in Delhi with home delivery"
```

### **Order Management**
```
"Check the status of order ORD123456 on the ONDC network"
"Track delivery for order ORD789012"
"Cancel order ORD345678 with reason 'customer request'"
```

### **Complete Workflows**
```
1. "Search for fresh fruits in Mumbai on ONDC retail network"
2. "Select 2kg apples and 1kg oranges from seller SEL123"
3. "Initialize order with billing address in Bandra, Mumbai"
4. "Confirm the order with UPI payment"
5. "Track the order delivery status"
```

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TypeScript 5.0+

### Quick Start

```bash
# Clone the repository
git clone https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial.git
cd ONDC-MCP-Server-Unofficial

# Install dependencies
npm install

# Build the project
npm run build

# Run the server
npm start
```

### Development Mode

```bash
# Run in development mode with hot reload
npm run dev

# Watch for changes
npm run watch
```

## 🔧 Configuration

### ONDC Credentials Setup

1. **Get ONDC Network Participant credentials:**
   - Register on the [ONDC Network Participant Portal](https://portal.ondc.org)
   - Complete your profile 100%
   - Submit environment access requests
   - Generate signing and encryption key pairs

2. **Configure Environment:**
   Create `.env` file with your ONDC credentials (see [USAGE_GUIDE.md](USAGE_GUIDE.md))

### Claude Desktop Integration

Add to your Claude Desktop config file:

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

**📖 [Detailed Setup Instructions →](USAGE_GUIDE.md)**

## 🎮 Real-World Use Cases

### **E-commerce Platform Integration**
```
"Help me integrate my existing e-commerce platform with ONDC network for multi-seller marketplace"
```

### **Restaurant Chain Operations**
```
"Connect my restaurant chain to ONDC for food delivery across multiple cities"
```

### **Logistics Provider Onboarding**
```
"Register my logistics company as a BPP on ONDC for last-mile delivery services"
```

### **Business Analytics**
```
"Analyze order patterns and seller performance on my ONDC-integrated marketplace"
"Generate sales report for last month from all ONDC channels"
```

## 🧪 Testing

```bash
# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 🚀 Advanced Features

### Webhook Simulation
The server includes callback API handlers for simulating webhook responses during development.

### Multi-Domain Support
Easily switch between different ONDC domains (retail, logistics, mobility, financial services).

### Error Handling
Comprehensive error handling with detailed error messages and proper HTTP status codes.

### Request Validation
Built-in validation for all API parameters and request bodies.

## 📚 Documentation

- **[Complete Usage Guide](USAGE_GUIDE.md)** - Step-by-step setup and usage
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Examples](examples/)** - Configuration examples and scripts
- **[Changelog](CHANGELOG.md)** - Version history

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📚 Resources

### ONDC Documentation
- [ONDC Developer Documentation](https://github.com/ONDC-Official/developer-docs)
- [ONDC Network Participant Portal](https://portal.ondc.org)
- [ONDC Protocol Specifications](https://github.com/ONDC-Official/ONDC-Protocol-Specs)

### Beckn Protocol
- [Beckn Protocol Documentation](https://developers.becknprotocol.io/)
- [Beckn Core Specification](https://github.com/beckn/protocol-specifications)

### Model Context Protocol
- [MCP Documentation](https://modelcontextprotocol.io)
- [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## 🔒 Security Considerations

1. **Private Key Security**: Never expose your private keys in code or logs
2. **Environment Isolation**: Use separate credentials for staging/preprod/prod
3. **Request Validation**: All requests are authenticated using Ed25519 signatures
4. **SSL/TLS**: All communications use HTTPS
5. **Rate Limiting**: Implement appropriate limits for API calls

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an **unofficial** MCP server for ONDC APIs created for educational and development purposes. It is not officially endorsed by ONDC or any related organizations. Please ensure compliance with ONDC's terms of service and technical requirements when using this server in production environments.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial/issues)
- **Discussions**: [GitHub Discussions](https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial/discussions)
- **Complete Usage Guide**: [USAGE_GUIDE.md](USAGE_GUIDE.md)

For ONDC-specific questions:
- [ONDC Tech Support](mailto:techsupport@ondc.org)
- [ONDC Developer Community](https://github.com/ONDC-Official/developer-docs/discussions)

---

**Made with ❤️ by the ONDC Community**

*Star ⭐ this repository if you find it helpful!*
