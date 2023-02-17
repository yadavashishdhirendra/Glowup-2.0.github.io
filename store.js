import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { getAllServicesFilter, getCategoryNameBySaloon, getIndividualSaloonService, getServiceDetails, getServiceEmployees, getServiceFilteration, likeReducer, getSingleServiceBooking, getSearchSaloons, getAllSaloons, getLikedSaloonsUser, newReviewSaloon, getReviewSaloon, getSortedSaloons, newUISaloonService, multipleServiceHour } from "./reducers/serviceReducers";
import { authReducer, LoadUser, LoginUser, LoginUserDemo, LoginVerifyUser, LogoutUser, verifyUser } from "./reducers/userReducers";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { CancelBookingResults, cancelPaymentRefund, CancelPreviousBookingResults, CreateBooking, getBookings, getSingleBookingDetails, LoggedInUserBookings, loggedUserLikedSaloons, partnersBookings } from "./reducers/BookingReducers";

const store = configureStore({
    reducer: {
        auth: authReducer,
        authVerify: verifyUser,
        login: LoginUser,
        loginVerify: LoginVerifyUser,
        LoadUser: LoadUser,
        serviceFilter: getServiceFilteration,
        serviceDetails: getServiceDetails,
        chooseService: getCategoryNameBySaloon,
        allService: getIndividualSaloonService,
        likeUnlike: likeReducer,
        getAllServices: getAllServicesFilter,
        getEmployees: getServiceEmployees,
        getSingleService: getSingleServiceBooking,
        searchSaloon: getSearchSaloons,
        createBooking: CreateBooking,
        getBooking: getBookings,
        Bookings: LoggedInUserBookings,
        logout: LogoutUser,
        likedSaloon: loggedUserLikedSaloons,
        AllSaloons: getAllSaloons,
        likeUser: getLikedSaloonsUser,
        review: newReviewSaloon,
        getReview: getReviewSaloon,
        partnerBooking: partnersBookings,
        sortSaloon: getSortedSaloons,
        bookingDetails: getSingleBookingDetails,
        cancelBooking: CancelBookingResults,
        refundPayment: cancelPaymentRefund,
        cancelPrevious: CancelPreviousBookingResults,
        loginDemo: LoginUserDemo,
        uiService: newUISaloonService,
        multipleHour: multipleServiceHour
    },
    // middleware: getDefaultMiddleware({
    //     serializableCheck: {
    //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    // }),
})

export default store;