import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentStatus, selectIsAuthenticated } from "../app/stores/selectors/authSelectors";
import { useEffect } from "react";
import { useAppDispatch } from "../app/stores/hooks";
import { currentUser } from "../app/stores/slices/userSlice";
import { Spinner } from "@radix-ui/themes";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch()

    const isAuth = useSelector(selectIsAuthenticated)
    const status = useSelector(selectCurrentStatus)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(currentUser())
        }
    }, [status, dispatch])

    if (status === 'idle' || status === 'loading') return <Spinner />
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};