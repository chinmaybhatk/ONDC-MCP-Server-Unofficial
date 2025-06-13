// src/tools/bap-tools.ts
// BAP (Buyer Application Platform) MCP Tools Configuration

import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const bapTools: Tool[] = [
  {
    name: "ondc_bap_search",
    description: "Search for products/services on ONDC network as a BAP (Buyer Application Platform)",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          enum: ["ONDC:RET10", "ONDC:RET11", "ONDC:RET12", "ONDC:RET13", "ONDC:RET14", "ONDC:RET15", "ONDC:TRV10", "ONDC:FIS12", "ONDC:LOG10"],
          description: "Domain for the search (e.g., RET10 for grocery, RET11 for food)"
        },
        search_query: {
          type: "string",
          description: "What to search for (e.g., 'organic vegetables', 'smartphones under 20000')"
        },
        location: {
          type: "object",
          properties: {
            city: { type: "string", description: "City name (e.g., 'Bangalore', 'Mumbai')" },
            area_code: { type: "string", description: "Area/PIN code (e.g., '560001')" },
            gps: { type: "string", description: "GPS coordinates (lat,long)" }
          },
          required: ["city"]
        },
        filters: {
          type: "object",
          properties: {
            category_id: { type: "string", description: "Specific category to filter" },
            provider_name: { type: "string", description: "Specific store/provider to search in" },
            price_range: {
              type: "object",
              properties: {
                min: { type: "number" },
                max: { type: "number" }
              }
            },
            rating_above: { type: "number", minimum: 0, maximum: 5 },
            delivery_type: { 
              type: "string", 
              enum: ["Delivery", "Pickup", "Self-Pickup"],
              description: "Preferred fulfillment type"
            }
          }
        }
      },
      required: ["domain", "search_query", "location"]
    }
  },

  {
    name: "ondc_bap_select",
    description: "Select specific items from search results and get detailed quote",
    inputSchema: {
      type: "object",
      properties: {
        provider_id: {
          type: "string",
          description: "ID of the provider/store from search results"
        },
        bpp_id: {
          type: "string", 
          description: "BPP platform ID from search results"
        },
        bpp_uri: {
          type: "string",
          description: "BPP callback URI from search results"
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "Item ID from catalog" },
              quantity: { type: "integer", minimum: 1, description: "Quantity to select" },
              customization: {
                type: "object",
                properties: {
                  size: { type: "string" },
                  color: { type: "string" },
                  variant: { type: "string" }
                }
              }
            },
            required: ["id", "quantity"]
          },
          minItems: 1
        },
        delivery_location: {
          type: "object",
          properties: {
            gps: { type: "string", description: "Delivery GPS coordinates" },
            address: { type: "string", description: "Delivery address" },
            area_code: { type: "string", description: "Delivery area/PIN code" }
          },
          required: ["area_code"]
        }
      },
      required: ["provider_id", "bpp_id", "bpp_uri", "items", "delivery_location"]
    }
  },

  {
    name: "ondc_bap_init",
    description: "Initialize order with billing and shipping information",
    inputSchema: {
      type: "object",
      properties: {
        provider_id: { type: "string" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              quantity: { type: "integer", minimum: 1 }
            },
            required: ["id", "quantity"]
          }
        },
        billing_info: {
          type: "object",
          properties: {
            name: { type: "string", description: "Billing name" },
            phone: { type: "string", pattern: "^[0-9]{10}$", description: "10-digit phone number" },
            email: { type: "string", format: "email" },
            address: {
              type: "object",
              properties: {
                building: { type: "string", description: "Building/House number" },
                locality: { type: "string", description: "Area/Locality" },
                city: { type: "string" },
                state: { type: "string" },
                area_code: { type: "string", description: "PIN code" }
              },
              required: ["building", "locality", "city", "state", "area_code"]
            }
          },
          required: ["name", "phone", "email", "address"]
        },
        delivery_info: {
          type: "object",
          properties: {
            name: { type: "string", description: "Delivery contact name" },
            phone: { type: "string", pattern: "^[0-9]{10}$" },
            address: {
              type: "object",
              properties: {
                building: { type: "string" },
                locality: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                area_code: { type: "string" },
                gps: { type: "string", description: "GPS coordinates if available" }
              },
              required: ["building", "locality", "city", "state", "area_code"]
            },
            instructions: { type: "string", description: "Special delivery instructions" }
          },
          required: ["name", "phone", "address"]
        }
      },
      required: ["provider_id", "bpp_id", "bpp_uri", "items", "billing_info", "delivery_info"]
    }
  },

  {
    name: "ondc_bap_confirm",
    description: "Confirm and place the order with payment method",
    inputSchema: {
      type: "object",
      properties: {
        order_id: { type: "string", description: "Order ID from init response" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        payment: {
          type: "object",
          properties: {
            type: { 
              type: "string", 
              enum: ["PRE-PAID", "COD", "CREDIT"],
              description: "Payment type"
            },
            method: {
              type: "string",
              enum: ["UPI", "CARD", "NETBANKING", "WALLET", "COD"],
              description: "Payment method"
            },
            amount: { type: "number", description: "Total amount to pay" },
            transaction_id: { type: "string", description: "Payment transaction ID (for prepaid)" }
          },
          required: ["type", "method", "amount"]
        },
        confirm_details: {
          type: "object",
          properties: {
            customer_consent: { type: "boolean", default: true, description: "Customer consent for order" },
            terms_accepted: { type: "boolean", default: true, description: "Terms and conditions accepted" }
          }
        }
      },
      required: ["order_id", "bpp_id", "bpp_uri", "payment"]
    }
  },

  {
    name: "ondc_bap_status",
    description: "Check status of an existing order",
    inputSchema: {
      type: "object",
      properties: {
        order_id: { type: "string", description: "Order ID to check status" },
        bpp_id: { type: "string", description: "BPP ID from order" },
        bpp_uri: { type: "string", description: "BPP URI from order" }
      },
      required: ["order_id", "bpp_id", "bpp_uri"]
    }
  },

  {
    name: "ondc_bap_track",
    description: "Track order delivery and fulfillment details",
    inputSchema: {
      type: "object",
      properties: {
        order_id: { type: "string", description: "Order ID to track" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" }
      },
      required: ["order_id", "bpp_id", "bpp_uri"]
    }
  },

  {
    name: "ondc_bap_cancel",
    description: "Cancel an existing order",
    inputSchema: {
      type: "object",
      properties: {
        order_id: { type: "string", description: "Order ID to cancel" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        cancellation: {
          type: "object",
          properties: {
            reason_id: { 
              type: "string",
              enum: ["001", "002", "003", "004", "005"],
              description: "Cancellation reason code (001: Price change, 002: Product unavailable, 003: Customer request, 004: Payment issue, 005: Other)"
            },
            description: { type: "string", description: "Detailed cancellation reason" }
          },
          required: ["reason_id"]
        }
      },
      required: ["order_id", "bpp_id", "bpp_uri", "cancellation"]
    }
  },

  {
    name: "ondc_bap_update",
    description: "Update order details (items, quantity, delivery address)",
    inputSchema: {
      type: "object",
      properties: {
        order_id: { type: "string", description: "Order ID to update" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        update_target: {
          type: "string",
          enum: ["items", "fulfillment", "billing"],
          description: "What aspect of order to update"
        },
        updates: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  quantity: { type: "integer", minimum: 0, description: "New quantity (0 to remove)" }
                }
              }
            },
            delivery_address: {
              type: "object",
              properties: {
                building: { type: "string" },
                locality: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                area_code: { type: "string" },
                gps: { type: "string" }
              }
            }
          }
        }
      },
      required: ["order_id", "bpp_id", "bpp_uri", "update_target", "updates"]
    }
  },

  {
    name: "ondc_bap_rating",
    description: "Rate and review a completed order",
    inputSchema: {
      type: "object",
      properties: {
        order_id: { type: "string", description: "Completed order ID" },
        bpp_id: { type: "string" },
        bpp_uri: { type: "string" },
        rating: {
          type: "object",
          properties: {
            rating_category: {
              type: "string",
              enum: ["Order", "Item", "Fulfillment", "Provider"],
              description: "What to rate"
            },
            id: { type: "string", description: "ID of item/provider being rated" },
            value: { type: "integer", minimum: 1, maximum: 5, description: "Rating (1-5 stars)" },
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
          required: ["rating_category", "id", "value"]
        }
      },
      required: ["order_id", "bpp_id", "bpp_uri", "rating"]
    }
  },

  {
    name: "ondc_bap_support",
    description: "Get support information or raise customer service request",
    inputSchema: {
      type: "object",
      properties: {
        order_id: { type: "string", description: "Order ID for support (optional)" },
        bpp_id: { type: "string", description: "BPP ID for support query" },
        bpp_uri: { type: "string" },
        support_type: {
          type: "string",
          enum: ["order_issue", "payment_issue", "delivery_issue", "product_issue", "general_inquiry"],
          description: "Type of support needed"
        },
        ref_id: { type: "string", description: "Reference ID for the support request" }
      },
      required: ["bpp_id", "bpp_uri", "support_type"]
    }
  }
];
