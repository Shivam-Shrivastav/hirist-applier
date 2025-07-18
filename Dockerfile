# Use Node base image with full Linux support
FROM node:20-slim

# Install necessary dependencies for Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy app files
COPY package*.json ./
RUN npm install

COPY . .

# Let Puppeteer know where Chromium is
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Start the script
CMD ["npm", "start"]
