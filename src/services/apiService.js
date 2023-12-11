export const saveStepsToDatabase = async (steps) => {
    console.log(`steps`+JSON.stringify({ steps }));
    const response = await fetch('http://localhost:3001/api/saveProcessSteps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ steps }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to save steps to the database');
    }
  
    const data = await response.json();
    return data.message;
  };
  