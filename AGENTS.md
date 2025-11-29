# AI Agent Instructions

This document provides guidelines and instructions for AI agents working with this codebase.

## Review Guidelines

When conducting code reviews, AI agents should systematically evaluate the following aspects:

### Code Standards and Conventions
- Do the changes follow the established conventions and patterns used throughout the codebase?
- Is the code style consistent with existing code (indentation, naming conventions, file organization)?
- Are the appropriate design patterns being used where applicable?
- Does the code follow the project's established architecture and structure?

### Security Assessment
- Do the changes introduce any security vulnerabilities or risks?
- Are user inputs properly validated and sanitized?
- Is sensitive data properly handled and protected?
- Are authentication and authorization checks properly implemented?
- Are there any exposed API keys, credentials, or sensitive configuration data?
- Are network requests using appropriate security protocols (HTTPS, proper headers)?

### Performance Considerations
- Do the changes introduce potential performance bottlenecks?
- Are there any inefficient algorithms or data structures being used?
- Is there unnecessary re-rendering or state updates in React components?
- Are large lists properly virtualized where appropriate?
- Is lazy loading implemented for heavy resources?
- Are bundle sizes kept reasonable (no unnecessary dependencies)?
- Are database queries optimized and avoiding N+1 problems?
- Is proper caching implemented where beneficial?

### Platform-Specific Best Practices

#### React Native
- Are components properly optimized using React.memo, useMemo, and useCallback where appropriate?
- Is the bridge communication between native and JavaScript minimized?
- Are platform-specific code paths properly handled?
- Are native modules properly linked and configured?
- Is proper error boundary implementation in place?

#### Kotlin (Android)
- Does the code follow Kotlin idioms and best practices?
- Are coroutines used properly for asynchronous operations?
- Is proper null safety maintained throughout?
- Are Android lifecycle methods properly handled?
- Is memory management appropriate (avoiding leaks)?

#### Swift (iOS)
- Does the code follow Swift conventions and best practices?
- Is proper memory management used (weak/unowned references where appropriate)?
- Are optionals handled safely?
- Is the code taking advantage of Swift's type safety?
- Are iOS-specific considerations handled (app states, background tasks)?

### Functional Verification
- Does the code actually implement what the PR description claims?
- Are all acceptance criteria from the related issue/ticket met?
- Are edge cases properly handled?
- Is error handling comprehensive and user-friendly?
- Are all promised features fully implemented and working?

### Testing and Documentation
- Are appropriate tests included for new functionality?
- Do existing tests still pass?
- Is the code self-documenting with clear variable and function names?
- Are complex logic sections properly commented?
- Are API changes documented?
- Are breaking changes clearly identified?

### Dependencies and Compatibility
- Are new dependencies necessary and well-maintained?
- Are version requirements appropriate?
- Is backward compatibility maintained where expected?
- Are deprecated APIs avoided?
- Are platform version requirements respected?

### Accessibility
- Are accessibility features properly implemented (screen readers, keyboard navigation)?
- Are appropriate accessibility labels and hints provided?
- Do UI changes maintain or improve accessibility?

### User Experience
- Do the changes provide a smooth and intuitive user experience?
- Are loading states and error messages user-friendly?
- Is feedback provided for user actions?
- Are animations and transitions smooth and purposeful?