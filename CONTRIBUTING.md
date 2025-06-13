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
2. **Provide clear use cases** and business justification
3. **Consider ONDC protocol compatibility**
4. **Include mockups or examples** when applicable

### Code Contributions

#### Prerequisites

- Node.js 18+
- TypeScript 5.0+
- Git
- Basic understanding of ONDC/Beckn protocol
- Familiarity with Model Context Protocol (MCP)

#### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ONDC-MCP-Server-Unofficial.git
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

#### Code Style Guidelines

- **TypeScript**: Use strict TypeScript with proper type definitions
- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Use Prettier for code formatting
- **Naming**: Use descriptive variable and function names
- **Comments**: Add JSDoc comments for public APIs

#### Testing

- **Write tests** for new features and bug fixes
- **Ensure all tests pass** before submitting PR
- **Test with different ONDC environments** (staging/preprod)
- **Validate API responses** match ONDC specifications

#### Pull Request Process

1. **Update documentation** if needed
2. **Add/update tests** for your changes
3. **Ensure code builds** without errors
4. **Run linting and formatting**
   ```bash
   npm run lint
   npm run format
   ```
5. **Create descriptive PR title and description**
6. **Reference related issues** using keywords (fixes #123)

## 📝 Development Guidelines

### API Implementation

- **Follow ONDC/Beckn specifications** exactly
- **Handle all error cases** gracefully
- **Validate input parameters** thoroughly
- **Use proper HTTP status codes**
- **Include comprehensive error messages**

### Security Considerations

- **Never commit private keys** or sensitive data
- **Validate all user inputs**
- **Follow authentication best practices**
- **Use environment variables** for configuration

### Code Organization

```
src/
├── index.ts              # Main MCP server
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── apis/                # API handlers
│   ├── registry/        # Registry APIs
│   ├── transaction/     # Transaction APIs
│   ├── callback/        # Callback APIs
│   └── issue/          # Issue management APIs
├── auth/               # Authentication utilities
└── validation/         # Input validation schemas
```

### Adding New APIs

1. **Research ONDC specifications** for the new API
2. **Define TypeScript interfaces** for request/response
3. **Create input validation schema**
4. **Implement API handler**
5. **Add comprehensive tests**
6. **Update documentation**

Example structure for new API:

```typescript
// Define the tool schema
const newAPITool: Tool = {
  name: "ondc_new_api",
  description: "Description of the new API",
  inputSchema: {
    type: "object",
    properties: {
      // Define parameters
    },
    required: ["param1", "param2"]
  }
};

// Add handler in the switch statement
case "ondc_new_api": {
  // Implementation
  break;
}
```

## 📋 Project Standards

### Commit Messages

Use conventional commit format:
```
type(scope): description

feat(api): add support for mobility domain
fix(auth): resolve signature validation issue
docs(readme): update installation instructions
test(transaction): add tests for cancel API
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Documentation

- **Update README.md** for user-facing changes
- **Add JSDoc comments** for new functions
- **Include API examples** in documentation
- **Document configuration changes**

## 🔍 Review Process

### Code Review Checklist

- [ ] Code follows project style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities introduced
- [ ] ONDC protocol compliance maintained
- [ ] Performance impact considered
- [ ] Error handling is comprehensive

### Maintainer Guidelines

- **Review within 48 hours** when possible
- **Provide constructive feedback**
- **Test changes thoroughly**
- **Ensure backward compatibility**
- **Update changelog** for releases

## 🚀 Release Process

1. **Update version** in package.json
2. **Update CHANGELOG.md**
3. **Create release branch**
4. **Run full test suite**
5. **Create GitHub release**
6. **Publish to npm** (if applicable)

## 📚 Resources

### ONDC Documentation
- [ONDC Developer Docs](https://github.com/ONDC-Official/developer-docs)
- [Beckn Protocol Specs](https://developers.becknprotocol.io/)
- [ONDC Protocol Specs](https://github.com/ONDC-Official/ONDC-Protocol-Specs)

### MCP Resources
- [MCP Documentation](https://modelcontextprotocol.io)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

### Development Tools
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

## 🏆 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **CHANGELOG.md** for significant contributions
- **GitHub releases** for major features

## ❓ Questions?

- **GitHub Discussions**: For general questions
- **GitHub Issues**: For bug reports and feature requests
- **Email**: For security-related concerns

Thank you for contributing to the ONDC ecosystem! 🙏