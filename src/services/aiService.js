// Assuming you have an API endpoint for AI processing
export const getAIProcessedSteps = async (userInput) => {
    const response = await fetch('http://localhost:3001/api/generateProcessSteps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    if (!response.ok) {
      throw new Error('AI processing failed');
    }
  
    const data = await response.json();
    return data.steps;
  };
  