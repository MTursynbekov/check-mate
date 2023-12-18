interface SignInData {
    username: string;
    password: string;
}

interface ApiResponse {
    token: string; 
}

export const signIn = async (data: SignInData): Promise<ApiResponse> => {
    try {
        const response = await fetch('http://localhost:8080/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during sign up:', error);
        throw error;
    }
};
