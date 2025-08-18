const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const config = {
  buildCommand: 'npm run build',
  serverRestartCommand: 'pm2 restart server.js',
  logFile: path.join(__dirname, 'deploy.log')
};

/**
 * Simple logging function that writes to console and log file
 */
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  
  console.log(logMessage);
  fs.appendFileSync(config.logFile, logMessage + '\n');
}

/**
 * Execute a shell command and return a promise
 */
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    log(`Executing: ${command}`);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        log(`Error: ${error.message}`);
        return reject(error);
      }
      
      if (stderr) {
        log(`Command stderr: ${stderr}`);
      }
      
      log(`Command stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

/**
 * Main deployment function
 */
async function deploy() {
  try {
    log('Starting deployment process...');
    
    // Build the frontend
    log('Building frontend...');
    await executeCommand(config.buildCommand);
    
    // Restart the server
    log('Restarting server...');
    await executeCommand(config.serverRestartCommand);
    
    log('Deployment completed successfully!');
  } catch (error) {
    log(`Deployment failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the deployment
deploy();
