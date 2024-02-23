import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface UserState {
    email: string | null;
    token: string | null;
    id: string | null;
}

const initialState: UserState = {
    email: null,
    token: null,
    id: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            const { email, id, token } = action.payload;
            state.email = email;
            state.id = id;
            state.token = token;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;