# Stage 1: Development
FROM node:24-alpine AS development
WORKDIR /app
COPY package*.json ./
# Install all dependencies (including devDependencies)
RUN npm install
COPY . .
# --host 0.0.0.0 is used to make the development server accessible from the outside of the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
EXPOSE 5173


# Stage 2: Build
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Stage 3: Production
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80

