# Step 1: Use the Node.js LTS image
FROM node:18 AS build

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the frontend files
COPY . .

# Step 6: Build the Next.js app
RUN npm run build
RUN npm run export

# Step 7: Use Nginx to serve the static Next.js app
FROM nginx:stable-alpine

# Step 8: Copy the Next.js build from the previous step
COPY --from=build /usr/src/app/out /usr/share/nginx/html

# Step 9: Expose port 80 for Nginx
EXPOSE 80

# Step 10: Run Nginx
CMD ["nginx", "-g", "daemon off;"]
