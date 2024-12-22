# Stage 1: Node.js setup
FROM node:20.17.0-alpine AS node-build

# Set working directory for Node.js
WORKDIR /app

# Copy necessary Node.js files
COPY package*.json ./
COPY src/node_modules src/node_modules
COPY src/bot/PumpFunBot.js src/bot/PumpFunBot.js
COPY src/replies src/replies
COPY src/utils src/utils

# Install Node.js dependencies
RUN npm install

# Stage 2: Java setup
FROM eclipse-temurin:21 AS java-build

# Set working directory for Java
WORKDIR /app

# Copy Java files, Node.js build artifacts, and the compiled class file
COPY --from=node-build /app /app
COPY src/bot/PumpFunBotUI.java src/bot/PumpFunBotUI.java
COPY PumpFunBotUI.class /app/PumpFunBotUI.class

# Copy your JavaFX SDK
COPY javafx-sdk-17.0.13 /javafx-sdk

# Install JavaFX runtime dependencies
RUN apt-get update && apt-get install -y libgl1 libxi6 && apt-get clean

# Expose ports if necessary (e.g., for APIs or GUI services)
EXPOSE 8080

# Command to run your JavaFX app
CMD ["java", "--module-path", "/javafx-sdk/lib", "--add-modules", "javafx.controls", "PumpFunBotUI"]
