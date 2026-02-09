import React from "react";
import { Button } from "./Button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GoBack: React.FC = () => {
    const navigate = useNavigate()

    return <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
    </div>;
};

export default GoBack;
