import Constants from 'expo-constants';

export const fetchAttendanceByUserIdSchedId = async (userId,schedId) => {
    const BACKEND_API = Constants.expoConfig?.extra?.backendApi;
    try {
        const response = await fetch(`${BACKEND_API}/api/attendance/user/schedule/${userId}/${schedId}`)
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

export const storeAttendance = async (formData) => {
    const BACKEND_API = Constants.expoConfig?.extra?.backendApi;
    try {
        const response = await fetch(`${BACKEND_API}/api/attendance`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const updateAttendance = async (formData) => {
    console.log(formData)
    const BACKEND_API = Constants.expoConfig?.extra?.backendApi;
    try {
        const response = await fetch(`${BACKEND_API}/api/attendance/${formData._id}`, {
            method: 'PATCH',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Failed to update Attendance');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}