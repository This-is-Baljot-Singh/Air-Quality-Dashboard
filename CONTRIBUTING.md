# Contributing to Air Quality Dashboard 🤝

Thank you for your interest in contributing to the Air Quality Dashboard! This document provides guidelines and information for contributors.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## 🤝 Code of Conduct

### Our Standards
- **Be respectful** and inclusive to all contributors
- **Be constructive** in feedback and discussions
- **Focus on the project** and technical merit
- **Help newcomers** learn and contribute

### Unacceptable Behavior
- Harassment, discrimination, or offensive language
- Personal attacks or trolling
- Publishing private information without permission
- Other conduct that could be considered inappropriate

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager
- Git for version control
- Basic knowledge of React, JavaScript, and CSS

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Air-Quality-Dashboard.git
   cd Air-Quality-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🔄 Development Workflow

### Branch Naming Convention
- `feature/feature-name` - New features
- `bugfix/issue-description` - Bug fixes
- `docs/documentation-update` - Documentation updates
- `refactor/component-name` - Code refactoring
- `style/styling-update` - UI/styling changes

### Commit Message Format
```
type(scope): brief description

Detailed explanation if needed

- List any breaking changes
- Reference issues: Fixes #123
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```bash
feat(charts): add real-time data updates
fix(filters): resolve state persistence issue
docs(readme): update installation instructions
```

## 🎨 Coding Standards

### JavaScript/React Guidelines
- **Use functional components** with hooks
- **Follow React best practices** (proper state management, effect cleanup)
- **Use meaningful variable names** and add comments for complex logic
- **Keep components small** and focused on single responsibility
- **Use TypeScript** for better type safety (if applicable)

### Code Style
- **Use Prettier** for code formatting
- **Follow ESLint** configuration
- **Use 2 spaces** for indentation
- **Use semicolons** consistently
- **Use single quotes** for strings

### File Organization
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── Layout.jsx    # Layout components
├── contexts/         # React Context providers
├── data/            # Data files and processing
├── pages/           # Page components
├── lib/             # Utility functions
└── styles/          # CSS/styling files
```

### CSS/Styling Guidelines
- **Use Tailwind CSS** classes when possible
- **Follow mobile-first** responsive design
- **Use semantic class names** for custom CSS
- **Maintain consistent spacing** using Tailwind's spacing scale

## 📝 Submitting Changes

### Pull Request Process

1. **Ensure your code follows** the coding standards
2. **Update documentation** if needed
3. **Add tests** for new features
4. **Run the test suite** to ensure nothing breaks
5. **Update the CHANGELOG.md** if applicable

### Pull Request Template
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (specify)

## Testing
- [ ] Tested manually
- [ ] Added unit tests
- [ ] All tests pass

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Fixes #issue_number
```

### Review Process
1. **Automated checks** must pass (linting, building)
2. **Code review** by project maintainers
3. **Address feedback** and make necessary changes
4. **Final approval** and merge

## 🐛 Reporting Issues

### Before Reporting
- **Search existing issues** to avoid duplicates
- **Check the latest version** to see if the issue is already fixed
- **Reproduce the issue** with minimal steps

### Issue Template
```markdown
## Bug Description
Clear description of the issue

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 96, Firefox 94]
- Node.js version: [e.g., 16.14.0]

## Screenshots
Add screenshots if applicable
```

## 💡 Feature Requests

### Suggesting Features
- **Use the feature request template** on GitHub
- **Explain the use case** and why it's valuable
- **Provide mockups** or examples if possible
- **Consider implementation complexity** and project scope

### Feature Request Template
```markdown
## Feature Summary
Brief description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Any other relevant information
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- **Test user interactions** and component behavior
- **Mock external dependencies** (APIs, data sources)
- **Use descriptive test names** that explain what's being tested
- **Follow AAA pattern** (Arrange, Act, Assert)

## 📚 Resources

### Learning Resources
- [React Documentation](https://reactjs.org/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### Project-Specific Resources
- [Data Documentation](./DATA.md) - Understanding the data structure
- [Installation Guide](./INSTALLATION.md) - Detailed setup instructions
- [Architecture Overview](./docs/ARCHITECTURE.md) - Project structure and design decisions

## 🎉 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **CHANGELOG.md** for significant contributions
- **GitHub contributors** graph
- **Release notes** for major features

## 📞 Getting Help

- **GitHub Issues** - Technical questions and bugs
- **GitHub Discussions** - General questions and ideas
- **Code Review** - Ask questions in pull request comments

---

Thank you for contributing to the Air Quality Dashboard! Your efforts help make air quality data more accessible and understandable for everyone. 🌍✨
