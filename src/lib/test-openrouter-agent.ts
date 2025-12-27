// Test file to validate the OpenRouter agent integration
import { todoAgent } from '@/lib/openrouter-agent';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

async function testAgent() {
  console.log('Testing OpenRouter agent integration...');

  // Test 1: Basic request
  console.log('\n1. Testing basic todo creation request...');
  const result1 = await todoAgent.processTodoRequest('Create a new task to buy groceries');
  console.log('Result:', result1);

  // Test 2: List request
  console.log('\n2. Testing list request...');
  const result2 = await todoAgent.processTodoRequest('Show me all my tasks');
  console.log('Result:', result2);

  // Test 3: Update request
  console.log('\n3. Testing update request...');
  const result3 = await todoAgent.processTodoRequest('Mark task 1 as complete');
  console.log('Result:', result3);

  // Test 4: Invalid request
  console.log('\n4. Testing invalid request...');
  const result4 = await todoAgent.processTodoRequest('');
  console.log('Result:', result4);

  // Test 5: Request with API key not set (simulate)
  console.log('\n5. Testing with API key temporarily unset...');
  const originalApiKey = process.env.OPEN_ROUTER;
  process.env.OPEN_ROUTER = '';
  const result5 = await todoAgent.processTodoRequest('Create a new task');
  console.log('Result:', result5);
  process.env.OPEN_ROUTER = originalApiKey; // Restore

  console.log('\nAll tests completed!');
}

// Only run if this file is executed directly
if (require.main === module) {
  testAgent().catch(console.error);
}

export { testAgent };