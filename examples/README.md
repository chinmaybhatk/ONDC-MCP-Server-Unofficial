# Example configurations and scripts

## Development Environment Variables

Create a `.env` file in the root directory:

```bash
# ONDC Configuration
ONDC_ENVIRONMENT=staging
ONDC_SUBSCRIBER_ID=your-app.example.com
ONDC_SUBSCRIBER_URL=https://your-app.example.com
ONDC_UNIQUE_KEY_ID=your-unique-key-id
ONDC_SIGNING_PRIVATE_KEY=your-ed25519-private-key
ONDC_ENCRYPTION_PRIVATE_KEY=your-encryption-private-key

# MCP Configuration
MCP_SERVER_NAME=ondc-comprehensive-mcp
MCP_SERVER_VERSION=2.0.0

# Logging
LOG_LEVEL=debug
NODE_ENV=development
```

## Claude Desktop Configuration

Add to your Claude Desktop config:

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

## Sample API Requests

### Register Network Participant
```json
{
  "environment": "staging",
  "subscriber_id": "myapp.example.com",
  "subscriber_url": "https://myapp.example.com",
  "type": "BAP",
  "domain": "ONDC:RET10",
  "city": "std:080",
  "signing_public_key": "MCowBQYDK2VuAyEA...",
  "encryption_public_key": "MCowBQYDK2VuAyEA...",
  "callback_url": "/webhooks/ondc",
  "unique_key_id": "myapp-key-001",
  "gst_no": "29AAAAA0000A1Z5",
  "pan_no": "AAAAA0000A",
  "legal_entity_name": "My Company Pvt Ltd",
  "authorized_signatory": "John Doe",
  "email": "contact@myapp.example.com",
  "mobile": "+919999999999"
}
```

### Search for Products
```json
{
  "environment": "staging",
  "domain": "ONDC:RET10",
  "bap_id": "myapp.example.com",
  "bap_uri": "https://myapp.example.com",
  "location": {
    "gps": "12.9716,77.5946",
    "area_code": "560001",
    "city": "Bangalore",
    "country": "IND"
  },
  "intent": {
    "item": {
      "descriptor": {
        "name": "organic vegetables"
      }
    },
    "category": {
      "descriptor": {
        "code": "Grocery"
      }
    },
    "fulfillment": {
      "type": "Delivery"
    }
  }
}
```

## Docker Configuration

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY build/ ./build/

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  ondc-mcp-server:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - ONDC_ENVIRONMENT=staging
    volumes:
      - ./config:/app/config:ro
    restart: unless-stopped
```

## GitHub Actions Workflow

### .github/workflows/ci.yml
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - run: npm ci
    - run: npm run build
    - run: npm run lint
    - run: npm test
```

## Monitoring and Logging

### Simple logging configuration
```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'ondc-mcp-server' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

## Testing Scripts

### test-basic-apis.js
```javascript
#!/usr/bin/env node

const { spawn } = require('child_process');

async function testMCPServer() {
  console.log('Starting ONDC MCP Server tests...');
  
  const server = spawn('node', ['build/index.js'], {
    stdio: ['pipe', 'pipe', 'inherit']
  });
  
  // Test list_tools
  server.stdin.write(JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/list"
  }) + '\n');
  
  server.stdout.on('data', (data) => {
    console.log('Server response:', data.toString());
  });
  
  setTimeout(() => {
    server.kill();
    console.log('Test completed');
  }, 5000);
}

testMCPServer().catch(console.error);
```

## Production Deployment

### PM2 Configuration (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: 'ondc-mcp-server',
    script: 'build/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      ONDC_ENVIRONMENT: 'prod'
    },
    env_development: {
      NODE_ENV: 'development',
      ONDC_ENVIRONMENT: 'staging'
    },
    log_file: './logs/combined.log',
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    time: true
  }]
};
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Security Configurations

### Key Generation Script
```bash
#!/bin/bash

# Generate Ed25519 key pair for ONDC
openssl genpkey -algorithm Ed25519 -out private_key.pem
openssl pkey -in private_key.pem -pubout -out public_key.pem

# Convert to base64 for ONDC registration
echo "Private Key (base64):"
openssl pkey -in private_key.pem -outform DER | base64 -w 0

echo "Public Key (base64):"
openssl pkey -in public_key.pem -pubin -outform DER | base64 -w 0
```

### Environment-specific Configurations
```typescript
const configs = {
  staging: {
    registry: 'https://staging.registry.ondc.org',
    gateway: 'https://pilot-gateway-1.beckn.nsdl.co.in',
    timeout: 30000,
    retries: 3
  },
  preprod: {
    registry: 'https://preprod.registry.ondc.org',
    gateway: 'https://preprod.gateway.ondc.org',
    timeout: 20000,
    retries: 2
  },
  prod: {
    registry: 'https://prod.registry.ondc.org',
    gateway: 'https://prod.gateway.ondc.org',
    timeout: 15000,
    retries: 1
  }
};
```