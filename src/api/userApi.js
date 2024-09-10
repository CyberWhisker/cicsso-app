import Constants from 'expo-constants';

export const userLogin = async (email, password) => {
    const BACKEND_API = Constants.expoConfig?.extra?.backendApi;
    try {
        const response = await fetch(`${BACKEND_API}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            return {data: data, error: null}
        } else {
            const data = await response.json();
            return {data: [], error: data.error}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}

export const storeUser = async (formData) => {
    const BACKEND_API = Constants.expoConfig?.extra?.backendApi;
    try {
        const response = await fetch(`${BACKEND_API}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (response.ok) {
            const json = await response.json()
            return {data: json, error: null}
        } else {
            const json = await response.json()
            return {data: [], error: json.error}
        }
    } catch (error) {
        return {data: [], error: error.message}
    }
}