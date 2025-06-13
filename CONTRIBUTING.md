# Contributing to ONDC MCP Server

Thank you for your interest in contributing to the ONDC MCP Server! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

1. **Search existing issues** first to avoid duplicates
2. **Use issue templates** when available
3. **Provide detailed information** including:
   - Environment details (Node.js version, OS, etc.)
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - Error messages and logs
   - ONDC environment (staging/preprod/prod)

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Provide clear use cases** and justification
3. **Consider ONDC protocol compliance** and official specifications
4. **Discuss implementation approach** if you have ideas

### Code Contributions

#### Prerequisites

- Node.js 18+
- Git knowledge
- TypeScript familiarity
- Understanding of ONDC/Beckn protocol basics

#### Development Setup

1. **Fork the repository**
```bash
git clone https://github.com/your-username/ONDC-MCP-Server-Unofficial.git
cd ONDC-MCP-Server-Unofficial
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Start development**
```bash
npm run dev
```

#### Code Standards

1. **TypeScript**: All code must be written in TypeScript
2. **ESLint**: Follow the configured ESLint rules
3. **Prettier**: Code must be formatted with Prettier
4. **Comments**: Add JSDoc comments for public APIs
5. **Error Handling**: Implement comprehensive error handling

#### API Guidelines

1. **ONDC Compliance**: All APIs must follow ONDC/Beckn protocol specifications
2. **Schema Validation**: Validate all input parameters
3. **Error Messages**: Provide clear, actionable error messages
4. **Authentication**: Implement proper Ed25519 signature authentication
5. **Testing**: Add tests for new APIs (when test framework is available)

#### Pull Request Process

1. **Update Documentation**: Update README.md if needed
2. **Test Your Changes**: Ensure all functionality works
3. **Run Linting**: `npm run lint`
4. **Format Code**: `npm run format`
5. **Commit Convention**: Use conventional commits
   ```
   feat: add new ONDC API endpoint
   fix: resolve authentication issue
   docs: update API documentation
   chore: update dependencies
   ```

6. **Create Pull Request**:
   - Use a descriptive title
   - Explain the changes and motivation
   - Reference any related issues
   - Include testing instructions

## 🧪 Testing Guidelines

### Manual Testing
- Test with ONDC staging environment
- Verify all API endpoints work correctly
- Test error scenarios
- Validate authentication flows

### Integration Testing
- Test with Claude Desktop
- Verify MCP protocol compliance
- Test multi-API workflows

## 📋 API Implementation Checklist

When adding new ONDC APIs:

- [ ] Follow ONDC protocol specifications exactly
- [ ] Add proper TypeScript types
- [ ] Implement input validation
- [ ] Add comprehensive error handling
- [ ] Include JSDoc documentation
- [ ] Update the tools array
- [ ] Add usage examples to README
- [ ] Test with staging environment

## 🔒 Security Guidelines

1. **Never commit credentials** or private keys
2. **Use environment variables** for sensitive configuration
3. **Validate all inputs** to prevent injection attacks
4. **Follow ONDC security requirements** for signatures
5. **Review dependencies** for security vulnerabilities

## 📚 Resources for Contributors

### ONDC Documentation
- [ONDC Developer Docs](https://github.com/ONDC-Official/developer-docs)
- [Protocol Specifications](https://github.com/ONDC-Official/ONDC-Protocol-Specs)
- [Registry Onboarding Guide](https://github.com/ONDC-Official/developer-docs/blob/main/registry/Onboarding%20of%20Participants.md)

### Beckn Protocol
- [Beckn Core Specification](https://developers.becknprotocol.io/)
- [API Reference](https://developers.becknprotocol.io/docs/core-specification/core-apis/)

### MCP Documentation
- [MCP Protocol](https://modelcontextprotocol.io)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## 🏗️ Architecture Guidelines

### Code Organization
```
src/
├── index.ts              # Main server file
├── types/               # TypeScript type definitions
│   ├── ondc.ts         # ONDC-specific types
│   └── mcp.ts          # MCP-specific types
├── handlers/           # API request handlers
│   ├── registry.ts     # Registry API handlers
│   ├── transaction.ts  # Transaction API handlers
│   └── callback.ts     # Callback API handlers
├── utils/              # Utility functions
│   ├── auth.ts        # Authentication utilities
│   ├── validation.ts  # Input validation
│   └── crypto.ts      # Cryptographic functions
└── config/            # Configuration files
    └── endpoints.ts   # ONDC endpoint configurations
```

### API Handler Pattern
```typescript
async function handleONDCAPI(
  action: string,
  args: any,
  apiClient: ONDCAPIClient
): Promise<MCPResponse> {
  try {
    // 1. Validate inputs
    validateInput(args, schema);
    
    // 2. Create context
    const context = createContext(action, args);
    
    // 3. Build message
    const message = buildMessage(action, args);
    
    // 4. Make API call
    const result = await apiClient.makeRequest(
      `/${action}`, 
      'POST', 
      { context, message }
    );
    
    // 5. Return formatted response
    return formatResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
```

## 🐛 Debugging

### Common Issues
1. **Authentication Failures**: Check key generation and signing
2. **Network Errors**: Verify ONDC environment endpoints
3. **Schema Validation**: Ensure request matches ONDC specs
4. **MCP Integration**: Check Claude Desktop configuration

### Debug Tools
- Use `console.error()` for server-side debugging
- Enable verbose logging in development
- Test individual APIs with curl/Postman
- Use ONDC registry lookup to verify configurations

## 🎯 Priority Contributions

We especially welcome contributions in these areas:

1. **Enhanced Authentication**: Better Ed25519 signature implementation
2. **Schema Validation**: Comprehensive input validation
3. **Error Handling**: More detailed error responses
4. **Documentation**: API usage examples and tutorials
5. **Testing**: Unit and integration tests
6. **Domain Support**: Additional ONDC domain implementations
7. **Performance**: Optimization for high-volume usage

## 🏆 Recognition

Contributors will be recognized in:
- README.md acknowledgments
- Release notes
- GitHub contributors graph
- Project documentation

## 📞 Getting Help

- **GitHub Discussions**: For questions and brainstorming
- **GitHub Issues**: For bug reports and feature requests
- **ONDC Community**: For protocol-specific questions

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make ONDC more accessible through this MCP server! 🚀