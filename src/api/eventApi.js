import Constants from 'expo-constants';

export const fetchEvents = async () => {
    const BACKEND_API = Constants.expoConfig?.extra?.backendApi;
    try {
        const response = await fetch(`${BACKEND_API}/api/event`)
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: data.error}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}

export const fetchEventById = async (id) => {
    const BACKEND_API = Constants.expoConfig?.extra?.backendApi;
    try {
        const response = await fetch(`${BACKEND_API}/api/event/${id}`)
        const data = await response.json()
        if (response.ok) {
            return {data: data, error: null}
        } else {
            return {data: [], error: data.error}
        }
    } catch (error) {
        return {data: [], error: error}
    }
}