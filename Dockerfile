FROM node:20-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libgconf-2-4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxss1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Install Playwright
RUN npx playwright install --with-deps

# Copy test files
COPY . .

# Create directories for reports
RUN mkdir -p reports/html reports/json reports/csv logs

# Set environment variables
ENV ENVIRONMENT=docker
ENV CI=true
ENV HEADLESS=true

# Run tests
CMD ["npm", "test"]
