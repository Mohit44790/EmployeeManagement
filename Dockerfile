# Use official Node.js image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy project files
COPY package*.json ./
COPY . .

# Install dependencies and build
RUN npm install
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
