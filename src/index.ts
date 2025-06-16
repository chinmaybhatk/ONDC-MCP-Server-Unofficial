#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import crypto from 'crypto';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ONDC API Configuration
interface ONDCConfig {
  environment: 'staging' | 'preprod' | 'prod';
  baseUrl: string;
  publicKey: string;
  privateKey?: string;
  uniqueKeyId: string;
  subscriberId: string;
}

const ONDC_ENDPOINTS = {
  staging: {
    registry: 'https://staging.registry.ondc.org',
    gateway: 'https://staging.gateway.proteantech.in',
    publicKey: 'MCowBQYDK2VuAyEAduMuZgmtpjdCuxv+Nc49K0cB6tL/Dj3HZetvVN7ZekM='
  },
  preprod: {
    registry: 'https://preprod.registry.ondc.org/ondc',
    gateway: 'https://preprod.gateway.proteantech.in',
    publicKey: 'MCowBQYDK2VuAyEAa9Wbpvd9SsrpOZFcynyt/TO3x0Yrqyys4NUGIvyxX2Q='
  },
  prod: {
    registry: 'https://prod.registry.ondc.org/ondc',
    gateway: 'https://gateway.ondc.org',
    publicKey: 'MCowBQYDK2VuAyEAvVEyZY91O2yV8w8/CAwVDAnqIZDJJUPdLUUKwLo3K0M='
  }
};

// Registry API version paths
const REGISTRY_API_PATHS = {
  lookup: '/v2.0/lookup',
  subscribe: '/subscribe'
};

class ONDCAPIClient {
  private config: ONDCConfig;

  constructor(config: ONDCConfig) {
    this.config = config;
  }

  private async generateSignature(payload: string, privateKey: string): Promise<string> {
    try {
      // For now, return a placeholder. In production, use sodium-native or tweetnacl
      // to generate proper Ed25519 signatures
      const timestamp = Date.now();
      const dataToSign = `(created): ${timestamp}\n(expires): ${timestamp + 300000}\ndigest: ${payload}`;
      
      // TODO: Implement actual Ed25519 signing
      // const sodium = require('sodium-native');
      // const signature = Buffer.alloc(sodium.crypto_sign_BYTES);
      // const messageBuffer = Buffer.from(dataToSign);
      // const privateKeyBuffer = Buffer.from(privateKey, 'base64');
      // sodium.crypto_sign_detached(signature, messageBuffer, privateKeyBuffer);
      // return signature.toString('base64');
      
      // Placeholder for now
      console.warn("WARNING: Using placeholder signature. Real Ed25519 signing needs to be implemented.");
      return Buffer.from(dataToSign).toString('base64');
    } catch (error) {
      console.error('Error generating signature:', error);
      throw error;
    }
  }

  private async generateAuthHeader(requestBody: any, path: string): Promise<string> {
    const created = Math.floor(Date.now() / 1000);
    const expires = created + 300; // 5 minutes
    
    // Create digest of the request body
    const bodyString = JSON.stringify(requestBody);
    const digest = crypto.createHash('sha256').update(bodyString).digest('base64');
    
    // Get private key from environment or config
    const privateKey = process.env.ONDC_PRIVATE_KEY || this.config.privateKey || '';
    
    if (!privateKey) {
      console.warn("WARNING: No private key configured. Authentication will fail.");
    }
    
    // Generate signature
    const signature = await this.generateSignature(bodyString, privateKey);
    
    // Build Authorization header
    const keyId = `${this.config.subscriberId}|${this.config.uniqueKeyId}|ed25519`;
    
    return `Signature keyId="${keyId}",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;
  }

  private createContext(action: string, domain: string, bap_id?: string, bap_uri?: string, bpp_id?: string, bpp_uri?: string): any {
    const baseContext = {
      domain,
      action,
      core_version: "1.2.0",
      bap_id: bap_id || this.config.subscriberId,
      bap_uri: bap_uri || `https://${this.config.subscriberId}`,
      transaction_id: crypto.randomUUID(),
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ttl: "PT30S"
    };

    if (bpp_id && bpp_uri) {
      return {
        ...baseContext,
        bpp_id,
        bpp_uri
      };
    }

    return baseContext;
  }

  async makeRequest(endpoint: string, method: string, data?: any, useGateway: boolean = false): Promise<any> {
    const baseUrl = useGateway ? ONDC_ENDPOINTS[this.config.environment].gateway : ONDC_ENDPOINTS[this.config.environment].registry;
    
    // Handle registry API versioning
    let fullEndpoint = endpoint;
    if (!useGateway && endpoint === '/lookup') {
      fullEndpoint = REGISTRY_API_PATHS.lookup;
    } else if (!useGateway && endpoint === '/subscribe') {
      fullEndpoint = REGISTRY_API_PATHS.subscribe;
    }
    
    const url = `${baseUrl}${fullEndpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Timestamp': new Date().toISOString(),
    };

    if (data && method !== 'GET') {
      const authHeader = await this.generateAuthHeader(data, fullEndpoint);
      headers['Authorization'] = authHeader;
      
      // Add digest header
      const bodyString = JSON.stringify(data);
      const digest = crypto.createHash('sha256').update(bodyString).digest('base64');
      headers['Digest'] = `SHA-256=${digest}`;
      
      if (useGateway) {
        headers['X-Gateway-Authorization'] = authHeader;
      }
    }

    console.log(`Making request to: ${url}`);
    console.log(`Headers:`, headers);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

const server = new Server(
  {
    name: "ondc-comprehensive-mcp",
    version: "2.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define all ONDC/Beckn Protocol API tools
const tools: Tool[] = [
  // =================================================================
  // REGISTRY APIs
  // =================================================================
  {
    name: "ondc_subscribe",
    description: "Subscribe a Network Participant to ONDC registry",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        subscriber_id: { type: "string", description: "FQDN of the subscriber" },
        subscriber_url: { type: "string", description: "Base URL of the subscriber" },
        type: { type: "string", enum: ["BAP", "BPP", "BG", "LREG", "CREG", "RREG"] },
        domain: { type: "string", description: "Domain code (e.g., 'ONDC:RET10')" },
        country: { type: "string", default: "IND" },
        city: { type: "string", description: "City code" },
        signing_public_key: { type: "string" },
        encryption_public_key: { type: "string" },
        callback_url: { type: "string" },
        unique_key_id: { type: "string" },
        gst_no: { type: "string", description: "GST number" },
        pan_no: { type: "string", description: "PAN number" },
        legal_entity_name: { type: "string" },
        authorized_signatory: { type: "string" },
        email: { type: "string" },
        mobile: { type: "string" }
      },
      required: ["environment", "subscriber_id", "subscriber_url", "type", "domain", "city", "signing_public_key", "encryption_public_key", "callback_url", "unique_key_id"]
    }
  },
  {
    name: "ondc_lookup",
    description: "Lookup Network Participants in ONDC registry",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        type: { type: "string", enum: ["BAP", "BPP", "BG"] },
        domain: { type: "string" },
        country: { type: "string", default: "IND" },
        city: { type: "string" },
        subscriber_id: { type: "string" }
      },
      required: ["environment"]
    }
  },

  // =================================================================
  // CORE TRANSACTION APIs (BAP → BPP)
  // =================================================================
  {
    name: "ondc_search",
    description: "Search for products/services on ONDC network",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string", description: "Domain code" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        location: {
          type: "object",
          properties: {
            gps: { type: "string" },
            area_code: { type: "string" },
            city: { type: "string" },
            country: { type: "string" }
          }
        },
        intent: {
          type: "object",
          properties: {
            item: {
              type: "object",
              properties: {
                descriptor: {
                  type: "object",
                  properties: { name: { type: "string" } }
                }
              }
            },
            category: {
              type: "object", 
              properties: {
                descriptor: {
                  type: "object",
                  properties: { code: { type: "string" } }
                }
              }
            },
            fulfillment: {
              type: "object",
              properties: { type: { type: "string" } }
            },
            payment: {
              type: "object",
              properties: { type: { type: "string" } }
            }
          }
        }
      },
      required: ["environment", "domain", "bap_id", "bap_uri"]
    }
  },
  {
    name: "ondc_select",
    description: "Select items from catalog",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        order: {
          type: "object",
          properties: {
            provider: {
              type: "object",
              properties: { id: { type: "string" } }
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  quantity: {
                    type: "object",
                    properties: { count: { type: "number" } }
                  }
                }
              }
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  type: { type: "string" }
                }
              }
            }
          }
        }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "order"]
    }
  },
  {
    name: "ondc_init",
    description: "Initialize order with billing and fulfillment details",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        order: {
          type: "object",
          properties: {
            provider: { type: "object", properties: { id: { type: "string" } } },
            items: { type: "array" },
            billing: {
              type: "object",
              properties: {
                name: { type: "string" },
                address: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    building: { type: "string" },
                    locality: { type: "string" },
                    city: { type: "string" },
                    state: { type: "string" },
                    country: { type: "string" },
                    area_code: { type: "string" }
                  }
                },
                email: { type: "string" },
                phone: { type: "string" }
              }
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  type: { type: "string" },
                  end: {
                    type: "object",
                    properties: {
                      contact: {
                        type: "object",
                        properties: {
                          email: { type: "string" },
                          phone: { type: "string" }
                        }
                      },
                      location: {
                        type: "object",
                        properties: {
                          gps: { type: "string" },
                          address: { type: "object" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "order"]
    }
  },
  {
    name: "ondc_confirm",
    description: "Confirm order with payment details",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        order: {
          type: "object",
          description: "Complete order object with payment details"
        }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "order"]
    }
  },
  {
    name: "ondc_status",
    description: "Check order status",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        order_id: { type: "string" }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "order_id"]
    }
  },
  {
    name: "ondc_track",
    description: "Track order/fulfillment",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        order_id: { type: "string" },
        callback_url: { type: "string", description: "URL for tracking updates" }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "order_id"]
    }
  },
  {
    name: "ondc_cancel",
    description: "Cancel order",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        order_id: { type: "string" },
        cancellation_reason_id: { type: "string" },
        descriptor: {
          type: "object",
          properties: {
            short_desc: { type: "string" },
            long_desc: { type: "string" }
          }
        }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "order_id", "cancellation_reason_id"]
    }
  },
  {
    name: "ondc_update",
    description: "Update order",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        order_id: { type: "string" },
        update_target: { type: "string", description: "What to update: item,billing,fulfillment" },
        order: { type: "object", description: "Updated order object" }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "order_id", "update_target", "order"]
    }
  },
  {
    name: "ondc_rating",
    description: "Rate and review order/service",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        order_id: { type: "string" },
        rating_category: { type: "string", enum: ["Item", "Order", "Fulfillment", "Provider"] },
        rating_value: { type: "number", minimum: 1, maximum: 5 },
        feedback_form: {
          type: "array",
          items: {
            type: "object",
            properties: {
              question: { type: "string" },
              answer: { type: "string" }
            }
          }
        }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "order_id", "rating_category", "rating_value"]
    }
  },
  {
    name: "ondc_support",
    description: "Get support information",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        order_id: { type: "string" },
        support_type: { type: "string", description: "Type of support needed" }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri"]
    }
  },

  // =================================================================
  // CALLBACK APIs (BPP → BAP) - For monitoring/webhook setup
  // =================================================================
  {
    name: "ondc_on_search",
    description: "Handle catalog response from search (webhook simulation)",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        catalog: {
          type: "object",
          description: "Catalog of products/services"
        }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "catalog"]
    }
  },
  {
    name: "ondc_on_select",
    description: "Handle quote response from select",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        order: { type: "object", description: "Order with quote details" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "order"]
    }
  },
  {
    name: "ondc_on_init",
    description: "Handle payment terms response from init",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        order: { type: "object", description: "Order with payment terms" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "order"]
    }
  },
  {
    name: "ondc_on_confirm",
    description: "Handle order confirmation response",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        order: { type: "object", description: "Confirmed order details" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "order"]
    }
  },
  {
    name: "ondc_on_status",
    description: "Handle order status response",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        order: { type: "object", description: "Order with current status" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "order"]
    }
  },
  {
    name: "ondc_on_track",
    description: "Handle tracking information response",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        tracking: { type: "object", description: "Tracking information" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "tracking"]
    }
  },
  {
    name: "ondc_on_cancel",
    description: "Handle cancellation confirmation response",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        order: { type: "object", description: "Cancelled order details" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "order"]
    }
  },
  {
    name: "ondc_on_update",
    description: "Handle update acknowledgment response",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        order: { type: "object", description: "Updated order details" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "order"]
    }
  },
  {
    name: "ondc_on_rating",
    description: "Handle rating acknowledgment response",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        rating: { type: "object", description: "Rating acknowledgment" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "rating"]
    }
  },
  {
    name: "ondc_on_support",
    description: "Handle support information response",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        support: { type: "object", description: "Support contact information" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "support"]
    }
  },

  // =================================================================
  // ISSUE MANAGEMENT APIs
  // =================================================================
  {
    name: "ondc_issue",
    description: "Raise an issue/dispute",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        order_id: { type: "string" },
        issue: {
          type: "object",
          properties: {
            category: { type: "string" },
            sub_category: { type: "string" },
            complainant_info: {
              type: "object",
              properties: {
                person: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    image: { type: "string" }
                  }
                },
                contact: {
                  type: "object",
                  properties: {
                    phone: { type: "string" },
                    email: { type: "string" }
                  }
                }
              }
            },
            description: {
              type: "object",
              properties: {
                short_desc: { type: "string" },
                long_desc: { type: "string" },
                images: { type: "array", items: { type: "string" } }
              }
            },
            source: {
              type: "object",
              properties: {
                network_participant_id: { type: "string" },
                type: { type: "string" }
              }
            },
            expected_response_time: {
              type: "object",
              properties: {
                duration: { type: "string" }
              }
            },
            expected_resolution_time: {
              type: "object",
              properties: {
                duration: { type: "string" }
              }
            }
          }
        }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "order_id", "issue"]
    }
  },
  {
    name: "ondc_issue_status",
    description: "Check issue status",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        issue_id: { type: "string" }
      },
      required: ["environment", "domain", "bap_id", "bap_uri", "bpp_id", "bpp_uri", "issue_id"]
    }
  },
  {
    name: "ondc_on_issue",
    description: "Handle issue acknowledgment response",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        issue: { type: "object", description: "Issue details with assigned ID" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "issue"]
    }
  },
  {
    name: "ondc_on_issue_status",
    description: "Handle issue status response",
    inputSchema: {
      type: "object",
      properties: {
        environment: { type: "string", enum: ["staging", "preprod", "prod"] },
        domain: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        bap_id: { type: "string" },
        bap_uri: { type: "string" },
        issue: { type: "object", description: "Issue with current status" }
      },
      required: ["environment", "domain", "bpp_id", "bpp_uri", "bap_id", "bap_uri", "issue"]
    }
  }
];

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools,
  };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Initialize API client with environment variables
    const config: ONDCConfig = {
      environment: args.environment || process.env.ONDC_ENVIRONMENT || 'staging',
      baseUrl: ONDC_ENDPOINTS[args.environment || 'staging'].registry,
      publicKey: ONDC_ENDPOINTS[args.environment || 'staging'].publicKey,
      privateKey: process.env.ONDC_PRIVATE_KEY,
      uniqueKeyId: args.unique_key_id || process.env.ONDC_UNIQUE_KEY_ID || 'ed25519_01',
      subscriberId: args.bap_id || args.subscriber_id || process.env.ONDC_SUBSCRIBER_ID || 'default-subscriber.ondc.org'
    };

    const apiClient = new ONDCAPIClient(config);

    // Handle Registry APIs
    if (name === "ondc_subscribe") {
      const subscribeData = {
        context: apiClient['createContext']('subscribe', args.domain, args.subscriber_id, args.subscriber_url),
        message: {
          entity: {
            gst: {
              lawful_basis: "consent",
              business_id: args.gst_no || "",
              legal_entity_name: args.legal_entity_name || ""
            },
            pan: {
              name_as_per_pan: args.legal_entity_name || "",
              pan_no: args.pan_no || "",
              date_of_incorporation: new Date().toISOString().split('T')[0]
            },
            name_of_authorised_signatory: args.authorized_signatory || "",
            address_of_authorised_signatory: "",
            e_mail: args.email || "",
            mobile_no: args.mobile || "",
            country: args.country || "IND",
            subscriber_id: args.subscriber_id,
            subscriber_url: args.subscriber_url,
            type: args.type,
            cb_url: args.callback_url,
            domain: args.domain,
            city: args.city,
            signing_public_key: args.signing_public_key,
            encryption_public_key: args.encryption_public_key,
            unique_key_id: args.unique_key_id,
            valid_from: new Date().toISOString(),
            valid_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          }
        }
      };

      const result = await apiClient.makeRequest('/subscribe', 'POST', subscribeData);
      return {
        content: [{ type: "text", text: `ONDC Subscribe Response:\n${JSON.stringify(result, null, 2)}` }]
      };
    }

    if (name === "ondc_lookup") {
      const params = new URLSearchParams();
      if (args.type) params.append('type', args.type);
      if (args.domain) params.append('domain', args.domain);
      if (args.country) params.append('country', args.country);
      if (args.city) params.append('city', args.city);
      if (args.subscriber_id) params.append('subscriber_id', args.subscriber_id);

      const result = await apiClient.makeRequest(`/lookup?${params}`, 'GET');
      return {
        content: [{ type: "text", text: `ONDC Lookup Response:\n${JSON.stringify(result, null, 2)}` }]
      };
    }

    // Handle Transaction APIs
    const transactionAPIs = [
      'ondc_search', 'ondc_select', 'ondc_init', 'ondc_confirm', 
      'ondc_status', 'ondc_track', 'ondc_cancel', 'ondc_update', 
      'ondc_rating', 'ondc_support'
    ];

    if (transactionAPIs.includes(name)) {
      const action = name.replace('ondc_', '');
      const context = apiClient['createContext'](action, args.domain, args.bap_id, args.bap_uri, args.bpp_id, args.bpp_uri);
      
      let message: any = {};

      // Build message based on API type
      switch (action) {
        case 'search':
          message = { intent: args.intent };
          if (args.location) {
            message.location = args.location;
          }
          break;
        case 'select':
        case 'init':
        case 'confirm':
          message = { order: args.order };
          break;
        case 'status':
        case 'track':
        case 'support':
          message = { order_id: args.order_id };
          break;
        case 'cancel':
          message = {
            order_id: args.order_id,
            cancellation_reason_id: args.cancellation_reason_id,
            descriptor: args.descriptor
          };
          break;
        case 'update':
          message = {
            order_id: args.order_id,
            update_target: args.update_target,
            order: args.order
          };
          break;
        case 'rating':
          message = {
            order_id: args.order_id,
            rating_category: args.rating_category,
            rating_value: args.rating_value,
            feedback_form: args.feedback_form
          };
          break;
      }

      const requestData = { context, message };
      const result = await apiClient.makeRequest(`/${action}`, 'POST', requestData, true);
      
      return {
        content: [{ type: "text", text: `ONDC ${action.toUpperCase()} Response:\n${JSON.stringify(result, null, 2)}` }]
      };
    }

    // Handle Callback APIs (for webhook simulation/monitoring)
    const callbackAPIs = [
      'ondc_on_search', 'ondc_on_select', 'ondc_on_init', 'ondc_on_confirm',
      'ondc_on_status', 'ondc_on_track', 'ondc_on_cancel', 'ondc_on_update',
      'ondc_on_rating', 'ondc_on_support'
    ];

    if (callbackAPIs.includes(name)) {
      const action = name.replace('ondc_', '');
      const context = apiClient['createContext'](action, args.domain, args.bap_id, args.bap_uri, args.bpp_id, args.bpp_uri);
      
      let message: any = {};
      if (args.catalog) message.catalog = args.catalog;
      if (args.order) message.order = args.order;
      if (args.tracking) message.tracking = args.tracking;
      if (args.rating) message.rating = args.rating;
      if (args.support) message.support = args.support;

      // Simulate callback response
      return {
        content: [{
          type: "text", 
          text: `ONDC ${action.toUpperCase()} Callback Simulated:\nContext: ${JSON.stringify(context, null, 2)}\nMessage: ${JSON.stringify(message, null, 2)}`
        }]
      };
    }

    // Handle Issue Management APIs
    const issueAPIs = ['ondc_issue', 'ondc_issue_status', 'ondc_on_issue', 'ondc_on_issue_status'];
    
    if (issueAPIs.includes(name)) {
      const action = name.replace('ondc_', '');
      const context = apiClient['createContext'](action, args.domain, args.bap_id, args.bap_uri, args.bpp_id, args.bpp_uri);
      
      let message: any = {};
      if (args.issue) message.issue = args.issue;
      if (args.issue_id) message.issue_id = args.issue_id;

      const requestData = { context, message };
      
      if (name.startsWith('ondc_on_')) {
        // Simulate callback for issue APIs
        return {
          content: [{
            type: "text",
            text: `ONDC ${action.toUpperCase()} Callback Simulated:\n${JSON.stringify(requestData, null, 2)}`
          }]
        };
      } else {
        // Make actual API call for issue APIs
        const result = await apiClient.makeRequest(`/${action}`, 'POST', requestData, true);
        return {
          content: [{ type: "text", text: `ONDC ${action.toUpperCase()} Response:\n${JSON.stringify(result, null, 2)}` }]
        };
      }
    }

    throw new Error(`Unknown tool: ${name}`);

  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `Error executing ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`
      }],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ONDC Comprehensive MCP Server v2.1.0 running on stdio");
  console.error("Environment:", process.env.ONDC_ENVIRONMENT || 'staging');
  console.error("URLs configured:", ONDC_ENDPOINTS[process.env.ONDC_ENVIRONMENT || 'staging']);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
