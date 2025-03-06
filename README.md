# KinetiqBP - Business Process Management System (BPMS)

> Yes this README is AI generated, I just wanted to put a README for **now**. I currently don't have time to update this. Just read this to get a very high level idea of the project

## Overview

KinetiqBP is a Business Process Management System (BPMS) built using Flowable Engine as the BPMN engine and React as the frontend. The application enables users to design, deploy, and manage business workflows efficiently with an intuitive UI.

## Features

- **BPMN Workflow Management**: Create, edit, and deploy BPMN workflows using Flowable Engine.
- **User-Friendly UI**: Developed with React and Material-UI (MUI) for an interactive user experience.
- **Process Visualization**: Utilize BPMN.js for rendering BPMN diagrams.
- **Dynamic Forms**: Integrated with Form.js to handle form-based user interactions.
- **API Gateway**: Spring Boot-based microservices architecture with an API Gateway for seamless communication.
- **Role-Based Access Control (RBAC)**: Secure authentication and authorization using Keycloak.
- **Real-Time Monitoring**: Track process instances and execution history using Flowable's analytics capabilities.

## Tech Stack

### Backend

- **Flowable Engine**: BPMN workflow automation.
- **Spring Boot**: Microservices-based backend.
- **PostgreSQL**: Self-hosted database for persisting workflow and user data.
- **Keycloak**: Authentication and authorization management.
- **Eureka Server**: Service discovery for microservices.
- **API Gateway**: Entry point for all microservices.

#### Microservices

- **`apigatewayapplication`**: Handles routing and API gateway functionality.
- **`flowablerestapplication`**: Exposes Flowable REST APIs.
- **`serviceregistryapplication`**: Manages microservice registration and discovery.
- **`uiserviceapplication`**: Manages UI-related backend logic.

### Frontend

- **React**: UI development framework.
- **Material-UI (MUI)**: Component library for a modern UI.
- **BPMN.js**: BPMN diagram rendering.
- **Form.js**: Form builder and manager.

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- Java (JDK 17+)
- PostgreSQL (Self-hosted)
- Keycloak (Self-hosted)

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/kinetiqbp.git
   cd kinetiqbp
   ```
2. Start the PostgreSQL database.
3. Configure `application.properties` in each microservice.
4. Start Keycloak and configure authentication settings.
5. Build and run the microservices:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Usage

1. Access the web application via `http://localhost:13403`.
2. Authenticate with Keycloak credentials.
3. Design workflows using the BPMN editor.
4. Deploy and execute workflows via the Flowable Engine.
5. Monitor process execution in real-time.

## Future Enhancements

- Implement additional analytics and reporting features.
- Support more workflow automation integrations.
- Enhance the UI with more drag-and-drop functionalities.
- Improve role-based access control with fine-grained permissions.

## License

This project is licensed under the MIT License.
