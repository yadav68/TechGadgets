# Contributing to TechGadgets

First off, thank you for considering contributing to TechGadgets! It's people like you that make TechGadgets such a great project.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for TechGadgets. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

**Before Submitting A Bug Report:**

- Check the debugging guide
- Check the FAQs on the forum for a list of common questions and problems
- Determine which repository the problem should be reported in
- Perform a cursory search to see if the problem has already been reported

**How Do I Submit A (Good) Bug Report?**

Bugs are tracked as GitHub issues. Create an issue and provide the following information:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs** if possible

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for TechGadgets, including completely new features and minor improvements to existing functionality.

**Before Submitting An Enhancement Suggestion:**

- Check if there's already a package which provides that enhancement
- Determine which repository the enhancement should be suggested in
- Perform a cursory search to see if the enhancement has already been suggested

**How Do I Submit A (Good) Enhancement Suggestion?**

Enhancement suggestions are tracked as GitHub issues. Create an issue and provide the following information:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior** and **explain which behavior you expected to see instead**
- **Include screenshots and animated GIFs** if applicable
- **Explain why this enhancement would be useful**

### Your First Code Contribution

Unsure where to begin contributing to TechGadgets? You can start by looking through these `beginner` and `help-wanted` issues:

- **Beginner issues** - issues which should only require a few lines of code, and a test or two
- **Help wanted issues** - issues which should be a bit more involved than `beginner` issues

### Pull Requests

The process described here has several goals:

- Maintain TechGadgets' quality
- Fix problems that are important to users
- Engage the community in working toward the best possible TechGadgets
- Enable a sustainable system for TechGadgets' maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. **Fork the repository** and create your branch from `main`
2. **Follow the styleguides**
3. **Make sure your code follows the existing patterns**
4. **Add tests** if you're adding functionality
5. **Ensure the test suite passes**
6. **Make sure your code lints**
7. **Issue that pull request!**

## Development Setup

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- MongoDB (local or Atlas)
- Git

### Setup Steps

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/your-username/TechGadgets.git
   cd TechGadgets
   ```

2. **Install dependencies:**

   ```bash
   npm install
   cd backend && npm install
   cd ../client && npm install
   cd ..
   ```

3. **Set up environment variables:**

   - Copy `.env.example` files to `.env` in both `backend/` and `client/` directories
   - Fill in the required environment variables

4. **Start the development servers:**
   ```bash
   npm run dev
   ```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🐎 `:racehorse:` when improving performance
  - 🚱 `:non-potable_water:` when plugging memory leaks
  - 📝 `:memo:` when writing docs
  - 🐧 `:penguin:` when fixing something on Linux
  - 🍎 `:apple:` when fixing something on macOS
  - 🏁 `:checkered_flag:` when fixing something on Windows
  - 🐛 `:bug:` when fixing a bug
  - 🔥 `:fire:` when removing code or files
  - 💚 `:green_heart:` when fixing the CI build
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security
  - ⬆️ `:arrow_up:` when upgrading dependencies
  - ⬇️ `:arrow_down:` when downgrading dependencies
  - 👕 `:shirt:` when removing linter warnings

### JavaScript Styleguide

All JavaScript code is linted with ESLint.

- Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
- Inline `export`s with expressions whenever possible
- Use semicolons
- Use 2 spaces for indentation
- Use camelCase for variables and functions
- Use PascalCase for components and classes
- Use UPPER_SNAKE_CASE for constants

### React/JSX Styleguide

- Use functional components with hooks over class components
- Use meaningful component and prop names
- Keep components small and focused
- Use PropTypes for type checking (or TypeScript)
- Prefer composition over inheritance
- Use Material-UI components when possible

### CSS Styleguide

- Use Material-UI's styling system (styled components or sx prop)
- Follow BEM methodology for custom CSS classes
- Use CSS variables for theme-related values
- Keep styles close to components

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

#### Type of Issue and Issue State

- `enhancement` - Feature requests
- `bug` - Bug reports
- `question` - Questions more than bug reports or feature requests
- `help-wanted` - Extra attention is needed
- `beginner` - Good for newcomers
- `duplicate` - This issue or pull request already exists
- `wontfix` - This will not be worked on
- `invalid` - This doesn't seem right

#### Topic Categories

- `frontend` - Related to the React frontend
- `backend` - Related to the Node.js backend
- `database` - Related to MongoDB or data modeling
- `authentication` - Related to user authentication
- `ui/ux` - Related to user interface and experience
- `performance` - Related to performance improvements
- `security` - Related to security issues
- `documentation` - Related to documentation
- `testing` - Related to testing

#### Pull Request Labels

- `work-in-progress` - Pull requests which are still being worked on
- `needs-review` - Pull requests which need code review
- `under-review` - Pull requests being reviewed
- `requires-changes` - Pull requests which need to be updated
- `ready-for-merge` - Pull requests that are ready to be merged

Thank you for contributing to TechGadgets! 🎉
