import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { container } from "../../../di/container"
import { TOKENS } from "../../../di/tokens"
import { API_URL } from "../../../infrastructure/api/Urls"
import type { AppDispatch, RootState } from "../store"
import { DocumentService } from "../../services/DocumentService"
import type { LeadDocumentResponse } from "../../../infrastructure/dtos/DocumentResponse"
import type { DocumentData, UpdateDocumentType } from "../../../core/interfaces/Document"

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
    documents: DocumentData[]
}

const initialState: DocumentState = {
    files: [],
    documents: []
}

export const uploadMultipleDocuments = createAsyncThunk<
    void,
    FormData,
    { dispatch: AppDispatch; state: RootState }
>(
    API_URL.document.upload,
    async (formData, { dispatch, getState }) => {
        const service = container.resolve<DocumentService>(TOKENS.DocumentService)

        await service.uploadDocuments(formData, (percent) => {
            const files = getState().document.files;
            files.forEach((f) =>
                dispatch(updateProgress({ uuid: f.uuid, progress: percent }))
            );
        });

        // Mark all files as success
        const state = getState();
        state.document.files.forEach((f) => dispatch(markFileSuccess(f.uuid)));
    }
)

export const AllDocumentsByLead = createAsyncThunk(
    API_URL.document.all,
    async (lead_uuid: string) => {
        const document = container.resolve<DocumentService>(TOKENS.DocumentService)
        return await document.documentsByLead(lead_uuid)
    }
)

export const UpdateType = createAsyncThunk(
    API_URL.document.updateType,
    async (data: UpdateDocumentType) => {
        const document = container.resolve<DocumentService>(TOKENS.DocumentService)
        return await document.updateType(data)
    }
)

export const DeleteDocument = createAsyncThunk(
    API_URL.document.delete,
    async (document_uuid: string) => {
        const document = container.resolve<DocumentService>(TOKENS.DocumentService)
        return await document.deleteDocument(document_uuid)
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
        builder.addCase(AllDocumentsByLead.fulfilled, (state: DocumentState, action: PayloadAction<LeadDocumentResponse>) => {
            state.documents = action.payload.data.documents ?? []
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
