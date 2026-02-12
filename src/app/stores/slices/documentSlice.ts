import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { container } from "../../../di/container"
import type { AxiosApiService } from "../../../infrastructure/api/AxiosApiService"
import { TOKENS } from "../../../di/tokens"
import { API_URL } from "../../../infrastructure/api/Urls"
import type { AppDispatch, RootState } from "../store"

interface UploadFile {
    uuid: string
    lead_uuid: string
    file: File
    progress: number
    status: "uploading" | "success" | "error"
    preview?: string
}

interface DocumentState {
    files: UploadFile[]
}

const initialState: DocumentState = {
    files: []
}

export const uploadDocument = createAsyncThunk(
    API_URL.document.upload,
    async (fileObj: UploadFile, { dispatch }) => {
        const formData = new FormData()
        formData.append("documents[]", fileObj.file)
        formData.append("lead_uuid", fileObj.lead_uuid)

        const api = container.resolve<AxiosApiService>(TOKENS.ApiService)

        await api.postForm(
            API_URL.document.upload,
            formData,
            {
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) /
                        (progressEvent.total || 1)
                    )

                    dispatch(
                        updateProgress({
                            uuid: fileObj.uuid,
                            progress: percent,
                        })
                    )
                },
            }
        )

        return fileObj.uuid
    }
)

export const uploadMultipleDocuments = createAsyncThunk<
    void,
    FormData,
    { dispatch: AppDispatch; state: RootState }
>(
    "document/uploadMultipleDocuments",
    async (formData, { dispatch, getState }) => {
        const api = container.resolve<AxiosApiService>(TOKENS.ApiService)

        await api.postForm(API_URL.document.upload, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (event) => {
                const percent = Math.round(
                    (event.loaded * 100) / (event.total || 1)
                )

                // Type-safe access to state
                const state = getState()
                const files = state.document.files

                files.forEach((f) =>
                    dispatch(
                        updateProgress({ uuid: f.uuid, progress: percent })
                    )
                )
            }
        })

        // Mark all files as success
        const state = getState()
        state.document.files.forEach((f) =>
            dispatch(markFileSuccess(f.uuid))
        )
    }
)


const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        addFile: (state, action: PayloadAction<UploadFile>) => {
            state.files.push(action.payload)
        },
        updateProgress: (state, action: PayloadAction<{ uuid: string; progress: number }>) => {
            const file = state.files.find(f => f.uuid === action.payload.uuid)
            if (file) file.progress = action.payload.progress
        },
        markFileSuccess: (state, action: { payload: string }) => {
            // action.payload is the uuid
            const file = state.files.find(f => f.uuid === action.payload)
            if (file) file.status = "success"
        },
        markError: (state, action: PayloadAction<string>) => {
            const file = state.files.find(f => f.uuid === action.payload)
            if (file) file.status = "error"
        },
        removeFile: (state, action: PayloadAction<string>) => {
            state.files = state.files.filter(f => f.uuid !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(uploadDocument.fulfilled, (state, action) => {
            const file = state.files.find(f => f.uuid === action.payload)
            if (file) file.status = "success"
        })
    }
})

export const {
    addFile,
    updateProgress,
    removeFile,
    markFileSuccess,
    markError
} = documentSlice.actions

export default documentSlice.reducer
