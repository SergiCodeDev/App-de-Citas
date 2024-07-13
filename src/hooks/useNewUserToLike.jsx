import { useState, useCallback } from "react";

export function useNewUserToLike() {
    const [userToLike, setUserToLike] = useState(null);
    const [errorData, setErrorData] = useState(false);

    const getNewUserToLike = useCallback(async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}/getuser`);

            if (!response.ok) {
                setErrorData(true);
                throw new Error(`Error: ${response.status}`);
            }

            // No quedan usuarios para mostrar
            if (response.status === 204) {
                setUserToLike(null);
                setErrorData(false);
                return;
            }

            setErrorData(false);
            const data = await response.json();
            setUserToLike(data);
        } catch (err) {
            console.log(err.message);
            setErrorData(true);
        }
    }, []);

    return { userToLike, errorData, getNewUserToLike };
}