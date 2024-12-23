# Step 1: Use the Node.js LTS image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the backend files
COPY . .

# Step 6: Expose the backend port
EXPOSE 5000

# Step 7: Run the Express server
CMD ["node", "index.js"]
