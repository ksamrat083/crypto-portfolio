import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = { theme: 'light' | 'dark' };
const initialState: UIState = { theme: (localStorage.getItem('ui') ? JSON.parse(localStorage.getItem('ui')!).theme : 'light') as 'light' | 'dark' };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('ui', JSON.stringify(state));
      } catch {}
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
      try {
        localStorage.setItem('ui', JSON.stringify(state));
      } catch {}
    }
  }
});

export const { toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
