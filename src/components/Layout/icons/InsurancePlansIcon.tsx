import { Shield, ClipboardList } from "lucide-react";

export function InsurancePlansIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <div className="relative w-5 h-5">
            <ClipboardList {...props} className="w-5 h-5" />
            <Shield className="w-3 h-3 absolute -bottom-1 -right-1" />
        </div>
    );
}
