import { createReducer } from '@reduxjs/toolkit';
const initialstate = {}

export const CreateBooking = createReducer(initialstate, {
    CreateBookingRequest: (state) => {
        state.loading = true;
    },
    CreateBookingSuccess: (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.isPosted = true;
    },
    CreateBookingFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    CreateBookingReset: (state) => {
        state.loading = false;
        state.isPosted = false;
    },
    ClearError: (state) => {
        state.error = null
    }
})


export const getBookings = createReducer(initialstate, {
    getBookingRequest: (state) => {
        state.loading = true;
    },
    getBookingSuccess: (state, action) => {
        state.loading = false;
        state.bookedTime = action.payload;
    },
    getBookingFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const LoggedInUserBookings = createReducer(initialstate, {
    LoggedUserBookingRequest: (state) => {
        state.loading = true;
    },
    LoggedUserBookingSuccess: (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
    },
    LoggedUserBookingFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const partnersBookings = createReducer(initialstate, {
    PartnersBookingRequest: (state) => {
        state.loading = true;
    },
    PartnersBookingSuccess: (state, action) => {
        state.loading = false;
        state.bookedTime = action.payload;
    },
    PartnersBookingFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})


export const loggedUserLikedSaloons = createReducer(initialstate, {
    loggedUserSaloonRequest: (state) => {
        state.loading = true;
    },
    loggedUserSaloonSuccess: (state, action) => {
        state.loading = false;
        state.saloon = action.payload;
    },
    loggedUserSaloonFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getSingleBookingDetails = createReducer(initialstate, {
    GetSingleBookingDetailsRequest: (state) => {
        state.loading = true;
    },
    GetSingleBookingDetailsSuccess: (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
    },
    GetSingleBookingDetailsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const CancelBookingResults = createReducer(initialstate, {
    CancelBookingResultsRequest: (state) => {
        state.loading = true
    },
    CancelBookingResultsSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    CancelBookingResultsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null
    },
    clearMessage: (state) => {
        state.message = null;
    }
})

export const cancelPaymentRefund = createReducer(initialstate, {
    CancelPaymentRefundRequest: (state) => {
        state.loading = true;
    },
    CancelPaymentRefundSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
    },
    CancelPaymentRefundFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const CancelPreviousBookingResults = createReducer(initialstate, {
    CancelPreviousBookingResultsRequest: (state) => {
        state.loading = true
    },
    CancelPreviousBookingResultsSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    CancelPreviousBookingResultsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null
    },
    clearMessage: (state) => {
        state.message = null;
    }
})