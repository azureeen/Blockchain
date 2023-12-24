# Blockchain Application

Welcome to the Blockchain Application repository. This Flask-based application is designed to demonstrate the fundamental concepts of a blockchain, including block creation, transaction handling, and the proof of work algorithm.

## Overview

The Blockchain Application is a simple yet powerful demonstration of blockchain technology. It uses Flask as its backend framework and provides a user-friendly interface to interact with a blockchain.

### Features

- **Block Creation**: Add and validate blocks with a proof of work algorithm.
- **Transaction Handling**: Create and verify transactions.
- **Blockchain Interaction**: View the entire blockchain and the last 10 transactions.
- **Flask-Based API**: Interact with the blockchain using HTTP endpoints.

## Getting Started

Follow these instructions to set up the Blockchain Application on your local machine.

### Prerequisites

- Docker
- Docker Compose

These tools are necessary to create and manage the containers in which the Flask application runs.

### Installation

1. **Unzip the Project Folder**: Extract the downloaded project folder containing the necessary files.
2. **Navigate to the Project Directory**:

```bash
   cd path/to/your/project-directory
```

Starting the Application with Docker Compose:

```bash
docker-compose up -d
```

Using the Application
With the Docker containers running, the Flask app should now be accessible. Interact with the application by visiting http://localhost:5000 or the corresponding local address.

### Exploring the Project
Add Transactions: Send a transaction between two parties.
View the Blockchain: See all the blocks in the chain.
Check Specific Transactions: Look up transactions by ID.
View the Last 10 Transactions: Get a quick overview of recent activity.
Stopping the Application
When finished, stop the Docker containers using:

```bash
docker-compose down
```

### Documentation
For a detailed understanding of the Blockchain Application, refer to the Documentation. It covers the following:

- Blockchain Class: The core of the application.
- Flask Routes: How to interact with the application.
- API Reference: Detailed endpoint documentation.
- Architecture Overview: High-level application structure.
- Transaction Management: How transactions are handled.
- Block Structure: Composition of a block in the blockchain.
- Troubleshooting

If you encounter issues, ensure that Docker is running, you're in the correct directory, and the necessary ports are available.

### Contributing
Contributions are welcome! Please read the contributing guide for details on how to contribute to this project.

### License
This project is licensed under the MIT License.

Enjoy exploring and contributing to the Flask Blockchain project!
