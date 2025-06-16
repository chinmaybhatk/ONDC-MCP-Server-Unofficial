# ONDC Authentication Setup Guide

This guide explains how to properly configure authentication for connecting to ONDC staging environment.

## Prerequisites

1. ONDC Network Participant credentials
2. Ed25519 signing keys
3. Access to ONDC staging environment

## Generate Ed25519 Keys

You can use one of these methods to generate your keys:

### Method 1: Using OpenSSL (Recommended)
```bash
# Generate private key
openssl genpkey -algorithm Ed25519 -out private_key.pem

# Extract public key
openssl pkey -in private_key.pem -pubout -out public_key.pem

# Convert to base64 for ONDC
openssl base64 -in private_key.pem -out private_key_base64.txt
openssl base64 -in public_key.pem -out public_key_base64.txt
```

### Method 2: Using Node.js with sodium-native
```bash
npm install sodium-native

node -e "
const sodium = require('sodium-native');

// Generate signing keypair (Ed25519)
const publicKey = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES);
const privateKey = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES);
sodium.crypto_sign_keypair(publicKey, privateKey);

console.log('Public Key (Base64):', publicKey.toString('base64'));
console.log('Private Key (Base64):', privateKey.toString('base64'));
"
```

## Environment Configuration

Create a `.env` file in the project root:

```env
# ONDC Environment
ONDC_ENVIRONMENT=staging

# Network Participant Details
ONDC_SUBSCRIBER_ID=your-subscriber.staging.ondc.org
ONDC_SUBSCRIBER_URL=https://your-subscriber.staging.ondc.org
ONDC_PARTICIPANT_TYPE=BAP  # or BPP

# Authentication Keys
ONDC_SIGNING_PUBLIC_KEY=<your-base64-encoded-public-key>
ONDC_SIGNING_PRIVATE_KEY=<your-base64-encoded-private-key>
ONDC_ENCRYPTION_PUBLIC_KEY=<your-encryption-public-key>
ONDC_ENCRYPTION_PRIVATE_KEY=<your-encryption-private-key>
ONDC_UNIQUE_KEY_ID=ed25519_01

# Domain Configuration
ONDC_DOMAIN=ONDC:RET10
ONDC_CITY=std:080

# Webhook Configuration
ONDC_WEBHOOK_URL=https://your-subscriber.staging.ondc.org/webhook

# Company Details (for registration)
COMPANY_NAME=Your Company Pvt Ltd
GST_NUMBER=29AAGCB1234C1Z5
PAN_NUMBER=AAGCB1234C
CONTACT_EMAIL=tech@yourcompany.com
CONTACT_PHONE=9999999999
```

## Important Notes

1. **Private Key Security**: Never commit your `.env` file or expose private keys
2. **Key Registration**: Register your public keys with ONDC through their portal
3. **IP Whitelisting**: Your server IP may need to be whitelisted by ONDC
4. **Staging URLs**: The code now uses correct staging URLs:
   - Registry: `https://staging.registry.ondc.org`
   - Gateway: `https://staging.gateway.proteantech.in`

## Testing Your Setup

After configuration, test with:

```bash
# Build the project
npm run build

# Run with your environment
npm start
```

Then test the lookup API:
```javascript
ondc_lookup({
  environment: "staging",
  type: "BPP",
  domain: "ONDC:RET10"
})
```

## Troubleshooting

1. **403 Forbidden**: Check if your keys are registered and IP is whitelisted
2. **401 Unauthorized**: Verify your private key and signing implementation
3. **404 Not Found**: Ensure you're using the correct API endpoints

## Next Steps

To complete the authentication implementation:

1. Install `sodium-native` or `tweetnacl` for proper Ed25519 signing
2. Replace the placeholder signature generation in the code
3. Test with your actual ONDC credentials

For production use, you'll need to implement proper Ed25519 signing using a cryptographic library.
