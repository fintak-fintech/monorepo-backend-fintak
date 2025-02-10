# Monorepo for Microservices

This monorepo contains multiple microservices built with Node.js and TypeScript. Each microservice is designed to handle a specific domain of the application, ensuring scalability and maintainability.

## Microservices

- **Loans**: Manages loan-related operations.
- **Promotions**: Handles promotional offers and discounts.
- **Reports**: Generates various reports based on the data.
- **Support**: Manages support tickets and customer inquiries.
- **User Experience Management**: Focuses on enhancing user experience.
- **Employees**: Manages employee data and operations.
- **Funders**: Handles information related to funders.
- **Companies**: Manages company-related data.

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd monorepo
   ```

2. Install dependencies for all microservices:
   ```
   npm install
   ```

### Running the Microservices

Each microservice can be run independently. Navigate to the desired microservice directory and start the service:

```
cd services/<microservice-name>
npm start
```

### Development

For development, you can use the following commands within each microservice:

- **Start the service**: `npm start`
- **Run tests**: `npm test`
- **Build the service**: `npm run build`

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.