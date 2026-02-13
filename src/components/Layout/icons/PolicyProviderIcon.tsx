import { Shield, Building2 } from "lucide-react";

export function PolicyProviderIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <div className="relative w-5 h-5">
            <Shield {...props} className="w-5 h-5" />
            <Building2 className="w-3 h-3 absolute -bottom-1 -right-1" />
        </div>
    );
}
