# Playwright Page Object Model Example

This project demonstrates a comprehensive implementation of the **Page Object Model (POM)** pattern using Playwright with TypeScript. It showcases best practices for test automation architecture, including page objects, components, elements, data generation, and utilities.

## 🏗️ Architecture Overview

The project follows a well-structured, scalable architecture that separates concerns and promotes code reusability:

```
tests/
├── page-objects/
│   ├── base/           # Abstract base classes
│   ├── components/     # Reusable UI components
│   └── pages/          # Page objects
├── data/               # Test data generators
├── utils/              # Helper utilities
└── *.spec.ts          # Test files
```

## 📋 Features

### ✅ Page Object Model Implementation

- **Abstract base classes** for pages and elements
- **Typed element classes** (Button, Link, Input, Checkbox, Label, Counter, List)
- **Component-based architecture** for reusable UI elements
- **Encapsulated locators** and business logic

### ✅ Test Data Management

- **Dynamic data generation** instead of static test data
- **Data generators** for creating test scenarios
- **Type-safe data structures**

### ✅ Utilities and Helpers

- **LocalStorage utilities** for persistence testing
- **Test helpers** for common operations
- **Reusable functions** across test suites

### ✅ Best Practices

- **DRY principle** - no code duplication
- **Single Responsibility** - each class has one purpose
- **TypeScript** for type safety and better IDE support
- **English documentation** for international teams
- **Clean architecture** with proper inheritance

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/demo-todo-app-refactored.spec.ts

# Run with UI mode
npx playwright test --ui

# Run in headed mode
npx playwright test --headed
```

## 🏛️ Architecture Details

### Base Classes

#### `BaseElement`

Abstract base class for all UI elements providing common functionality:

- Element visibility checks
- Text content retrieval
- Attribute access
- CSS class validation
- Click, hover, and wait operations

#### `BasePage`

Abstract base class for all pages providing:

- Navigation methods
- Page state management
- Locator creation helpers
- Screenshot capabilities
- JavaScript execution

### Typed Element Classes

#### `BaseButton`

Specialized class for button elements:

- Click operations
- Enabled/disabled state checks
- Attribute access

#### `BaseLink`

Specialized class for link elements:

- URL retrieval
- Active/inactive state checks
- Navigation operations

#### `BaseInput`

Specialized class for input fields:

- Text input and clearing
- Value retrieval
- Focus management
- Placeholder access

#### `BaseCheckbox`

Specialized class for checkbox elements:

- Check/uncheck operations
- State toggling
- Checked state validation

#### `BaseLabel`

Specialized class for label elements:

- Text content access
- Form element association
- Attribute management

#### `BaseCounter`

Specialized class for counter elements:

- Numeric value extraction
- Text content validation
- Empty state checks

#### `BaseList`

Specialized class for list elements:

- Item counting
- Index-based access
- Empty state validation

### Component Classes

#### `TodoItem`

Represents individual todo items with methods for:

- Text editing and retrieval
- Completion state management
- Deletion operations
- Visibility checks

#### `TodoList`

Manages collections of todo items:

- Item enumeration
- Bulk operations
- Filtering capabilities
- State management

#### `TodoFilter`

Handles todo filtering functionality:

- Filter switching
- Active state management
- Navigation operations

### Page Classes

#### `TodoPage`

Main application page object providing:

- Todo creation and management
- Navigation and filtering
- State validation
- Component access

## 📊 Test Data Generation

The project includes dynamic data generation to replace static test data:

```typescript
// Generate random todo items
const todoItems = generateTodoItems(3);

// Generate user data
const userData = generateUserData();

// Generate test scenarios
const testScenarios = generateTestScenarios();
```

## 🛠️ Utilities

### LocalStorage Utilities

- Persistence testing
- Data validation
- State management

### Test Helpers

- Common operations
- Reusable functions
- Test setup/teardown

## 🔧 Configuration

### Global Setup/Teardown

- **Global Setup**: Runs before all tests for initialization
- **Global Teardown**: Runs after all tests for cleanup

### Multi-Browser Support

- Chromium (default)
- Firefox
- WebKit (Safari)

### Environment Configuration

- Base URL configuration
- Retry strategies
- Worker management
- Reporter configuration

## 📈 Best Practices Demonstrated

1. **Separation of Concerns**: Each class has a single responsibility
2. **Inheritance**: Proper use of abstract base classes
3. **Composition**: Components are composed of smaller elements
4. **Type Safety**: Full TypeScript implementation
5. **Code Reusability**: Shared utilities and base classes
6. **Maintainability**: Clean, documented, and organized code
7. **Testability**: Isolated, focused test cases
8. **Scalability**: Architecture supports growth and changes

## 🧪 Test Coverage

The project includes comprehensive test coverage for:

- Todo item creation and management
- Editing and deletion operations
- Filtering and navigation
- Persistence and state management
- Cross-browser compatibility

## 📝 Contributing

When contributing to this project:

1. Follow the established architecture patterns
2. Add proper TypeScript types
3. Include English documentation
4. Write comprehensive tests
5. Follow the DRY principle
6. Maintain clean, readable code

## 📄 License

This project is for educational and demonstration purposes.

---

**Note**: This project serves as a reference implementation for Page Object Model patterns in Playwright with TypeScript, demonstrating industry best practices for test automation architecture.
