// src/tools/bpp-tools.ts
// BPP (Buyer-side Platform Provider) MCP Tools Configuration

import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const bppTools: Tool[] = [
  {
    name: "ondc_bpp_catalog_create",
    description: "Create and manage product catalog as a BPP (Seller Platform)",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          enum: ["ONDC:RET10", "ONDC:RET11", "ONDC:RET12", "ONDC:RET13", "ONDC:RET14", "ONDC:RET15", "ONDC:TRV10", "ONDC:FIS12", "ONDC:LOG10"],
          description: "Domain for the catalog"
        },
        provider_info: {
          type: "object",
          properties: {
            id: { type: "string", description: "Unique provider/store ID" },
            name: { type: "string", description: "Store/Provider name" },
            description: { type: "string", description: "Store description" },
            logo_url: { type: "string", format: "uri", description: "Store logo URL" },
            locations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", description: "Location ID" },
                  gps: { type: "string", description: "GPS coordinates (lat,long)" },
                  address: {
                    type: "object",
                    properties: {
                      building: { type: "string" },
                      locality: { type: "string" },
                      city: { type: "string" },
                      state: { type: "string" },
                      area_code: { type: "string" }
                    },
                    required: ["locality", "city", "state", "area_code"]
                  },
                  circle: {
                    type: "object",
                    properties: {
                      gps: { type: "string", description: "Center GPS coordinates" },
                      radius: {
                        type: "object",
                        properties: {
                          unit: { type: "string", enum: ["km", "meter"], default: "km" },
                          value: { type: "number", description: "Delivery radius" }
                        }
                      }
                    }
                  }
                },
                required: ["id", "gps", "address"]
              },
              minItems: 1
            },
            categories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", description: "Category ID" },
                  name: { type: "string", description: "Category name" },
                  parent_category_id: { type: "string", description: "Parent category (optional)" }
                },
                required: ["id", "name"]
              }
            }
          },
          required: ["id", "name", "locations", "categories"]
        }
      },
      required: ["domain", "provider_info"]
    }
  },

  {
    name: "ondc_bpp_catalog_add_items",
    description: "Add products/items to the catalog",
    inputSchema: {
      type: "object",
      properties: {
        provider_id: { type: "string", description: "Provider/Store ID" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "Unique item ID" },
              name: { type: "string", description: "Product name" },
              description: { type: "string", description: "Product description" },
              category_id: { type: "string", description: "Category this item belongs to" },
              images: {
                type: "array",
                items: { type: "string", format: "uri" },
                description: "Product image URLs"
              },
              price: {
                type: "object",
                properties: {
                  currency: { type: "string", default: "INR" },
                  value: { type: "number", description: "Item price" },
                  maximum_value: { type: "number", description: "MRP/Maximum price" }
                },
                required: ["value"]
              },
              quantity: {
                type: "object",
                properties: {
                  available: {
                    type: "object",
                    properties: {
                      count: { type: "integer", minimum: 0, description: "Available stock" }
                    }
                  },
                  maximum: {
                    type: "object",
                    properties: {
                      count: { type: "integer", description: "Maximum order quantity" }
                    }
                  },
                  unitized: {
                    type: "object",
                    properties: {
                      measure: {
                        type: "object",
                        properties: {
                          unit: { type: "string", enum: ["kilogram", "gram", "litre", "millilitre", "piece", "meter"] },
                          value: { type: "number", description: "Unit value" }
                        }
                      }
                    }
                  }
                },
                required: ["available"]
              },
              fulfillment_ids: {
                type: "array",
                items: { type: "string" },
                description: "Fulfillment options for this item"
              },
              location_ids: {
                type: "array",
                items: { type: "string" },
                description: "Locations where this item is available"
              },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: { type: "string", description: "Tag code (e.g., 'origin', 'veg_nonveg')" },
                    value: { type: "string", description: "Tag value" }
                  }
                }
              }
            },
            required: ["id", "name", "category_id", "price", "quantity", "location_ids"]
          },
          minItems: 1
        }
      },
      required: ["provider_id", "items"]
    }
  },

  {
    name: "ondc_bpp_fulfillment_setup",
    description: "Setup fulfillment options (delivery, pickup, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        provider_id: { type: "string", description: "Provider/Store ID" },
        fulfillments: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "Fulfillment ID" },
              type: { 
                type: "string", 
                enum: ["Delivery", "Pickup", "Self-Pickup"],
                description: "Fulfillment type"
              },
              contact: {
                type: "object",
                properties: {
                  phone: { type: "string", pattern: "^[0-9]{10}$" },
                  email: { type: "string", format: "email" }
                }
              },
              start: {
                type: "object",
                properties: {
                  location: {
                    type: "object",
                    properties: {
                      id: { type: "string", description: "Store location ID" },
                      gps: { type: "string" },
                      address: { type: "string" }
                    }
                  },
                  time: {
                    type: "object",
                    properties: {
                      range: {
                        type: "object",
                        properties: {
                          start: { type: "string", format: "time", description: "Start time (HH:MM)" },
                          end: { type: "string", format: "time", description: "End time (HH:MM)" }
                        }
                      },
                      days: { type: "string", description: "Operating days (e.g., '1,2,3,4,5,6,7')" }
                    }
                  }
                }
              },
              rateable: { type: "boolean", default: true, description: "Whether fulfillment can be rated" },
              tracking: { type: "boolean", default: true, description: "Whether fulfillment provides tracking" }
            },
            required: ["id", "type"]
          },
          minItems: 1
        }
      },
      required: ["provider_id", "fulfillments"]
    }
  },

  {
    name: "ondc_bpp_inventory_update",
    description: "Update inventory levels for products",
    inputSchema: {
      type: "object",
      properties: {
        provider_id: { type: "string", description: "Provider/Store ID" },
        updates: {
          type: "array",
          items: {
            type: "object",
            properties: {
              item_id: { type: "string", description: "Item ID to update" },
              location_id: { type: "string", description: "Location ID" },
              quantity: {
                type: "object",
                properties: {
                  available: { type: "integer", minimum: 0, description: "New available count" },
                  sold: { type: "integer", minimum: 0, description: "Sold quantity (optional)" }
                },
                required: ["available"]
              },
              status: { 
                type: "string", 
                enum: ["ACTIVE", "INACTIVE", "OUT_OF_STOCK"],
                description: "Item status"
              }
            },
            required: ["item_id", "location_id", "quantity"]
          },
          minItems: 1
        }
      },
      required: ["provider_id", "updates"]
    }
  },

  {
    name: "ondc_bpp_on_search",
    description: "Respond to search requests from BAPs with catalog",
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "object",
          properties: {
            transaction_id: { type: "string", description: "Transaction ID from search request" },
            message_id: { type: "string", description: "Message ID from search request" },
            bap_id: { type: "string", description: "BAP ID that sent the search" },
            bap_uri: { type: "string", description: "BAP callback URI" }
          },
          required: ["transaction_id", "message_id", "bap_id", "bap_uri"]
        },
        search_intent: {
          type: "object",
          properties: {
            item_name: { type: "string", description: "Item being searched" },
            category: { type: "string", description: "Category filter" },
            location: {
              type: "object",
              properties: {
                gps: { type: "string" },
                area_code: { type: "string" }
              }
            }
          }
        },
        response_items: {
          type: "array",
          items: {
            type: "string",
            description: "Item IDs to include in response (empty array for all matching items)"
          }
        }
      },
      required: ["context"]
    }
  },

  {
    name: "ondc_bpp_on_select",
    description: "Respond to select requests with detailed quote",
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "object",
          properties: {
            transaction_id: { type: "string" },
            message_id: { type: "string" },
            bap_id: { type: "string" },
            bap_uri: { type: "string" }
          },
          required: ["transaction_id", "message_id", "bap_id", "bap_uri"]
        },
        selected_items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "Item ID" },
              quantity: { type: "integer", description: "Requested quantity" }
            },
            required: ["id", "quantity"]
          },
          minItems: 1
        },
        fulfillment_details: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["Delivery", "Pickup"] },
            location: {
              type: "object",
              properties: {
                gps: { type: "string", description: "Delivery/pickup location" },
                area_code: { type: "string" }
              }
            }
          }
        }
      },
      required: ["context", "selected_items"]
    }
  },

  {
    name: "ondc_bpp_on_init",
    description: "Respond to init requests with payment terms and final quote",
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "object",
          properties: {
            transaction_id: { type: "string" },
            message_id: { type: "string" },
            bap_id: { type: "string" },
            bap_uri: { type: "string" }
          },
          required: ["transaction_id", "message_id", "bap_id", "bap_uri"]
        },
        order_details: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  quantity: { type: "integer" }
                }
              }
            },
            billing: {
              type: "object",
              properties: {
                name: { type: "string" },
                phone: { type: "string" },
                email: { type: "string" },
                address: { type: "object" }
              }
            },
            fulfillment: {
              type: "object",
              properties: {
                type: { type: "string" },
                end: {
                  type: "object",
                  properties: {
                    location: { type: "object" },
                    contact: { type: "object" }
                  }
                }
              }
            }
          },
          required: ["items"]
        },
        payment_options: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["PRE-PAID", "COD"] },
              method: { type: "string", enum: ["UPI", "CARD", "NETBANKING", "WALLET", "COD"] }
            }
          }
        }
      },
      required: ["context", "order_details"]
    }
  },

  {
    name: "ondc_bpp_on_confirm",
    description: "Accept or reject order confirmation from BAP",
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "object",
          properties: {
            transaction_id: { type: "string" },
            message_id: { type: "string" },
            bap_id: { type: "string" },
            bap_uri: { type: "string" }
          },
          required: ["transaction_id", "message_id", "bap_id", "bap_uri"]
        },
        order_id: { type: "string", description: "Order ID to confirm" },
        action: { 
          type: "string", 
          enum: ["ACCEPT", "REJECT"],
          description: "Whether to accept or reject the order"
        },
        fulfillment_details: {
          type: "object",
          properties: {
            id: { type: "string", description: "Fulfillment ID" },
            start: {
              type: "object",
              properties: {
                time: {
                  type: "object",
                  properties: {
                    timestamp: { type: "string", format: "date-time", description: "Estimated preparation start time" }
                  }
                }
              }
            },
            end: {
              type: "object",
              properties: {
                time: {
                  type: "object",
                  properties: {
                    range: {
                      type: "object",
                      properties: {
                        start: { type: "string", format: "date-time", description: "Estimated delivery start" },
                        end: { type: "string", format: "date-time", description: "Estimated delivery end" }
                      }
                    }
                  }
                }
              }
            },
            tracking_info: {
              type: "object",
              properties: {
                url: { type: "string", format: "uri", description: "Tracking URL" },
                instructions: { type: "string", description: "Tracking instructions" }
              }
            }
          }
        },
        rejection_reason: {
          type: "object",
          properties: {
            code: { type: "string", description: "Rejection reason code" },
            description: { type: "string", description: "Detailed rejection reason" }
          }
        }
      },
      required: ["context", "order_id", "action"]
    }
  },

  {
    name: "ondc_bpp_order_update",
    description: "Update order status and tracking information",
    inputSchema: {
      type: "object",
      properties: {
        order_id: { type: "string", description: "Order ID to update" },
        bap_id: { type: "string", description: "BAP ID to notify" },
        bap_uri: { type: "string", description: "BAP callback URI" },
        status_update: {
          type: "object",
          properties: {
            state: { 
              type: "string",
              enum: ["Accepted", "In-progress", "Packed", "Order-picked-up", "Out-for-delivery", "Delivered", "Cancelled", "Returned"],
              description: "New order state"
            },
            tracking: {
              type: "object",
              properties: {
                id: { type: "string", description: "Tracking ID/AWB number" },
                url: { type: "string", format: "uri", description: "Live tracking URL" },
                location: {
                  type: "object",
                  properties: {
                    gps: { type: "string", description: "Current delivery agent location" },
                    description: { type: "string", description: "Current location description" }
                  }
                }
              }
            },
            fulfillment: {
              type: "object",
              properties: {
                agent: {
                  type: "object",
                  properties: {
                    name: { type: "string", description: "Delivery agent name" },
                    phone: { type: "string", description: "Delivery agent contact" }
                  }
                },
                vehicle: {
                  type: "object",
                  properties: {
                    category: { type: "string", enum: ["MOTORCYCLE", "AUTO_RICKSHAW", "CAB", "TRUCK"] },
                    capacity: { type: "integer" },
                    make: { type: "string" },
                    model: { type: "string" },
                    size: { type: "string" },
                    variant: { type: "string" },
                    color: { type: "string" },
                    energy_type: { type: "string" },
                    registration: { type: "string", description: "Vehicle registration number" }
                  }
                }
              }
            },
            estimated_delivery: { type: "string", format: "date-time", description: "Updated delivery estimate" }
          },
          required: ["state"]
        }
      },
      required: ["order_id", "bap_id", "bap_uri", "status_update"]
    }
  },

  {
    name: "ondc_bpp_analytics",
    description: "Get BPP analytics and performance metrics",
    inputSchema: {
      type: "object",
      properties: {
        provider_id: { type: "string", description: "Provider ID (optional, for all providers if not specified)" },
        date_range: {
          type: "object",
          properties: {
            start_date: { type: "string", format: "date", description: "Start date (YYYY-MM-DD)" },
            end_date: { type: "string", format: "date", description: "End date (YYYY-MM-DD)" }
          },
          required: ["start_date", "end_date"]
        },
        metrics: {
          type: "array",
          items: {
            type: "string",
            enum: ["orders", "revenue", "items_sold", "fulfillment_rate", "cancellation_rate", "average_rating", "inventory_turnover"]
          },
          description: "Metrics to retrieve"
        },
        group_by: {
          type: "string",
          enum: ["day", "week", "month", "category", "item", "location"],
          description: "How to group the results"
        }
      },
      required: ["date_range", "metrics"]
    }
  }
];
