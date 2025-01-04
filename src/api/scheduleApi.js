import Constants from 'expo-constants';

export const fetchScheduleByDate = async (date, userId) => {
    const BACKEND_API = Constants.expoConfig?.extra?.backendApi;
    try {
        const response = await fetch(`${BACKEND_API}/api/schedule/getScheduleByDate/${date}/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res = await response.json()
        if (response.ok) {
            return { data: res, error: null }
        } else {
            return { data: [], error: response.error }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchSchedules = async () => {
    const BACKEND_API = Constants.expoConfig?.extra?.backendApi;
    try {
        const response = await fetch(`${BACKEND_API}/api/schedule`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res = await response.json()
        if (response.ok) {
            return { data: res, error: null }
        } else {
            return { data: [], error: response.error }
        }
    } catch (error) {
        return { data: [], error: error }
    }
}