# Security Policy

## Supported Versions

We actively support the following versions of the ONDC MCP Server:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Reporting a Vulnerability

The security of the ONDC MCP Server is important to us. If you discover a security vulnerability, please follow these guidelines:

### 🔒 Private Disclosure

**DO NOT** open a public GitHub issue for security vulnerabilities. Instead:

1. **Email us directly** at: [security@your-domain.com] (replace with actual email)
2. **Use encryption** if possible (PGP key available on request)
3. **Include detailed information** about the vulnerability

### 📝 What to Include

When reporting a security vulnerability, please include:

- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Potential impact** assessment
- **Affected versions**
- **Your contact information** for follow-up
- **Any suggested fixes** (optional)

### ⏱️ Response Timeline

We are committed to addressing security issues promptly:

- **Initial response**: Within 24 hours
- **Confirmation**: Within 48 hours
- **Progress updates**: Every 7 days
- **Resolution**: As soon as possible (typically within 30 days)

### 🏆 Recognition

We appreciate security researchers who help keep our users safe:

- **Public acknowledgment** (with your permission)
- **CVE assignment** for confirmed vulnerabilities
- **Credit in release notes** and security advisories

## Security Best Practices

### For Users

1. **Keep Updated**
   - Always use the latest version
   - Subscribe to security advisories
   - Monitor the changelog for security fixes

2. **Secure Configuration**
   - Use environment variables for sensitive data
   - Never commit private keys to version control
   - Use separate credentials for different environments

3. **Network Security**
   - Use HTTPS for all communications
   - Implement proper firewall rules
   - Monitor network traffic for anomalies

4. **Access Control**
   - Limit access to production systems
   - Use role-based access control
   - Regularly audit user permissions

### For Developers

1. **Code Security**
   - Validate all inputs
   - Use parameterized queries
   - Implement proper error handling
   - Follow secure coding standards

2. **Dependency Management**
   - Keep dependencies updated
   - Use tools like `npm audit`
   - Monitor for known vulnerabilities
   - Use dependency scanning in CI/CD

3. **Authentication & Authorization**
   - Implement proper signature validation
   - Use secure key storage
   - Follow ONDC authentication guidelines
   - Implement rate limiting

## Common Vulnerabilities

### Authentication Issues

- **Ed25519 signature validation** must be properly implemented
- **Key management** should follow best practices
- **Replay attacks** should be prevented with proper timestamps

### Input Validation

- **SQL injection** (if using databases)
- **XSS attacks** (if serving web content)
- **Command injection** (if executing system commands)
- **Path traversal** (if handling file operations)

### Configuration Security

- **Default credentials** should never be used
- **Debug modes** should be disabled in production
- **Error messages** should not leak sensitive information
- **Logs** should not contain sensitive data

## ONDC-Specific Security

### Network Participant Security

1. **Subscriber ID Validation**
   - Ensure proper FQDN validation
   - Verify SSL certificates
   - Implement domain verification

2. **Registry Security**
   - Validate registry responses
   - Implement proper caching
   - Handle registry downtime gracefully

3. **Transaction Security**
   - Verify transaction integrity
   - Implement idempotency
   - Handle payment security properly

### Beckn Protocol Security

1. **Message Integrity**
   - Validate all message formats
   - Implement proper schema validation
   - Handle malformed messages gracefully

2. **Context Validation**
   - Verify domain compatibility
   - Validate city/country codes
   - Check action permissions

## Compliance

This project aims to comply with:

- **ONDC Network Policies**
- **Beckn Protocol Security Guidelines**
- **Indian Data Protection Laws**
- **Industry Security Standards**

## Security Tools

We recommend using these tools for security testing:

1. **Static Analysis**
   - ESLint security plugins
   - SonarQube
   - CodeQL

2. **Dependency Scanning**
   - npm audit
   - Snyk
   - OWASP Dependency Check

3. **Dynamic Testing**
   - OWASP ZAP
   - Burp Suite
   - Custom security tests

## Incident Response

In case of a security incident:

1. **Immediate Response**
   - Assess the scope and impact
   - Implement temporary mitigations
   - Notify affected users if necessary

2. **Investigation**
   - Preserve evidence
   - Identify root cause
   - Document the timeline

3. **Resolution**
   - Implement permanent fixes
   - Test the resolution thoroughly
   - Update security measures

4. **Post-Incident**
   - Conduct post-mortem analysis
   - Update security procedures
   - Share lessons learned

## Contact Information

- **Security Team**: [security@your-domain.com]
- **General Issues**: [GitHub Issues](https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial/issues)
- **General Questions**: [GitHub Discussions](https://github.com/chinmaybhatk/ONDC-MCP-Server-Unofficial/discussions)

## Disclaimer

This is an unofficial implementation of ONDC APIs. Users are responsible for ensuring compliance with ONDC security requirements and applicable regulations in their production deployments.

---

**Last Updated**: June 13, 2025
**Next Review**: December 13, 2025