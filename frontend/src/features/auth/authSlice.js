import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Util from "../../helpers/Util";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  showVerificationOverlay: false,
  emailVerificationRequired: false
};

export const signUp = createAsyncThunk(
  'auth/signup',
  async (formData, { rejectWithValue }) => {
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      return rejectWithValue({
        message: "Passwords do not match.",
        status: 400
      });
    }

    // Validate terms acceptance
    if (!formData.isAgreed) {
      return rejectWithValue({
        message: "Tick Accept Terms and Privacy Policy.",
        status: 400
      });
    }

    try {
      const response = await new Promise((resolve, reject) => {
        Util.call_Post_by_URI(
          "users/signup",
          {
            name : formData.name,
            email: formData.email,
            password: formData.password,
          },
          (res, status) => {
            if (status && res?.success) {
              resolve(res);
            } else {
              reject({
                message: res?.message || 'Signup failed',
                status: status
              });
            }
          }
        );
      });

      // Handle email verification requirement
      if (response?.message === "Please verify your email to continue") {
        return {
          success: true,
          message: response.message,
          email: formData.email,
          emailVerificationRequired: true
        };
      }

      return {
        success: true,
        message: response.message,
        user: response.user,
        token: response.token,
        email: formData.email,
        emailVerificationRequired: false
      };

    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.message || 'An unexpected error occurred',
        status: error.status || 500
      });
    }
  }
);

export const googleSignUp = createAsyncThunk(
  'auth/googleSignUp',
  async (_, { rejectWithValue }) => {
    try {
      // Implement Google sign-up logic here
      throw new Error('Google sign-up not implemented yet');
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: 500
      });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.emailVerificationRequired = false;
      state.showVerificationOverlay = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    setShowVerificationOverlay: (state, action) => {
      state.showVerificationOverlay = action.payload;
    },
    clearForm: (state) => {
      // Can be used to reset specific form-related state if needed
      state.error = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Sign Up Cases
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        
        if (action.payload.emailVerificationRequired) {
          state.emailVerificationRequired = true;
          state.showVerificationOverlay = true;
          toast.info("Please verify your email to continue", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        } else {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.showVerificationOverlay = false;
          
          localStorage.setItem('token', action.payload.token);
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          
          toast.success("Sign-up successful!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        toast.error(action.payload.message || "Sign-up failed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      })
      // Google Sign Up Cases
      .addCase(googleSignUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        
        toast.success("Google sign-up successful!");
      })
      .addCase(googleSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        toast.error(action.payload.message || "Google sign-up failed");
      });
  }
});

// Export actions
export const { 
  setUser, 
  logout, 
  clearError,
  setShowVerificationOverlay,
  clearForm 
} = authSlice.actions;

// Export selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectShowVerificationOverlay = (state) => state.auth.showVerificationOverlay;
export const selectEmailVerificationRequired = (state) => state.auth.emailVerificationRequired;

export default authSlice.reducer;