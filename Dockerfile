FROM node:16.17.0

# Create app directory
WORKDIR /app

# Copy app
COPY . .

# Install dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]