import { createReducer } from '@reduxjs/toolkit';
const initialstate = {}

export const getServiceFilteration = createReducer(initialstate, {
    GetServiceFilterRequest: (state) => {
        state.loading = true;
    },
    GetServiceFilterSuccess: (state, action) => {
        state.loading = false;
        state.arr = action.payload;
    },
    GetServiceFilterFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getServiceDetails = createReducer(initialstate, {
    GetServiceDetailRequest: (state) => {
        state.loading = true
    },
    GetServiceDetailSuccess: (state, action) => {
        state.loading = false;
        state.saloon = action.payload;
    },
    GetServiceDetailFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getCategoryNameBySaloon = createReducer(initialstate, {
    SaloonServiceCategoryNameRequest: (state) => {
        state.loading = true
    },
    SaloonServiceCategoryNameSuccess: (state, action) => {
        state.loading = false;
        state.filter = action.payload;
    },
    SaloonServiceCategoryNameFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getIndividualSaloonService = createReducer(initialstate, {
    SaloonServiceRequest: (state) => {
        state.loading = true
    },
    SaloonServiceSuccess: (state, action) => {
        state.loading = false;
        state.service = action.payload;
    },
    SaloonServiceFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const likeReducer = createReducer(initialstate, {
    likeRequest: (state, action) => {
        state.loading = true
    },
    likeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    likeFailure: (state, action) => {
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

export const getAllServicesFilter = createReducer(initialstate, {
    GetAllServicesFilterRequest: (state) => {
        state.loading = true
    },
    GetAllServicesFilterSuccess: (state, action) => {
        state.loading = false;
        state.filterServices = action.payload;
    },
    GetAllServicesFilterFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getServiceEmployees = createReducer(initialstate, {
    GetIndividualServicesEmployeeRequest: (state) => {
        state.loading = true
    },
    GetIndividualServicesEmployeeSuccess: (state, action) => {
        state.loading = false;
        state.employees = action.payload;
    },
    GetIndividualServicesEmployeeFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getSingleServiceBooking = createReducer(initialstate, {
    GetSingleServiceBookingRequest: (state) => {
        state.loading = true
    },
    GetSingleServiceBookingSuccess: (state, action) => {
        state.loading = false;
        state.getService = action.payload;
    },
    GetSingleServiceBookingFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getSearchSaloons = createReducer(initialstate, {
    GetSearchSaloonRequest: (state) => {
        state.loading = true
    },
    GetSearchSaloonSuccess: (state, action) => {
        state.loading = false;
        state.saloons = action.payload;
    },
    GetSearchSaloonFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getAllSaloons = createReducer(initialstate, {
    GetAllSaloonsRequest: (state) => {
        state.loading = true
    },
    GetAllSaloonsSuccess: (state, action) => {
        state.loading = false;
        state.saloons = action.payload;
    },
    GetAllSaloonsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getLikedSaloonsUser = createReducer(initialstate, {
    GetLikedUserSaloonRequest: (state) => {
        state.loading = true
    },
    GetLikedUserSaloonSuccess: (state, action) => {
        state.loading = false;
        state.saloon = action.payload;
    },
    GetLikedUserSaloonFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const newReviewSaloon = createReducer(initialstate, {
    NewReviewRequest: (state) => {
        state.loading = true
    },
    NewReviewSuccess: (state, action) => {
        state.loading = false;
        state.review = action.payload;
    },
    NewReviewFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getReviewSaloon = createReducer(initialstate, {
    GetReviewRequest: (state) => {
        state.loading = true
    },
    GetReviewSuccess: (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
    },
    GetReviewFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const getSortedSaloons = createReducer(initialstate, {
    GetSortedSaloonsRequest: (state) => {
        state.loading = true
    },
    GetSortedSaloonsSuccess: (state, action) => {
        state.loading = false;
        state.sorted = action.payload;
    },
    GetSortedSaloonsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const newUISaloonService = createReducer(initialstate, {
    GetSortedSaloonsServiceRequest: (state) => {
        state.loading = true
    },
    GetSortedSaloonsServiceSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
    },
    GetSortedSaloonsServiceFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    ClearError: (state) => {
        state.error = null
    }
})

export const multipleServiceHour = createReducer(initialstate, {
    GetMultipleServiceHourRequest: (state) => {
        state.loading = true
    },
    GetMultipleServiceHourSuccess: (state, action) => {
        state.loading = false;
        state.serviceData = action.payload;
    },
    GetMultipleServiceHourFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    ClearError: (state) => {
        state.error = null
    }
})
