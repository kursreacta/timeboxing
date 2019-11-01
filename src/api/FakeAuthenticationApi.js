import { wait } from "./wait";

const FakeAuthenticationAPI = {
    login: async function(credentials) {
        await wait(200);
        const { email, password } = credentials;
        if (email === "bob@example.com" && password === "secret") {
            return {
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvYkBleGFtcGxlLmNvbSIsImlhdCI6MTU3MjYyMzQ5MSwiZXhwIjoxNTcyNjI3MDkxLCJzdWIiOiIyIn0.pFqv7KN01D8eHlw3D6VCKuthudZuVx4OOfiCC5NdJPk"
            }
        }
        throw new Error("Invalid credentials");
    }
}

export default FakeAuthenticationAPI;