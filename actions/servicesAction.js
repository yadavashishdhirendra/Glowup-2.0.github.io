import axios from "axios"
import { API } from "../config/config"

export const getServiceCategoryFilter = (servicetype) => async (dispatch) => {
    try {
        dispatch({
            type: 'GetServiceFilterRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/service`, { servicetype }, config)
        dispatch({
            type: 'GetServiceFilterSuccess',
            payload: data.arr
        })
    } catch (error) {
        dispatch({
            type: 'GetServiceFilterFail',
            payload: error.response.data.message
        })

    }
}

export const getServiceDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'GetServiceDetailRequest'
        })

        const { data } = await axios.get(`${API}/customer/saloon/${id}`)
        dispatch({
            type: 'GetServiceDetailSuccess',
            payload: data.saloon
        })
    } catch (error) {
        dispatch({
            type: 'GetServiceDetailFail',
            payload: error.response.data.message
        })

    }
}

export const getServiceByCategory = (id, servicetype) => async (dispatch) => {
    try {
        dispatch({
            type: 'SaloonServiceCategoryNameRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/service/category/${id}`, { servicetype }, config)
        dispatch({
            type: 'SaloonServiceCategoryNameSuccess',
            payload: data.filter
        })
    } catch (error) {
        dispatch({
            type: 'SaloonServiceCategoryNameFail',
            payload: error.response.data.message
        })

    }
}

export const getSaloonService = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'SaloonServiceRequest'
        })

        const { data } = await axios.get(`${API}/customer/saloon/service/${id}`)
        dispatch({
            type: 'SaloonServiceSuccess',
            payload: data.service
        })
    } catch (error) {
        dispatch({
            type: 'SaloonServiceFail',
            payload: error.response.data.message
        })

    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeRequest"
        })

        const { data } = await axios.get(`${API}/customer/saloon/like/${id}`)
        dispatch({
            type: "likeSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "likeFailure",
            payload: error.response.data.message
        })
    }
}

export const getServiceByCategorytype = (id, servicetype, category) => async (dispatch) => {
    try {
        dispatch({
            type: 'GetAllServicesFilterRequest'
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`${API}/customer/saloon/services/${id}`, { servicetype, category }, config)
        dispatch({
            type: 'GetAllServicesFilterSuccess',
            payload: data.filterServices
        })
    } catch (error) {
        dispatch({
            type: 'GetAllServicesFilterFail',
            payload: error.response.data.message
        })

    }
}

export const getServicesEmployees = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "GetIndividualServicesEmployeeRequest"
        })

        const { data } = await axios.get(`${API}/customer/services/employee/${id}`)
        dispatch({
            type: "GetIndividualServicesEmployeeSuccess",
            payload: data.employees
        })
    } catch (error) {
        dispatch({
            type: "GetIndividualServicesEmployeeFail",
            payload: error.response.data.message
        })
    }
}

export const getSingleService = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "GetSingleServiceBookingRequest"
        })

        const { data } = await axios.get(`${API}/customer/booking/servicedetails/${id}`)
        dispatch({
            type: "GetSingleServiceBookingSuccess",
            payload: data.getService
        })
    } catch (error) {
        dispatch({
            type: "GetSingleServiceBookingFail",
            payload: error.response.data.message
        })
    }
}

export const getSearchSaloon = (servicetype, servicename) => async (dispatch) => {
    try {
        dispatch({
            type: "GetSearchSaloonRequest"
        })

        const { data } = await axios.post(`${API}/customer/search/saloon`, { servicetype, servicename })
        dispatch({
            type: "GetSearchSaloonSuccess",
            payload: data.saloons
        })
    } catch (error) {
        dispatch({
            type: "GetSearchSaloonFail",
            payload: error.response.data.message
        })
    }
}

export const getAllSallons = () => async (dispatch) => {
    try {
        dispatch({
            type: 'GetAllSaloonsRequest'
        })

        const { data } = await axios.get(`${API}/customer/allsaloons`)
        dispatch({
            type: 'GetAllSaloonsSuccess',
            payload: data.saloons
        })
    } catch (error) {
        dispatch({
            type: 'GetAllSaloonsFail',
            payload: error.response.data.message
        })

    }
}

export const getLikedSaloonsUsers = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'GetLikedUserSaloonRequest'
        })

        const { data } = await axios.get(`${API}/customer/liked/saloon/user/${id}`)
        dispatch({
            type: 'GetLikedUserSaloonSuccess',
            payload: data.saloon
        })
    } catch (error) {
        dispatch({
            type: 'GetLikedUserSaloonFail',
            payload: error.response.data.message
        })

    }
}

export const newReviewSaloon = (id, rating, comment) => async (dispatch) => {
    try {
        dispatch({
            type: 'NewReviewRequest'
        })

        const { data } = await axios.put(`${API}/customer/review/saloon`, { id, rating, comment })
        dispatch({
            type: 'NewReviewSuccess',
            payload: data.review
        })
    } catch (error) {
        dispatch({
            type: 'NewReviewFail',
            payload: error.response.data.message
        })

    }
}

export const getReviewSaloon = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'GetReviewRequest'
        })

        const { data } = await axios.get(`${API}/customer/get/review/saloon/${id}`)
        dispatch({
            type: 'GetReviewSuccess',
            payload: data.reviews
        })
    } catch (error) {
        dispatch({
            type: 'GetReviewFail',
            payload: error.response.data.message
        })

    }
}


export const getSortedSaloons = () => async (dispatch) => {
    try {
        dispatch({
            type: "GetSortedSaloonsRequest"
        })

        const { data } = await axios.get(`${API}/customer/saloon/sort`)
        dispatch({
            type: "GetSortedSaloonsSuccess",
            payload: data.sorted
        })
    } catch (error) {
        dispatch({
            type: "GetSortedSaloonsFail",
            payload: error.response.data.message
        })
    }
}


export const cancelResult = (id, status) => async (dispatch) => {
    try {
        dispatch({
            type: "CancelBookingResultsRequest"
        })

        const { data } = await axios.post(`${API}/cancel/customer/bookings/${id}`, { status })
        dispatch({
            type: "CancelBookingResultsSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "CancelBookingResultsFailure",
            payload: error.response.data.message
        })
    }
}


export const refundPay = (paymentId, price) => async (dispatch) => {
    try {
        dispatch({
            type: "CancelPaymentRefundRequest"
        })

        const { data } = await axios.post(`${API}/refund/booking/payment`, { paymentId, price })
        dispatch({
            type: "CancelPaymentRefundSuccess",
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: "CancelPaymentRefundFail",
            payload: error.response.data.message
        })
    }
}

export const newUIService = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "GetSortedSaloonsServiceRequest"
        })

        const { data } = await axios.get(`${API}/service/saloon/individual/${id}`)
        dispatch({
            type: "GetSortedSaloonsServiceSuccess",
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: "GetSortedSaloonsServiceFail",
            payload: error.response.data.message
        })
    }
}

export const multipleHours = (idList) => async (dispatch) => {
    try {
        dispatch({
            type: "GetMultipleServiceHourRequest"
        })

        const { data } = await axios.post(`${API}/services/hour`, { idList })
        dispatch({
            type: "GetMultipleServiceHourSuccess",
            payload: data.serviceData
        })
    } catch (error) {
        dispatch({
            type: "GetMultipleServiceHourFail",
            payload: error.response.data.message
        })
    }
}
