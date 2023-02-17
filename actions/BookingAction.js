import axios from "axios"
import { API } from "../config/config"

export const createBooking = (date, category, asignee, servicename, results, price, intime, outtime, servicetype, paymentId, shopname, mobileno, selectedDate, serviceId) => async (dispatch) => {
    try {
        dispatch({
            type: 'CreateBookingRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/booking`, { date, category, asignee, servicename, results, price, intime, outtime, servicetype, paymentId, shopname, mobileno, selectedDate, serviceId }, config)
        dispatch({
            type: 'CreateBookingSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'CreateBookingFail',
            payload: error.response.data.message
        })
    }
}

// CREATE BOOKING FOR NO REFERENCE
export const createBookings = (date, category, servicename, results, price, intime, outtime, servicetype, paymentId, shopname, mobileno, selectedDate, serviceId) => async (dispatch) => {
    try {
        dispatch({
            type: 'CreateBookingRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/booking`, { date, category, servicename, results, price, intime, outtime, servicetype, paymentId, shopname, mobileno, selectedDate, serviceId }, config)
        dispatch({
            type: 'CreateBookingSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'CreateBookingFail',
            payload: error.response.data.message
        })
    }
}

// CREATE BOOKING FOR NO REFERENCE
export const createBookingsMultipleService = (date, category, servicename, results, price, intime, outtime, servicetype, paymentId, shopname, mobileno, selectedDate, idList) => async (dispatch) => {
    try {
        dispatch({
            type: 'CreateBookingRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/booking`, { date, category, servicename, results, price, intime, outtime, servicetype, paymentId, shopname, mobileno, selectedDate, idList }, config)
        dispatch({
            type: 'CreateBookingSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'CreateBookingFail',
            payload: error.response.data.message
        })
    }
}

// CREATE BOOKING FOR PAY LATER
export const createBookingPayLater = (date, category, asignee, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, serviceId) => async (dispatch) => {
    try {
        dispatch({
            type: 'CreateBookingRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/booking`, { date, category, asignee, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, serviceId }, config)
        dispatch({
            type: 'CreateBookingSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'CreateBookingFail',
            payload: error.response.data.message
        })
    }
}

// CREATE BOOKING FOR NO REFERENCE PAY LATER
export const createBookingNoRefPayLater = (date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, serviceId) => async (dispatch) => {
    try {
        dispatch({
            type: 'CreateBookingRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/booking`, { date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, serviceId }, config)
        dispatch({
            type: 'CreateBookingSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'CreateBookingFail',
            payload: error.response.data.message
        })
    }
}

// CREATE BOOKING FOR NO REFERENCE PAY LATER WITH MULTIPLE SERVICES
export const createBookingNoRefPayLaterMultipleServices = (date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, idList) => async (dispatch) => {
    try {
        dispatch({
            type: 'CreateBookingRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/booking`, { date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paylater, selectedDate, idList }, config)
        dispatch({
            type: 'CreateBookingSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'CreateBookingFail',
            payload: error.response.data.message
        })
    }
}


// RESCHEDULE BOOKING WITH ASIGNEE
export const RescheduleBookingAsignee = (date, category, asignee, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paymentId, selectedDate, serviceId) => async (dispatch) => {
    try {
        dispatch({
            type: 'CreateBookingRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/booking`, { date, category, asignee, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paymentId, selectedDate, serviceId }, config)
        dispatch({
            type: 'CreateBookingSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'CreateBookingFail',
            payload: error.response.data.message
        })
    }
}

// RESCHEDULE BOOKING WITHOUT ASIGNEE
export const RescheduleBookingWithoutAsignee = (date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paymentId, selectedDate, serviceId) => async (dispatch) => {
    try {
        dispatch({
            type: 'CreateBookingRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/booking`, { date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paymentId, selectedDate, serviceId }, config)
        dispatch({
            type: 'CreateBookingSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'CreateBookingFail',
            payload: error.response.data.message
        })
    }
}

// RESCHEDULE BOOKING WITHOUT ASIGNEE MULTIPLE SERVICES
export const RescheduleBookingWithoutAsigneeMultipleServices = (date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paymentId, selectedDate, idList) => async (dispatch) => {
    try {
        dispatch({
            type: 'CreateBookingRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/booking`, { date, category, servicename, results, price, intime, outtime, servicetype, shopname, mobileno, paymentId, selectedDate, idList }, config)
        dispatch({
            type: 'CreateBookingSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'CreateBookingFail',
            payload: error.response.data.message
        })
    }
}

export const getAllSlot = (id, date) => async (dispatch) => {
    try {
        dispatch({
            type: 'getBookingRequest'
        })

        const { data } = await axios.post(`${API}/customer/get/booking`, { id, date });
        dispatch({
            type: 'getBookingSuccess',
            payload: data.bookedTime
        })
    } catch (error) {
        dispatch({
            type: 'getBookingFail',
            payload: error.response.data.message
        })
    }
}

export const loggedUserBooking = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoggedUserBookingRequest'
        })

        const { data } = await axios.get(`${API}/customer/get/user/booking`)
        dispatch({
            type: 'LoggedUserBookingSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'LoggedUserBookingFail',
            payload: error.response.data.message
        })
    }
}


export const loggedUserLikeSaloon = () => async (dispatch) => {
    try {
        dispatch({
            type: 'loggedUserSaloonRequest'
        })

        const { data } = await axios.get(`${API}/customer/saved/saloon`)
        dispatch({
            type: 'loggedUserSaloonSuccess',
            payload: data.saloon
        })
    } catch (error) {
        dispatch({
            type: 'loggedUserSaloonFail',
            payload: error.response.data.message
        })
    }
}


export const getPartnersAllSlot = (id, date) => async (dispatch) => {
    try {
        dispatch({
            type: 'PartnersBookingRequest'
        })

        const { data } = await axios.post(`${API}/bookings`, { id, date });
        dispatch({
            type: 'PartnersBookingSuccess',
            payload: data.bookedTime
        })
    } catch (error) {
        dispatch({
            type: 'PartnersBookingFail',
            payload: error.response.data.message
        })
    }
}

export const getBookingDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'GetSingleBookingDetailsRequest'
        })

        const { data } = await axios.get(`${API}/booking/details/${id}`);
        dispatch({
            type: 'GetSingleBookingDetailsSuccess',
            payload: data.bookings
        })
    } catch (error) {
        dispatch({
            type: 'GetSingleBookingDetailsFail',
            payload: error.response.data.message
        })
    }
}

export const resultPreviousDelete = (bookingId) => async (dispatch) => {
    try {
        dispatch({
            type: "CancelPreviousBookingResultsRequest"
        })

        const { data } = await axios.post(`${API}/cancel/previous/bookings/${bookingId}`)
        dispatch({
            type: "CancelPreviousBookingResultsSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "CancelPreviousBookingResultsFailure",
            payload: error.response.data.message
        })
    }
}