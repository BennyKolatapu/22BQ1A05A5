const { Log } = require('./logger');

const TEST_AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmJxMWEwNWE1QHZ2aXQubmV0IiwiZXhwIjoxNzU0MDI5MjMzLCJpYXQiOjE3NTQwMjgzMzMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJhNjhlMTZjMi0wY2Q3LTRhNGUtYmI5Ni1mOTM4ZmI0OTJmNGIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJiZW5ueSBiYWJ1IGtvbGF0YXB1Iiwic3ViIjoiNDU4Njc3MGMtY2RmNi00NmNlLWI4NWQtNGQ0Yjg1YzU5ZjNhIn0sImVtYWlsIjoiMjJicTFhMDVhNUB2dml0Lm5ldCIsIm5hbWUiOiJiZW5ueSBiYWJ1IGtvbGF0YXB1Iiwicm9sbE5vIjoiMjJicTFhMDVhNSIsImFjY2Vzc0NvZGUiOiJQblZCRlYiLCJjbGllbnRJRCI6IjQ1ODY3NzBjLWNkZjYtNDZjZS1iODVkLTRkNGI4NWM1OWYzYSIsImNsaWVudFNlY3JldCI6IkRXQXN2TnRKalp5bUZDQXUifQ.zxpsPoVMvrDIFbks_UvbX_6ZbZUudSVY-1cNMjie3D8";

process.env.LOG_API_AUTH_TOKEN = TEST_AUTH_TOKEN;

async function testLog() {
  try {
    await Log('backend', 'error', 'handler', 'received string, expected bool');
    console.log('Log function test passed: Log sent successfully.');
  } catch (error) {
    console.error('Log function test failed:', error.message);
  }
}

testLog();
