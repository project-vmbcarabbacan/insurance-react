import {
    LayoutDashboard,
    Users,
    LifeBuoy,
    Settings,
    Ticket,
    MessageSquare,
    Users2Icon
} from 'lucide-react';
import type { NavItem } from '../interfaces/NavItem';
import { PolicyProviderIcon } from '../../components/Layout/icons/PolicyProviderIcon';

/**
 * Sidebar navigation configuration
 */
export const navItems: NavItem[] = [
    {
        icon: LayoutDashboard,
        label: 'Dashboard',
        path: '/'
    },
    // {
    //     icon: Trello,
    //     label: 'Sales',
    //     children: [
    //         {
    //             label: 'Pipeline',
    //             path: '/pipeline',
    //             icon: Trello
    //         },
    //         {
    //             label: 'Reports',
    //             path: '/reports',
    //             icon: PieChart
    //         }
    //     ]
    // },
    {
        icon: Users,
        label: 'Customers',
        children: [
            {
                label: 'All Customers',
                path: '/customers',
                icon: Users
            },
            // {
            //     label: 'Companies',
            //     path: '/companies',
            //     icon: Building2
            // },
            // {
            //     label: 'Add New',
            //     path: '/customers/new',
            //     icon: UserPlus
            // }
        ]
    },
    {
        icon: LifeBuoy,
        label: 'Support',
        children: [
            {
                label: 'Tickets',
                path: '/support',
                icon: Ticket
            },
            {
                label: 'Messages',
                path: '/messages',
                icon: MessageSquare
            }
        ]
    },
    {
        icon: Users2Icon,
        label: 'Manage Teams',
        path: '/teams'
    },
    {
        icon: Settings,
        label: 'Settings',
        children: [
            {
                label: 'Provider',
                path: '/setting/providers',
                icon: PolicyProviderIcon
            },
        ]
    }

];
