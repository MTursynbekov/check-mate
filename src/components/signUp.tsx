interface SignUpData {
    username: string;
    password: string;
    phone: string;
}

interface ApiResponse {
    token: string; 
}

export const signUp = async (data: SignUpData): Promise<ApiResponse> => {
    try {
        const response = await fetch('http://localhost:8080/signup', {
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
